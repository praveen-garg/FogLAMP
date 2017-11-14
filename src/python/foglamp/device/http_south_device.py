# -*- coding: utf-8 -*-

# FOGLAMP_BEGIN
# See: http://foglamp.readthedocs.io/
# FOGLAMP_END

"""HTTP Listener handler for sensor readings"""

from aiohttp import web
import asyncio
from foglamp import logger
from foglamp.web import middleware
from foglamp.device.ingest import Ingest

__author__ = "Amarendra K Sinha"
__copyright__ = "Copyright (c) 2017 OSIsoft, LLC"
__license__ = "Apache 2.0"
__version__ = "${VERSION}"

_LOGGER = logger.setup(__name__)

_CONFIG_CATEGORY_NAME = 'http_south'
_CONFIG_CATEGORY_DESCRIPTION = 'South Plugin HTTP Listener'
_DEFAULT_CONFIG = {
    'plugin': {
         'description': 'http_south_device',
         'type': 'string',
         'default': 'http_south'
    },
    'port': {
        'description': 'Port to listen on',
        'type': 'integer',
        'default': '6683',
    },
    'host': {
        'description': 'URI to accept data on',
        'type': 'string',
        'default': '0.0.0.0',
    },
    'uri': {
        'description': 'URI to accept data on',
        'type': 'string',
        'default': 'sensor-reading',
    }
}


def plugin_info():
    return {'name': 'http_south', 'version': '1.0', 'mode': 'async', 'type': 'device',
            'interface': '1.0', 'config': _DEFAULT_CONFIG}


def plugin_init(config):
    """Registers HTTP Listener handler to accept sensor readings"""

    _LOGGER.info("Retrieve HTTP Listener Configuration %s", config)

    host = config['host']['value']
    port = config['port']['value']  # Make port dynamic? its unattended env! expose as service port?
    uri = config['uri']['value']

    return {'host': host, 'port': port, 'uri': uri}


def plugin_start(data):

    host = data['host']
    port = data['port']
    uri = data['uri']

    loop = asyncio.get_event_loop()

    app = web.Application(middlewares=[middleware.error_middleware])
    app.router.add_route('POST', '/{}'.format(uri), HttpSouthIngest.render_post)
    handler = app.make_handler()
    coro = loop.create_server(handler, host, port)
    server = asyncio.ensure_future(coro)

    data['app'] = app
    data['handler'] = handler
    data['server'] = server


def plugin_reconfigure(config):
    pass


def plugin_shutdown(data):
    app = data['app']
    handler = data['handler']
    server = data['server']

    server.close()
    asyncio.ensure_future(server.wait_closed())
    asyncio.ensure_future(app.shutdown())
    asyncio.ensure_future(handler.shutdown(60.0))
    asyncio.ensure_future(app.cleanup())


class HttpSouthIngest(object):
    """Handles incoming sensor readings from HTTP Listener"""

    @staticmethod
    async def render_post(request):
        """Store sensor readings from CoAP to FogLAMP

        Args:
            request:
                The payload is a cbor-encoded array that decodes to JSON
                similar to the following:

                .. code-block:: python

                    {
                        "timestamp": "2017-01-02T01:02:03.23232Z-05:00",
                        "asset": "pump1",
                        "key": "80a43623-ebe5-40d6-8d80-3f892da9b3b4",
                        "readings": {
                            "velocity": "500",
                            "temperature": {
                                "value": "32",
                                "unit": "kelvin"
                            }
                        }
                    }
        Example:
            curl -X POST http://localhost:6683/sensor-reading
            -d '{"timestamp": "2017-01-02T01:02:03.23232Z-05:00", "asset": "pump1", "key": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "readings": {"velocity": "500", "temperature": {"value": "32", "unit": "kelvin"}}}'
        """
        # TODO: The payload is documented at
        # https://docs.google.com/document/d/1rJXlOqCGomPKEKx2ReoofZTXQt9dtDiW_BHU7FYsj-k/edit#
        # and will be moved to a .rst file

        increment_discarded_counter = False

        # TODO: Decide upon the correct format of message
        message = {'result': "success"}
        code = web.HTTPOk.status_code

        try:
            if not Ingest.is_available():
                increment_discarded_counter = True
                message = {"busy": True}
            else:
                payload = await request.json()

                if not isinstance(payload, dict):
                    raise ValueError('Payload must be a dictionary')

                asset = payload.get('asset')
                timestamp = payload.get('timestamp')
                key = payload.get('key')

                # readings and sensor_readings are optional
                try:
                    readings = payload.get('readings')
                except KeyError:
                    readings = payload.get('sensor_values')  # sensor_values is deprecated

                await Ingest.add_readings(asset=asset, timestamp=timestamp, key=key, readings=readings)

        except (ValueError, TypeError) as e:
            increment_discarded_counter = True
            code = web.HTTPBadRequest.status_code
            message = {'error': str(e)}
            _LOGGER.exception(str(e))
        except Exception as e:
            increment_discarded_counter = True
            code = web.HTTPInternalServerError.status_code
            message = {'error': str(e)}
            _LOGGER.exception(str(e))

        if increment_discarded_counter:
            Ingest.increment_discarded_readings()
        # expect keys in response:
        # (code = 2xx) result Or busy
        # (code = 4xx, 5xx) error
        return web.json_response(message.update({"status": code}))

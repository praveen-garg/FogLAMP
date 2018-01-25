# -*- coding: utf-8 -*-

# FOGLAMP_BEGIN
# See: http://foglamp.readthedocs.io/
# FOGLAMP_END

"""FogLAMP South Microservice"""

import asyncio
import signal
from foglamp.services.south import exceptions
from foglamp.common.configuration_manager import ConfigurationManager
from foglamp.common import logger
from foglamp.services.south.ingest import Ingest
from foglamp.services.common.microservice import FoglampMicroservice
from aiohttp import web

__author__ = "Terris Linenbach"
__copyright__ = "Copyright (c) 2017 OSIsoft, LLC"
__license__ = "Apache 2.0"
__version__ = "${VERSION}"

_LOGGER = logger.setup(__name__)


class Server(FoglampMicroservice):
    """" Implements the South Microservice """

    # Configuration handled through the Configuration Manager
    _DEFAULT_CONFIG = {
        'plugin': {
            'description': 'Python module name of the plugin to load',
            'type': 'string',
            'default': 'coap_listen'
        }
    }

    _PLUGIN_MODULE_PATH = "foglamp.plugins.south"

    _MESSAGES_LIST = {

        # Information messages
        "i000000": "",

        # Warning / Error messages
        "e000000": "generic error.",
        "e000001": "cannot proceed the execution, only the type -device- is allowed "
                   "- plugin name |{0}| plugin type |{1}|",
        "e000002": "Unable to obtain configuration of module for plugin |{0}|",
        "e000003": "Unable to load module |{0}| for device plugin |{1}| - error details |{0}|",
    }
    """ Messages used for Information, Warning and Error notice """

    _plugin = None
    """The plugin's module'"""

    _plugin_handle = None
    """The value that is returned by the plugin_init"""

    _type = "Southbound"

    async def _start(self, loop) -> None:
        error = None
        try:
            category = self._name
            # Configuration handling - initial configuration
            config = self._DEFAULT_CONFIG
            config_descr = '{} Device'.format(self._name)

            cfg_manager = ConfigurationManager(self._storage)

            await cfg_manager.create_category(category, config, config_descr, True)

            config = await cfg_manager.get_category_all_items(category)

            try:
                plugin_module_name = config['plugin']['value']
            except KeyError:
                message = self._MESSAGES_LIST['e000002'].format(self._name)
                _LOGGER.error(message)
                raise

            try:
                import_file_name = "{path}.{dir}.{file}".format(path=self._PLUGIN_MODULE_PATH,
                                                                dir=plugin_module_name,
                                                                file=plugin_module_name)
                self._plugin = __import__(import_file_name, fromlist=[''])
            except Exception as ex:
                message = self._MESSAGES_LIST['e000003'].format(plugin_module_name, self._name, str(ex))
                _LOGGER.error(message)
                raise

            # Plugin initialization
            plugin_info = self._plugin.plugin_info()
            default_config = plugin_info['config']

            # Configuration handling - updates the configuration using information specific to the plugin
            await cfg_manager.create_category(category, default_config, '{} Device'.format(self._name))

            config = await cfg_manager.get_category_all_items(category)

            # Register interest with category and microservice_id
            result = self._core_microservice_management_client.register_interest(category, self._microservice_id)

            # KeyError when result (id and message) keys are not found
            registration_id = result['id']
            message = result['message']

            # Ensures the plugin type is the correct one - 'south'
            if plugin_info['type'] != 'south':

                message = self._MESSAGES_LIST['e000001'].format(self._name, plugin_info['type'])
                _LOGGER.error(message)

                raise exceptions.InvalidPluginTypeError()

            self._plugin_handle = self._plugin.plugin_init(config)

            # Executes the requested plugin type
            if plugin_info['mode'] == 'async':
                await  self._exec_plugin_async(config)

            elif plugin_info['mode'] == 'poll':
                asyncio.ensure_future(self._exec_plugin_poll(config))

        except (Exception, KeyError) as ex:
            if error is None:
                error = 'Failed to initialize plugin {}'.format(self._name)
            _LOGGER.exception(error)
            print(error, str(ex))
            asyncio.ensure_future(self._stop(loop))

    async def _exec_plugin_async(self, config) -> None:
        """Executes async type plugin
        """
        await Ingest.start(self._core_management_host, self._core_management_port)
        self._plugin.plugin_start(self._plugin_handle)

    async def _exec_plugin_poll(self, config) -> None:
        """Executes poll type plugin
        """
        await Ingest.start(self._core_management_host, self._core_management_port)
        max_retry = 3
        try_count = 1
        while True and try_count <= max_retry:
            try:
                data = self._plugin.plugin_poll(self._plugin_handle)
                if len(data) > 0:
                    if isinstance(data, list):
                        for reading in data:
                            asyncio.ensure_future(Ingest.add_readings(asset=reading['asset'],
                                                                        timestamp=reading['timestamp'],
                                                                        key=reading['key'],
                                                                        readings=reading['readings']))
                    elif isinstance(data, dict):
                        asyncio.ensure_future(Ingest.add_readings(asset=data['asset'],
                                                                  timestamp=data['timestamp'],
                                                                  key=data['key'],
                                                                  readings=data['readings']))
                # pollInterval is expressed in milliseconds
                sleep_seconds = int(config['pollInterval']['value']) / 1000.0
                await asyncio.sleep(sleep_seconds)
                # If successful, then set retry count back to 1, meaning that only in case of 3 successive failures, exit.
                try_count = 1
            except KeyError as ex:
                _LOGGER.exception('Keyerror plugin {} : {}'.format(self._name, str(ex)))
            except Exception as ex:
                try_count += 1
                _LOGGER.exception('Failed to poll for plugin {}, retry count: {}'.format(self._name, try_count))
                await asyncio.sleep(2)

    def run(self):
        """Starts the South Microservice
        """
        loop = asyncio.get_event_loop()

        # Register signal handlers
        # Registering SIGTERM causes an error at shutdown. See
        # https://github.com/python/asyncio/issues/396
        for signal_name in (signal.SIGINT, signal.SIGTERM):
            loop.add_signal_handler(
                signal_name,
                lambda: asyncio.ensure_future(self._stop(loop)))

        asyncio.ensure_future(self._start(loop))

        # This activates event loop and starts fetching events to the microservice server instance
        loop.run_forever()

    async def _stop(self, loop):
        if self._plugin is not None:
            try:
                self._plugin.plugin_shutdown(self._plugin_handle)
            except Exception:
                _LOGGER.exception("Unable to stop plugin '{}'".format(self._name))
            finally:
                self._plugin = None
                self._plugin_handle = None

        try:
            await Ingest.stop()
            _LOGGER.info('Stopped the Ingest server.')
        except Exception as ex:
            _LOGGER.exception('Unable to stop the Ingest server. %s', str(ex))
            # return

        # Finish all pending asyncio tasks
        pending = asyncio.Task.all_tasks()
        for p in pending:
            p.cancel()

        # This deactivates event loop and
        # helps aiohttp microservice server instance in graceful shutdown
        _LOGGER.info('Stopping South Service Event Loop')
        loop.stop()

    async def shutdown(self, request):
        """implementation of abstract method form foglamp.common.microservice.
        """
        _LOGGER.info('Stopping South Service plugin {}'.format(self._name))
        try:
            await self._stop(asyncio.get_event_loop())
            self.unregister_service_with_core(self._microservice_id)
        except Exception as ex:
            _LOGGER.exception('Error in stopping South Service plugin {}, {}'.format(self._name, str(ex)))
            raise web.HTTPException(reason=str(ex))
        return web.json_response({"message":
            "Successfully shutdown microservice id {} at url http://{}:{}/foglamp/service/shutdown".format(
            self._microservice_id, self._microservice_management_host, self._microservice_management_port)})

    async def change(self, request):
        """implementation of abstract method form foglamp.common.microservice.
        """
        _LOGGER.info('Configuration has changed for South plugin {}'.format(self._name))

        # plugin shutdown before re-configure
        self._plugin.plugin_shutdown(self._plugin_handle)

        # retrieve new configuration
        cfg_manager = ConfigurationManager(self._storage)
        new_config = await cfg_manager.get_category_all_items(self._name)

        # plugin_reconfigure and assign new handle
        new_handle = self._plugin.plugin_reconfigure(self._plugin_handle, new_config)
        self._plugin_handle = new_handle

        return web.json_response({"south": "change"})

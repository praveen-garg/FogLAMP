# -*- coding: utf-8 -*-

from aiohttp import web
from aiohttp.test_utils import unused_port
import json

from foglamp.services.core import routes


async def test_f(test_server, test_client, loop):
    app = web.Application()
    # fill route table
    routes.setup(app)

    # remove me
    port = unused_port()
    print(port)

    server = await test_server(app, host="localhost", port=port)  # port = 0 ?
    server.start_server(loop=loop)

    client = await test_client(app)

    resp = await client.get('/foglamp/ping')
    assert resp.status == 200
    content = await resp.text()
    content_dict = json.loads(content)
    assert content_dict["uptime"] > 0.0

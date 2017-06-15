from aiohttp import web
from foglamp.admin_api.model import User
from foglamp.admin_api.login import register_handlers as login_register_handlers
from foglamp.admin_api.auth import auth_middleware
import foglamp.env as env


def build():
    """
    :return: An application
    """

    # Create a bogus user until users are moved to the database
    User.objects.create(name='user', password='password')

    app = web.Application(middlewares=[auth_middleware])
    router = app.router

    # Register URI handlers
    login_register_handlers(router)

    # Static content - It's a hack
    #router__.add_static('/', '/home/foglamp/foglamp/example/web/login')

    if env.config['deployment'] == 'dev':
        enable_cors(app)
    return app

def enable_cors(app):
    import aiohttp_cors

    # Configure default CORS settings.
    cors = aiohttp_cors.setup(app, defaults={
        "*": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*",
        )
    })

    # Configure CORS on all routes.
    for route in list(app.router.routes()):
        cors.add(route)

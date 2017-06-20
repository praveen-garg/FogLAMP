Project init
^^^^^^^^^^^^
vue init webpack Foglamp-Admin-Interface
----------------------------------------

- Project name Foglamp-Admin-Interface
- Project description Foglamp Admin Interface, Using Vuejs and Webpack
- Author Monika Sharma <monika@scaledb.com>
- Vue build standalone
- Install vue-router? Yes
- Use ESLint to lint your code? Yes
- Pick an ESLint preset none
- Setup unit tests with Karma + Mocha? No
- Setup e2e tests with Nightwatch? No


vue-cli · Generated "Foglamp-Admin-Interface".

To get started:
---------------
- cd frontend
- npm install
- npm run dev

Documentation can be found at https://vuejs-templates.github.io/webpack


.. code-block:: bash

    npm run dev
    DONE  Compiled successfully in 2347ms

    > Listening at http://localhost:8080
    > First time compilation take 2000+ ms.
    > Once packages (under node_modules) are installed, it will be =~250ms

aiohttp web api
^^^^^^^^^^^^^^^
For aiohttp to handle cors:
---------------------------
- `pip install aiohttp_cors`
- import aiohttp_cors
- Configure CORS on app router routes

1. Configure default CORS settings for aiohttp web api
2. TODO investigate and fix only for specific IP/ host if needed..
3. right now just making it work with ui on 127.0.0.1:8081
4. run server binding at port 8081.

.. code-block:: python

      cors = aiohttp_cors.setup(app, defaults={
      "*": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*",
        )
      })

Configure CORS on all routes
----------------------------
.. code-block:: python

      for route in list(app.router.routes()):
         cors.add(route)


Additional info:
^^^^^^^^^^^^^^^^
Version system in package.json:
-------------------------------
In the simplest terms, the tilde matches the most recent minor version (the middle number). ~1.2.3 will match all 1.2.x versions but will miss 1.3.0.

The caret, on the other hand, is more relaxed. It will update you to the most recent major version (the first number). ^1.2.3 will match any 1.x.x release including 1.3.0, but will hold off on 2.0.0.

Build for deployment
^^^^^^^^^^^^^^^^^^^^
`npm run build` will create index.html and static folder in dist directory.

TODO:
-----
1. Copy `dist` content to specific location

    a. `dist/static` to `frontend/static`

    b. `dist/index.html` to `frontend/template/admin-api/index.html`

2. Have an nginx.conf that serve the static files and act as a reverse proxy for API calls

3. Write e2e test using nightwatch + selenium chrome driver

### Configuring angular4 with Webpack

 - Create a new project directory.
    * angular4-auth
    * create `src` and `config` folders inside project folder
 - add these files to root     
    - package.json
    - webpack.config.js
    - karma.conf.js
 - add these files to `src` directory
    - src/tsconfig.json
 - add these files to `config` directory    
    - config/helpers.js
    
 Update these files with the minimum code https://angular.io/docs/ts/latest/guide/webpack.html#!#configure-webpack

- Open a terminal window and install the npm packages.  
  `npm install`

- To run Angular application in most browsers create file
    - src/polyfills.ts [update code file from https://angular.io/docs/ts/latest/guide/webpack.html#!#polyfills]  

- Gather the common configuration in a file called webpack.common.js; Details are available here https://angular.io/docs/ts/latest/guide/webpack.html#!#common-configuration

### Environment-specific configuration

- Create separate, environment-specific configuration files that build on webpack.common.js
  - config/webpack.dev.js
  - config/webpack.prod.js
  - config/webpack.test.js

Full documentation can be found at https://angular.io/docs/ts/latest/guide/webpack.html    

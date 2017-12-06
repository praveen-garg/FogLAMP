# FogLAMP frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.3.

## Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Installing yarn

To install yarn follow the instruction provided on https://yarnpkg.com/en/docs/install

To enable Yarn for Angular CLI, run the following command inside root directory: 
`ng set packageManager=yarn`
To install dependencies run the following command inside root directory:
`yarn`  

#### Why Yarn?
* Yarn parallelizes operations to maximize resource utilization so install times are faster than ever.
* Offline cache: package installation using Yarn, it places the package on your disk. During the next install, this package will be used instead of sending an HTTP request to get the tarball from the registry.
* Deterministic Installs: Yarn uses lockfiles (yarn.lock) and a deterministic install algorithm. We can say goodbye to the "but it works on my machine" bugs.

#### Yarn commands
* `yarn`                    # Install all dependencies from package.json
* `yarn install`            # Alias for yarn
* `yarn add [package]`      # Install npm package
* `yarn upgrade [package]`  # Upgrade npm package
* `yarn remove [package]`   # Uninstall npm package

To read more about yarn read https://yarnpkg.com/en/

## Running unit tests
Run `yarn test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `yarn e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure app is able to communication with web API.

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Build
Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory. It uses the `-prod` flag with `ng` for a production build.

## Deploy with nginx
`yarn build` and start nginx from frontend directory with given conf file; see next section. 

To deploy on another machine, you shall need to copy build artifacts stored in the `dist/` directory and provided `nginx.conf`; Make sure you have nginx-light installed on the deployment machine.


## Starting with nginx
start: `nginx -c nginx.conf -p $(pwd)`

stop: `nginx -s stop`

you should be able to access it on 0.0.0.0:8080

## REST API URL Configuration:

### Dev Mode:
Set default API base URL in `environments/environment.ts`, you can always change it and restart the from settings. 

### Production Mode:
Set API base URL in `environments/environment.prod.ts`, you can always change it and restart the from settings. 

### Running using Docker 
1) Install Docker CE for Mac or Windows (http://docker.com)

2) git clone https://github./praveen-garg/foglamp/FogLAMP

3) Move to `src/frontend` directory and run `yarn install`.

4) Run `yarn build`

5) Run `docker-compose build`

6) Run `docker-compose up` (or `docker-compose up -d` to run in daemon mode)

7) Navigate to http://localhost:8080

8) To stop `docker-compose down` 

## Used Libraries:

#### Core:
 Library      |   Version     | Latest Stable (? Y/n) | License
------------- | ------------- | --------------------  | ------------
 Angular 4    | 4.4.3         |        4.4.4          | MIT 
 Angular CLI  | 1.4.3         |        1.4.4          | MIT 
 TypeScript   | 2.4.2         |        2.5            | Apache 2.0
 rxjs         | 5.4.3         |        5.4.3          | Apache 2.0

#### Dev:
 Library      |   Version     | Latest Stable (? Y/n) | License
------------- | ------------- | --------------------  | ------------
canvas-gauges |  2.1.4        |        2.1.4          | MIT 
chart.js      |  2.7.0        |        2.7.0          | MIT 
core-js       |  2.5.1        |        2.5.1          | MIT 
loadash       |  4.17.4       |        4.17.4         | MIT
ngx-mask      |  1.0.3        |        1.0.3          | MIT 
ng-sidebar    |  6.0.2        |        6.0.2          | MIT 
moment        |  2.19.2       |        2.19.2         | MIT

# FogLAMP frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## nginx

start: `nginx -c nginx.conf -p $(pwd)`

stop: `nginx -s stop`

## start with nginx

`npm run build` and start nginx from frontend directory with given conf file; see above. you should be able to access it on 0.0.0.0:8080

## REST API URL Configuration:

### Dev Mode:
 Set api base URL in `environments/environment.ts` file  

### Production Mode:
Set api base URL in `environments/environment.prod.ts` file  


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
canvas-gauges |  2.1.4        |        Yes            | MIT 
chart.js      |  2.7.0        |        Yes            | MIT 
core-js       |  2.5.1        |        Yes            | MIT 
loadash       |  4.17.4       |        Yes            | MIT
ngx-mask      |  1.0.3        |        Yes            | MIT 
ng-sidebar    |  6.0.2        |        Yes            | MIT 

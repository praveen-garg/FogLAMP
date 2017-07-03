
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## using

[Bulma: A modern CSS framework based on Flexbox](http://bulma.io/documentation/overview/start/)

[Font-Awesome](http://fontawesome.io/icons/)


## Ubuntu Setup

Node.js 6.11 is the LTS release available (as per this update for this section). https://github.com/nodejs/LTS

`$ sudo apt-get install python-software-properties`

`$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -`

Using latest current release and added their PPA to system.

Run `apt-get install nodejs` (as root) to install Node.js v6.x and npm


``` bash

$ node -v
v6.11.0
$ npm -v
3.10.10

```
### Install package.json depedencies:

`npm install`


_Ignore these warnings_

```
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.0.0 (node_modules/chokidar/node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.1.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
```


I had Jenkins running on my Ubuntu machine, so had to kill `sudo kill $(sudo lsof -t -i:8080)`

`npm run dev` will serve the app on localhost:8080; Login into UI when API is not up > expect Network error notification in UI.

### To start API

```
source build.sh -i
foglamp
```


Note: check [info.rst](info.rst) for other dev notes.

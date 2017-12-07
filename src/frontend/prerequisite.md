# Prerequisite to setup FogLAMP frontend

## Installation
### Node 
#### On Mac
    https://nodejs.org/en/download/

#### On ubuntu
_Install nodejs (version 8)_
```
    $ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    $ sudo apt-get install nodejs
```    
### yarn
#### On Mac
```    
    brew install yarn --without-node
```
#### on ubuntu
```
    $ sudo npm install -g yarn
```    
#### git clone https://github.com/praveen-garg/FogLAMP.git

#### Move to `src/frontend` directory and run
```
    $ yarn install
    $ yarn build
```  

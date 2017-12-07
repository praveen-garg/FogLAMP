# Prerequisite to run app in docker

## Docker Installation 
### Mac & Windows
  _Install Docker CE for Mac and Windows (http://docker.com)_

#### Ubuntu
  _To install Docker CE follw link given below_
    https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/

  _Install docker-compose (required step#3 first)_
```
    $ sudo apt install docker-compose
```

### Node
#### Mac
    
    https://nodejs.org/en/download/

_yarn intallation_ 
```    
    brew install yarn --without-node
```

#### Ubuntu
_Install nodejs (version 8)_
```
    $ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    $ sudo apt-get install nodejs
```    
_Install yarn_
```
    $ sudo npm install -g yarn
```    

#### git clone https://github.com/praveen-garg/FogLAMP.git

#### Move to `src/frontend` directory and run
```
    $ yarn install
    $ yarn build
```  

#### Run app in docker container
```
    $ sudo docker-compose build
    $ sudo docker-compose up (or deamon mode: sudo docker-compose up -d)
```
#### Navigate to http://localhost:8080

#### Stop docker-compose
```
    $ sudo docker-compose down
```

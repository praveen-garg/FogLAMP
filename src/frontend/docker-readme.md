# How to run app in docker

## Installation 
#### Mac & Windows
  _Install Docker CE for Mac and Windows (http://docker.com)_

#### Ubuntu
  _To install Docker CE follow instruction give here_
      https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/

  _Install docker-compose (required step#3 first)_
```
    $ sudo apt install docker-compose
```
#### Run app
```
    $ sudo docker-compose build
    $ sudo docker-compose up (or deamon mode: sudo docker-compose up -d)
```

#### Navigate to http://localhost:8080
#### Stop docker-compose
```
    $ sudo docker-compose down
```

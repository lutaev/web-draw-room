##This is draw board.</h3>

###You have to do:</h4>

Install NodeJS and nginx. You also can use other server for frontend, server should listen 80 port of localhost and return index.html file.


In terminal run
```shell
sudo npm i webpack -g
```


Clone this repo to your home directory


Run your frontend server. If you use nginx, you can find an expample of nginx config in ~/web-draw-room/client/nginx.conf.example


Go to ~/web-draw-room/client and run: 
```shell
npm i
webpack
```


Go to ~/web-draw-room/server and run:
```shell
npm i
./run.sh
```


In your browser go to http://localhost.


Open another browser and go to http://localhost. 

Enjoy!
## Small test for image download bug

Uploaded images bigger then ~70kb might not load in browser and show error: 
`net::ERR_INCOMPLETE_CHUNKED_ENCODING attrs.js:35`


#### Install
````bash
meteor remove insecure autopublish

mrt add collectionFS
mrt add cfs-filesystem
mrt add graphicsmagick
mrt add bootstrap-3

./start.sh
````

#### nginx.conf
````bash
worker_processes  1;
events {
  worker_connections  1024;
}
http {
  include                       mime.types;
  default_type                  application/octet-stream;
  sendfile                      on;
  keepalive_timeout             65;
  server_names_hash_bucket_size 64;

  client_max_body_size          4M;
  client_body_buffer_size       128k;           

  server {
    listen                      80;
    server_name                 example.com;
    location / {
      proxy_pass                http://localhost:8080/;
      proxy_set_header          Host $host;
      proxy_set_header          X-Forwarded-For $proxy_add_x_forwarded_for;

      # websocket support (nginx 1.4)

      proxy_set_header          Upgrade $http_upgrade;
      proxy_set_header          Connection "upgrade";
      proxy_http_version        1.1;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root /usr/share/nginx/html;
    }
  }
}
````

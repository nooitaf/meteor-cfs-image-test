#!/bin/bash

export MONGO_URL=mongodb://localhost:27017/imagetest
export ROOT_URL=http://example.com/

meteor run --port 8080

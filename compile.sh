#!/bin/bash

rm -R lib
rm -R docs

esdoc -c esdoc.json
babel ./app -d lib
cp ./app/config.json ./lib/config.json

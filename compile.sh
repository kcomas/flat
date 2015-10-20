#!/bin/bash

rm -R lib
rm -R docs
rm -R docs-public
rm -R lib-public

esdoc -c esdoc.json
esdoc -c esdoc-public.json
babel ./app -d lib
babel ./flat-public  -d lib-public
cp ./app/config.json ./lib/config.json
cp ./app/configAdmin.json ./lib/configAdmin.json

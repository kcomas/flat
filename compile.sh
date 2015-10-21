#!/bin/bash

rm -R lib
rm -R docs
rm -R docs-public
rm -R lib-public

esdoc -c esdoc.json
#esdoc -c esdoc-public.json
babel ./app -d lib
#babel ./flat-public  -d lib-public
mkdir lib/flat-config
mkdir lib/flat-content
cp -R ./app/flat-config ./lib/flat-config
cp -R ./app/flat-content ./lib/flat-content

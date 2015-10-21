#!/bin/bash

rm -R lib
rm -R docs
rm -R docs-public
rm ./flat-public/admin/js/*-compiled.js

esdoc -c esdoc.json
esdoc -c esdoc-public.json
babel ./app -d lib
babel ./flat-public/admin/js/backend.js -o ./flat-public/admin/js/backend-compiled.js
#babel ./flat-public  -d lib-public
mkdir lib/flat-config
mkdir lib/flat-content
cp -R ./app/flat-config ./lib/
cp -R ./app/flat-content ./lib/

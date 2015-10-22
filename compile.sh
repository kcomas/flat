#!/bin/bash

rm -R lib
rm -R docs
rm -R docs-public
#rm ./flat-public/globals/admin/js/*-compiled.js

esdoc -c esdoc.json
#esdoc -c esdoc-public.json
babel ./app -d lib
#babel ./flat-public/globals/admin/js/backend.js -o ./flat-public/globals/admin/js/backend-compiled.js
#babel ./flat-public/globals/admin/js/sectionEditor.js -o ./flat-public/globals/admin/js/sectionEditor-compiled.js
mkdir lib/flat-config
mkdir lib/flat-content
cp -R ./app/flat-config ./lib/
cp -R ./app/flat-content ./lib/

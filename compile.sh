#!/bin/bash

rm -R lib

esdoc -c esdoc.json
babel ./app -d lib
mkdir lib/flat-config
mkdir lib/flat-content
cp -R ./app/flat-config ./lib/
cp -R ./app/flat-content ./lib/
cp -R ./app/flat-static ./lib/

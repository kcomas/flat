
"use strict"

import page from './page/page.js';
import fs from 'fs';

/**
 * The global page config object
 * @type {object}
 * @property {string} templateDir - the directory of the templates
 * @property {string} contentDir - the directory of the content files
 * @property {string} cacheDir - the directory of the built pages
 * @property {array} metaDefault - the default meta object
 * @property {array} cssDefault - the default css object
 * @property {array} jsDefault - the default js object
 * @property {array} headJsDefault - the default head js object
 * @property {string} containerDefault - the default container filename
 * @property {string} headDefault - the default head filename
 * @property {string} menuDefault - the default menu filename
 * @property {string} bodyDefault - the default body filename 
 */
var pageConfig = JSON.parse(fs.readFileSync('./flat-config/pageConfig.json'),'utf8');

//make sure the cache dir exists
if (!fs.existsSync(pageConfig.cacheDir)){
    fs.mkdirSync(cacheDir);
}

/**
 * This is the array of all of the admin pages
 * @type {array}
 */
var pages = [

    new page('/flat-admin','Admin Home',pageConfig)

];

export default pages;

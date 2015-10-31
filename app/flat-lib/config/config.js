
"use strict"

import fs from 'fs';

/**
 * This class manages the config for the entrie site
 */
export default class config {

    /**
     * Load the config class
     * @constructor
     * @param {string} filename - the config file
     */
    constructor(filename){
        
        /**
         * The filename
         * @type {string}
         */
        this.filename = filename;

        /**
         * The config object
         * @type {object}
         */
        this._config = JSON.parse(fs.readFileSync(filename,'utf8'));

    }

    /**
     * Get a config value
     * @param {string} key - the key for the config value
     * @return {object|array|date|number|boolean|null} - the value for the config key
     */
    getValue(key){
        return this._config[key];
    }

    /**
     * Set a value and syncronusly write to disk should'nt be done often
     * @param {string} key - the name of the value to set
     * @param {object|array|date|number|boolean|null} value - the value to set
     */
    setValue(key,value){
        this._config[key] = value;
        fs.writeFileSync(this.filename,JSON.stringify(this._config,null,2),'utf8');
    }


}

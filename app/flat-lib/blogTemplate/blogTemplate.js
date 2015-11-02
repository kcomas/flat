
"use strict"

import fs from 'fs';

/**
 * Class that stores info on the current blog list template
 */
export default class blogTemplate {

    /**
     * @constructor
     * @param {string} dir - the directory for the json file
     * @param {string} file - the file to write to
     */
    constructor(dir,file){

        /**
         * The file directory
         * @type {string}
         */
        this._dir = dir;

        //check that the dir exitsts
        try {
            let stat = lstatSync(this._dir);
        } catch(err){
            fs.mkdirSync(this._dir);
        }

        /**
         * The file to save to
         * @type {string}
         */
        this._file = file;
        
        /**
         * The data object
         * @type {object}
         */
        this._data = {};

        /**
         * The current blog template
         * @type {string}
         */
        this._data.template = '';

        /**
         * The number of blogs per list page
         * @type {number}
         */
        this._data.numPerPage = 10;

        //try to read a file if it is on disk
        try {
            this._data = JSON.parse(fs.readFileSync(this._dir+this._file,'utf8'));
        } catch(err){

        }

    }

    /**
     * Save the file to disk
     */
    save(){
        fs.writeFileSync(this._dir+this._file,JSON.stringify(this._data),'utf8');
    }

    /**
     * Convert the data to a json string
     * @return {string} the json string of the data object
     */
    toString(){
        return JSON.stringify(this._data,null,2);
    }

    /**
     * Set the current template
     * @param {string} temp - the new template
     */
    set template(temp){
        this._data.template = temp;
    }

    /**
     * Get the current template
     * @return {string} the current template
     */
    get template(){
        return this._data.template;
    }

    /**
     * Set the currents number of blogs per page
     * @param {number} num - the new number of blogs per page
     */
    set numPerPage(num){
        this._data.numPerPage = num;
    }

    /**
     * Get the number of blogs per page
     * @return {number} the number of blogs per page
     */
    get numPerPage(){
        return this._data.numPerPage;
    }



}
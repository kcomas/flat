
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
            var stat = fs.statSync(this._dir);
        } catch(err){
            if(err.code === 'ENOENT'){
                fs.mkdirSync(this._dir);
            } else {
                console.dir(err);
            }
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

        /**
         * The cache page to use for rendering
         * @type {string}
         */
        this._data.cache = '';

        /**
         * The inernal string where the blog html is held
         * @type {string}
         */
        this._data.blogHtml = '';

        /**
         * The blog list internal html
         * @type {string}
         */
        this._data.blogListHtml = '';

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

    /**
     * Set the current blog cache file
     * @param {string} str - the string of the blog cache
     */
    set cache(str){
        this._data.cache = str;
        //get the blog substring
        let start = this._data.cache.indexOf('<$$blog$$>');
        let end = this._data.cache.indexOf('</$$blog$$>') + '</$$blog$$>'.length;

        if(start !== -1 && end !== -1){
            this._data.blogHtml = this._data.cache.substring(start,end);
            this._data.cache = this._data.cache.replace(this._data.blogHtml,'<BLOGDATA/>');
            this._data.blogHtml = this._data.blogHtml.replace('<\$\$blog\$\$>','').replace('</\$\$blog\$\$>','');
        }

        start = this._data.cache.indexOf('<$$blogList$$>');
        end = this._data.cache.indexOf('</$$blogList$$>') + '</$$blogList$$>'.length;
        if(start !== -1 && end !== -1){
            this._data.blogListHtml = this._data.cache.substring(start,end);
            this._data.cache = this._data.cache.replace(this._data.blogListHtml,'<BLOGLIST/>');
            this._data.blogListHtml = this._data.blogListHtml.replace('<\$\$blogList\$\$>','').replace('</\$\$blogList\$\$>','');
        }
    }

    /**
     * Get the blog cache file
     * @return {string} the blog cache
     */
    get cache(){
        return this._data.cache;
    }

    /**
     * Get the blog html
     * @return {string} the inner blog html for lists
     */
    get blogHtml(){
        return this._data.blogHtml;
    }

    /**
     * Set the blog html
     * @param {string} html - the new blog html string
     */
    set blogHtml(html){
        this._data.blogHtml = html;
    }

    /**
     * Get the blog List Html
     * @return {string} the blog list html
     */
    get blogListHtml(){
        return this._data.blogListHtml;
    }

    /**
     * Set the blog list html
     * @param {string} html - the new blog list html
     */
    set blogListHtml(html){
        this._data.blogListHtml = html;
    }



}


"use strict"

import fs from 'fs';

/**
 * The class used to define the admin pages
 */
export default class page {

    /**
     * @constructor
     * @param {string} permalink - the permalink of the page
     * @param {string} title - the title of the page
     * @param {object} pageConfig - the configuraton of the pages
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
     * @property {string} bodyDefault - the default 
     * @param {array} meta - the array of meta objects
     * @param {array} css - the array of css objects
     * @param {array} js - the array of js objetcs
     * @param {array} headJs - array of js objects that go in the head
     * @param {string} container - the template of the container filename
     * @param {string} head - the template of the head filename
     * @param {string} menu - the template of the menu filename
     * @parma {string} body - the template of the body filename
     * @param {string} foot - the template of the foot filename
     */
    constructor(permalink,title,pageConfig,meta,css,js,container,head,headjs,menu,body,foot){
        
        /**
         * The page permalink
         * @type {string}
         */
        this.permalink = permalink;

        /**
         * The page title
         * @type {string}
         */
        this.title = title;

        /**
         * The page config for defaults
         * @type {object}
         */
        this.config = pageConfig;

        /**
         * The page meta properties
         * @type {array}
         */
        this.meta = meta || pageConfig.metaDefault;

        /**
         * The page css properties
         * @type {array}
         */
        this.css = css || pageConfig.cssDefault;

        /**
         * The page js properties
         * @type {array}
         */
        this.js = js || pageConfig.jsDefault;

        /**
         * The page head js properites
         * @type {array}
         */
        this.headJs = headJs || pageConfig.headJsDefault;

        /**
         * The page container template
         * @type {string}
         */
        this.container = container || pageConfig.containerDefault;

        /**
         * The page head template
         * @type {string}
         */
        this.head = head || pageConfig.headDefault;

        /**
         * The page menu template
         * @type {string}
         */
        this.menu = menu || pageConfig.menuDefault;

        /**
         * The page body template
         * @type {string}
         */
        this.body = body || pageConfig.bodyDefault;

        /**
         * The page foot template
         * @type {string}
         */
        this.foot = foot || pageConfig.footDefault;

        /**
         * The page tab sections contents
         * @type {array}
         */
        this.contents = [];

        /**
         * The extra tags for replacing in the template
         * @type {array}
         */
        this.extraTags = [];

    }

    /**
     * Get permalink
     * @return {string} the permalink
     */
    get permalink(){
        return this.permalink;
    }

    /**
     * Get title
     * @return {string} the title
     */
    get title(){
        return this.title;
    }

    /**
     * Set title
     * @param {string} title - the page title
     */
    set title(title) {
        this.title = title;
    }

    /**
     * Get the config
     * @return {object} the config defaults object
     */
    get config(){
        return this.config;
    }

    /**
     * Get the extra tags
     * @return {array} the extra tags array
     */
    get tags(){
        return this.extraTags;
    }

    /**
     * Add contents to the contents array
     * @param {string} name - the name of the contents section
     * @param {string} filename - the filename of the contents section
     */
    addContents(name,filename){
        var obj = {};
        obj.name = name;
        obj.filename = filename;
        this.contents.push(obj);
    }

    /**
     * Add an extra tag with content into the extra tags
     * @param {string} name - the name of the tag
     * @param {string} content - the content of the tag
     */
    addTag(name,content){
        var obj = {};
        obj.name = name;
        obj.content = content;
        this.extraTags.push(obj);
    }

    /**
     * Remove an extra tag with content
     * @param {string} name - the name of the tag
     */
    removeTag(name){
        for(let key in this.extraTags){
            if(key === name){
                delete this.extraTags[key];
            }
        }
    }

}

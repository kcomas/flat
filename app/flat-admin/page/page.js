
"use strict"

import fs from 'fs';
import contentsRender from './contentsRender.js';
import tagRender from './tagRender.js';
import pageRender from './pageRender.js';

/**
 * The class used to define the admin pages
 */
export default class page {

    /**
     * @constructor
     * @param {string} permalink - the permalink of the page
     * @param {string} title - the title of the page
     * @param {object} pageConfig - the configuraton of the pages
     * @param {string} controller - the controller for the content inside the tabs
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
    constructor(permalink,title,pageConfig,controller,meta,css,js,container,head,headJs,menu,body,foot){
        
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
        this.meta = meta || pageConfig.metaDefault.slice();

        /**
         * The page css properties
         * @type {array}
         */
        this.css = css || pageConfig.cssDefault.slice();

        /**
         * The page js properties
         * @type {array}
         */
        this.js = js || pageConfig.jsDefault.slice();

        /**
         * The page head js properites
         * @type {array}
         */
        this.headJs = headJs || pageConfig.headJsDefault.slice();

        /**
         * The page container template
         * @type {string}
         */
        this.container = container || pageConfig.containerDefault.slice();

        /**
         * The page head template
         * @type {string}
         */
        this.head = head || pageConfig.headDefault.slice();

        /**
         * The page menu template
         * @type {string}
         */
        this.menu = menu || pageConfig.menuDefault.slice();

        /**
         * The page body template
         * @type {string}
         */
        this.body = body || pageConfig.bodyDefault.slice();

        /**
         * The page foot template
         * @type {string}
         */
        this.foot = foot || pageConfig.footDefault.slice();

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

        /**
         * This defines if we load the page from memory or file
         * @type {boolean}
         */
        this.memory = true;

        /**
         * This is the string of the page
         */
        this.pageString = '';

        /**
         * The page controller
         * @type {string}
         */
        this.controller = controller;

        this.addTag('controller',controller);

    }

    /**
     * Add a js file to the js string
     * @param {object} js - the js object
     * @property {string} name - the name of the attribute
     * @property {string} value - the value of the attribute
     */
    addJs(js){
        this.js.push(js);
    }

    /**
     * Add js to the head of the page
     * @param {object} js - the js object
     * @property {string} name - the name of the attribute
     * @property {string} value - the value of the attribute
     */
    addHeadJs(js){
        this.headJs.push(js);
    }

    /**
     * Add a meta object to the meta array
     * @param {object} meta - the meta object
     * @property {string} name - the name of the attribute
     * @property {string} value - the value of the attribute
     */
    addMeta(meta){
        this.meta.push(meta);
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
        obj[name] = content;
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

    /**
     * Syncronously render the page
     */
    render(){
        var tags = [];
        tags.push({'contents':contentsRender(this.config.contentDir,this.contents)});
        //render the tags
        tags.push({'title':this.title});
        tags.push({'meta':tagRender('meta',true,this.meta)});
        tags.push({'css':tagRender('link',true,this.css)});
        tags.push({'headJs':tagRender('script',false,this.headJs)});
        tags.push({'js':tagRender('script',false,this.js)});
        if(this.extraTags.length > 0){
            tags = tags.concat(this.extraTags);
        }
        //add files
        var files = [];
        var tpl = this.config.templateDir;
        files.push({'container':tpl+this.container});
        files.push({'menu':tpl+this.menu});
        files.push({'head':tpl+this.head});
        files.push({'body':tpl+this.body});
        files.push({'foot':tpl+this.foot});
        //render the page to a file
        this.pageString = pageRender(this.config.cacheDir,this.permalink,tags,files);
    }

    /**
     * Load the page from a file and pass in a data object for angular
     * @param {function(err:error,file:string)} callback - the callback function returns the file after the data is added
     */
    load(callback){
        if(this.memory === true){
                var string = this.pageString;
                return callback(null,string);
        } else {
            fs.readFile(this.config.cacheDir+this.permalink.replace('/','~')+'.html','utf8',(err,file)=>{
                if(err){
                    console.log(err);
                    return callback(err,null);
                }
                return callback(null,file);
            });
        }
    }
    

}

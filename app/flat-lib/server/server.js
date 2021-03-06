
"use strict"

import fs from 'fs';
import serverLoop from './serverLoop.js';
import loadBody from './loadBody';
import urlMods from './urlMods.js';
import cookies from './cookies.js';
import responseMods from './responseMods.js';

/**
 * The main server that accepts uses and routers
 */
export default class server {

 /**
  * @construnctor
  */
    constructor() {
        /**
         * The config varable
         * @type {object}
         */
        this.config = {};

        /**
         * The max post data size
         * @type {number}
         */
        this.config.maxPostSize = 1e6;

        /**
         * The array of the routers
         * @type {array}
         */
        this.routers = [];

        /**
         * The array of use functions format fn(req,res,next)
         * @type {array}
         */
        this.uses = [];

        /**
         * The end function if nothing is found
         * @type {function}
         */
        this.done = function(){};

        /**
         * The controller where all the managers are stored
         * @type {controller}
         */
        this._controller = {};


    }

    /**
     * Load a config file,loads syncrounusly
     * @param {string} filename - the filename to be loaded
     */
    loadConfig(filename){
        try {
            var file = fs.readFileSync(filename);
            var tmpConfig = JSON.parse(file);
            for(var key in tmpConfig){
                this.config[key] = tmpConfig[key];
            }
        } catch(err){
            throw err;
        }
    }

    /**
     * set the controller
     * @param {controller} controller - the manager controller
     */
    set controller(controller){
        this._controller = controller;
    }

    /**
     * Get the manager controller
     * @return {controller} the manager controller
     */
    get controller(){
        return this._controller;
    }

    /**
     * Set a value in the config var
     * @param {string} name - the name of the value
     * @param {*} value - the value to be set
     */
    setValue(name,value){
        this.config[name] = value;
    }

    /**
     * Get a value from the config var
     * @param {string} name - the name of the value
     * @return {*} the value of the config[name]
     */
    getValue(name){
       return this.config[name]; 
    }

    /**
     * Add Routes to the routes array 
     * @param {string} path - the path of the router
     * @param {router} router - the router to be added
     */
    route(path,router){
        this.routers.push({path:path,router:router});
    }

    /**
     * Adds a funtion to the uses array
     * @param {function} fn - the function to be added to the uses array
     */
    use(fn){
        this.uses.push(fn);
    }

    /**
     * Function to be run if no matching paths are found
     * @param {function} fn - the function to be added
     */
    always(fn){
        this.done = fn;
    }

    /**
     * This function is passed into http/https runs the main server
     * @returns {function} the function to be passed to the http/s
     */
    run(){
        return (req,res)=>{
            //load post data
            urlMods(req);
            responseMods(req,res,this.getValue('port'));
            cookies(req,res);
            loadBody(req,res,this.config.maxPostSize,()=>{
                    var loop = new serverLoop(req,res,this.uses,this.routers,this.done);
                    loop.loop();
            });
        }
    }

}

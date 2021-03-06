"use strict"

import fs from 'fs';
import routerLoop from './routerLoop.js'

/**
 * The core of the server handels the use and get and post routes  
 */
export default class router {
    /** 
     * @constructor create the values for the router 
     */
    constructor(){
        /**
         * the config object for the router stores key/vars
         */
        this.config = {};
        
        /**
         * this the the array of functions to run before the stack the function is fn(req,res,next)
         */
        this.uses = [];

        /**
         * this is the array of the gets as objects {path,fn(req,res)}
         */
        this.gets = [];

        /**
         * this is the array of the posts as objects{path,fn(req,res)}
         */
        this.posts = [];

        /**
         * The function to be run if no route is matched
         */
        this.doneFn = function(){};

        /**
         * The manager controller
         * @type {controller}
         */
        this._controller = {};

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
     * Loads a config file and stores it overwrites whats in the current config var
     * Loads syncronuously
     * @param {string} filename - the file name
     */
    loadConfig(filename){
        try {
            var file = fs.readFileSync(filename,'utf8');
            this.config = JSON.parse(file);
        } catch (err){
            console.log(err);
        }
    }

    /**
     * Writes the configuration to a file
     * @param {string} filename - the filename to write to
     */
    writeConfig(filename){
        try {
            fs.writeFileSync(filename,JSON.stringify(this.config),'utf8');
        } catch(err){
            console.log(err);
        }
    }

    /**
     * Gets a value form the config var
     * @param {string} name - the name of the config value we want to get
     * @return {*} retuns the value of the config
     */
    getValue(name){
        return this.config[name];
    }

    /**
     * Sets a value in the config var
     * @param {string} name - the name of the value we want to set
     * @param {*} value - the value we want to set
     */
    setValue(name,value){
        this.config[name] = value;
    }

    /**
     * This adds a function to the use array
     * @param {function} fn - the function to be added
     */
    use(fn){
        this.uses.push(fn);
    }

    /**
     * Adds a function to the get array
     * @param {string} path - the path of the get
     * @param {function} fn - the function to add
     */
    get(path,fn){
        this.gets.push({path:path,fn:fn});
    }

    /**
     * Adds a function to the post array
     * @param {string} path - the path of the post array
     * @param {function} fn - the function to add
     */
    post(path,fn){
        this.posts.push({path:path,fn:fn});
    }

    /**
     * The function to be called if nothing is matched and the loop is not stoped
     * @param {function} fn - the final function
     */
    always(fn){
        this.doneFn = fn;
    }

    /**
     * The function to loop through the routes, should export the class with this method
     * @return {function} returns a function to the server it was added to
     */
    run(control){
        this._controller = control;
        return (req,res)=>{
            var loop = new routerLoop(req,res,this.uses,this.gets,this.posts,this.doneFn);
            loop.loop();
        }
    }
}


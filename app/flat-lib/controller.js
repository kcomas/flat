
"use strict"

import manager from './helpers/items/manager.js';

/**
 * This class manages all of the managers
 */
export default class controller {

    /**
     * Add all of the managers into the class
     * @constructor
     * @param {pageManager} pageManager - the page manager
     * @param {sectionManager} sectionManager - the section manager
     * @param {sessionManager} sessionManager - the session manager
     * @param {templateManager} templateManager - the template manager
     * @param {userManager} userManager - the user manager
     * @param {cacheManager} cacheManager - the cache manager
     * @param {uploadManager} uploadManger - the uplaod manager
     */
    constructor(pageManager,sectionManager,sessionManager,templateManager,userManager,cacheManager,uploadManager){

        /**
         * The page manager
         * @type {pageManager}
         */
        this._pageManager = pageManager;

        /**
         * The Section Manager
         * @type {sectionManager}
         */
        this._sectionManager = sectionManager;

        /**
         * The session manager
         * @type {sessionManager}
         */
        this._sessionManager = sessionManager;

        /**
         * The template manager
         * @type {templateManager}
         */
        this._templateManager = templateManager;

        /**
         * The user manager
         * @type {userManager}
         */
        this._userManager = userManager;

        /**
         * The cache manager
         * @type {cacheManager}
         */
        this._cacheManager = cacheManager;

        /**
         * The uplaod manager
         * @type {uploadManager}
         */
        this._uploadManager = uplaodManager;

    }

    /**
     * Get the page manager
     * @return {pageManager} the page manager
     */
    get pageManager(){
        return this._pageManager;
    }

    /**
     * Set the pageManager
     * @param {pageManager} manager - the page manager
     */
    set pageManager(manager){
        this._pageManager = manager;
    }

    /**
     * Get the section manager
     * @return {sectionManager} the section manager
     */
    get sectionManager(){
        return this._sectionManager;
    }

    /**
     * Set the section manager
     * @param {sectionManager} manager - the section manager
     */
    set sectionManager(manager){
        this._sectionManager = manager;
    }

    /**
     * Get the session manager
     * @return {sessionManager} the session manager
     */
    get sessionManager(){
        return this._sessionManager;
    }

    /**
     * Set the session manager
     * @param {sessionManager} manager - the session manager
     */
    set sessionManager(manager){
        this._sessionManager = manager;
    }

    /**
     * Get the template manager
     * @return {templateManager} the template manager
     */
    get templateManager(){
        return this._templateManager;
    }

    /**
     * Set the template manager
     * @param {templateManager} manager - the template manager
     */
    set templateManager(manager){
        this._templateManager = manager;
    }

    /**
     * Get the user manager
     * @return {userManager} the user manager
     */
    get userManager(){
        return this._userManager;
    }

    /**
     * Set the user manager
     * @param {userManager} userManager - the user manager
     */
    set userManager(userManager){
        this._userManager = manager;
    }

    /**
     * Get the cache manager
     * @return {cacheManager} the cache manager
     */
    get cacheManager(){
        return this._cacheManager;
    }

    /**
     * Set the cache manager
     * @param {cacheManager} manager - the cache manager
     */
    set cacheManager(manager){
        this._cacheManager = manager;
    }

    /**
     * Get the upload manager
     * @return {uploadManger} the upload manager
     */
    get uploadManager(){
        return this._uploadManager;
    }

    /**
     * Set the upload manager
     * @param {uploadManager} manager - the upload manager
     */
    set uploadManager(manager){
        this._uploadManager = manager;
    }

    /**
     * Init all of the managers
     */
    init(){
        this._pageManager.init();
        this._sectionManager.init();
        this._sessionManager.init();
        this._templateManager.init();
        this._userManager.init();
        this._cacheManager.init();
        this._uploadManager.init();
    }


}

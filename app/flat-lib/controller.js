
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
     * @param {blogManager} blogManager - the blog manager
     * @param {config} configManager - the config manager
     * @param {info} infoManager - the info manager
     * @param {uploadedFiles} uploadedFiles - the class that reads and writes files from the user
     * @param {blogTemplate} blogTemplate - the blog template manager
     * @param {cacheManager} blogCache - the cacheManager for blogs
     */
    constructor(pageManager,sectionManager,sessionManager,templateManager,userManager,cacheManager,uploadManager,blogManager,configManager,infoManager,uploadedFiles,blogTemplate,blogCache){

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
        this._uploadManager = uploadManager;

        /**
         * The blog manager
         * @type {blogManager}
         */
        this._blogManager = blogManager;

        /**
         * The config manager
         * @type {config}
         */
        this._config = configManager;

        /**
         * The info manager
         * @type {info}
         */
        this._info = infoManager;

        /**
         * The user file manager
         * @type {uploadedFiles}
         */
        this._uploader = uploadedFiles;

        /**
         * The blog template manager
         * @type {blogTemplate}
         */
        this._blogTemplate = blogTemplate;

        /**
         * The blog cache manager
         * @type {cacheManager}
         */
        this._blogCache = blogCache; 

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
     * Get the blog manager
     * @return {blogManager} - the blog manager
     */
    get blogManager(){
        return this._blogManager;
    }

    /**
     * Set the blog manager
     * @param {blogManager} manager - the blog manager
     */
    set blogManager(manager){
        this._blogManager = manager;
    }

    /**
     * set the config manager
     * @param {config} manager - the config manager
     */
    set config(manager){
        this._config = manager;
    }

    /**
     * get the config manager
     * @return {config} the config manager
     */
    get config(){
        return this._config;
    }

    /**
     * Set the info manager
     * @param {info} manager - the info manager
     */
    set info(manager){
        this._info = manager;
    }

    /**
     * Get the info manager
     * @return {info} the info manager
     */
    get info(){
        return this._info;
    }

    /**
     * Set the user file manager
     * @param {uploadedFiles} manager - the user file manager
     */
    set uploader(manager){
        this._uploader = manager;
    }

    /**
     * Get the user file manager
     * @return {uploadedFiles} the user file manager
     */
    get uploader(){
        return this._uploader;
    }

    /**
     * Set the blog template manager
     * @param {blogTemplate} manager - the blog template manager
     */
    set blogTemplate(manager){
        this._blogTemplate = manager;
    }

    /**
     * Get the blog template manager
     * @return {blogTemplate} the blog template manager
     */
    get blogTemplate(){
        return this._blogTemplate;
    }

    /**
     * Get the blog cache
     * @type {cacheManager}
     */
    get blogCache(){
        return this._blogCache;
    }

    /**
     * Set the blog cache
     * @param {cacheManager} manager - the blog cache manager
     */
    set blogCache(manager){
        this._blogCache = manager;
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
        this._blogManager.init();
        this._blogCache.init();
    }


}

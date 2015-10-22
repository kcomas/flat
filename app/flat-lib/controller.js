
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
     */
    constructor(pageManager,sectionManager,sessionManager,templateManager,userManager){

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
         * @type userManager
         */
        this._userManager = userManager;

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
    set sessionManager(sessionManager){
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
    set templateManager(templateManager){
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
     * Init all of the managers
     */
    init(){
        this._pageManager.init();
        this._sectionManager.init();
        this._sessionManager.init();
        this._templateManager.init();
        this._userManager.init();
    }


}

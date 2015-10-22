
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
        this.pageManager = pageManager;

        /**
         * The Section Manager
         * @type {sectionManager}
         */
        this.sectionManager = sectionManager;

        /**
         * The session manager
         * @type {sessionManager}
         */
        this.sessionManager = sessionManager;

        /**
         * The template manager
         * @type {templateManager}
         */
        this.templateManager = templateManager;

        /**
         * The user manager
         * @type userManager
         */
        this.userManager = userManager;

    }

    /**
     * Get the page manager
     * @return {pageManager} the page manager
     */
    get pageManager(){
        return this.pageManager;
    }

    /**
     * Set the pageManager
     * @param {pageManager} pageManager - the page manager
     */
    set pageManager(pageManager){
        this.pageManager = pageManager;
    }

    /**
     * Get the section manager
     * @return {sectionManager} the section manager
     */
    get sectionManager(){
        return this.sectionManager;
    }

    /**
     * Set the section manager
     * @param {sectionManager} sectionManager - the section manager
     */
    set sectionManager(sectionManager){
        this.sectionManager = sectionManager;
    }

    /**
     * Get the session manager
     * @return {sessionManager} the session manager
     */
    get sessionManager(){
        return this.sessionManager;
    }

    /**
     * Set the session manager
     * @param {sessionManager} sessionManager - the session manager
     */
    set sessionManager(sessionManager){
        this.sessionManager = sessionManager;
    }

    /**
     * Get the template manager
     * @return {templateManager} the template manager
     */
    get templateManager(){
        return this.templateManager;
    }

    /**
     * Set the template manager
     * @param {templateManager} templateManager - the template manager
     */
    set templateManager(templateManager){
        this.templateManager = templateManager;
    }

    /**
     * Get the user manager
     * @return {userManager} the user manager
     */
    get userManager(){
        return this.userManager;
    }

    /**
     * Set the user manager
     * @param {userManager} userManager - the user manager
     */
    set userManager(userManager){
        this.userManager = userManager;
    }

    /**
     * Init all of the managers
     */
    init(){
        this.pageManager.init();
        this.sectionManager.init();
        this.sessionManager.init();
        this.templateManager.init();
        this.userManager.init();
    }


}


"use strict"

/**
 * Handeles the loading and saving of pages based on routes
 */
export default class pageManager {

    /**
     * @constructor
     * @param {array} pages - the pages to load into the page manager
     */
    constructor(pages){
        
        /**
         * The pages array
         * @type {array}
         */
        this.pages = pages;

    }

    /**
     * Load a page based on the url
     * @param {string} url - the url of the page
     * @param {object} data - the data if any to be passed to the page
     * @param {function(err:error,page:string)} callback - the page if found or error if not
     * @return {function} the callback function
     */
    load(url,data,callback){
        var page = null;
        for(let i=0,length=this.pages.length; i<length; i++){
            if(this.pages[i].permalink === url){
                page = this.pages[i];
                break;
            }
        }
        if(page === null){
            return callback(new Error("No Page Found"),null);
        }
        page.load(data,function(err,string){
            if(err){
                return callback(err,null);
            }
            return callback(null,string);
        });
    }

    /**
     * Render a page
     * @param {string} url - the url of the page
     * @return {Error} if there was an error rendering
     */
    render(url){
        var page = null;
        for(let i=0,length=this.pages.length; i<length; i++){
            if(this.pages[i].permalink === url){
                page = this.pages[i];
                break;
            }
        }
        if(page !== null){
            try {
                page.render();
                return null;
            } catch(err){
                return error;
            }
        }
        return new Error("Page Not Found");
    }

    /**
     * Render all of the pages - SLOW
     * @return {array} array of errors if any 
     */
    renderAll(){
        var errors = [];
        this.pages.forEach(function(page){
            console.dir(page);
            try {
                page.render();
            } catch(err){
                errors.push(err);
            }
        });
        return errors;
    }

}

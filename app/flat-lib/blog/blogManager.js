
"use strict"

import manager from '../helpers/items/manager.js';
import blog from './blog.js';

/**
 * Class to manage all of the blog posts
 * @extends {manager}
 */
export default class blogManager extends manager {

     /**
     * Create a new blog post
     * @override
     * @param {string} name - the name of the blog
     * @param {string} title - the title of the blog
     * @param {string} author - the author of the blog
     * @param {string} excerpt - the excerpt of the blog
     * @param {string} content - the content of the blog
     * @param {array} tags - the tags of the blog
     * @param {function(err:error,done:boolean)} callback - the callback function
     * @return {function} the callback function
     */
    create(name,title,author,excerpt,content,tags,callback){
        var newBlog = new blog(this.dir);
        newBlog.create(name,title,author,excerpt,content,tags,(err,done)=>{
            if(err){
                return callback(err,null);
            }
            this.add(newBlog);
            return callback(null,true);
        });
    }

    /**
     * Int all of the caches 
     * @override
     */
    init(){
        var itemArr = this.subInt();
        itemArr.forEach((obj)=>{
            var newItem = new blog(this.dir,obj.file,obj.data);
            this.add(newItem);
        });
    
    }
}

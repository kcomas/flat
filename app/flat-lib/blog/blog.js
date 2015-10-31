
"use strict"

import item from '../helpers/items/item.js'

/**
 * This class defines each blog post
 * @extends {item}
 */
export default class blog extends item {

    /**
     * Create a new blog post
     * @override
     * @param {string} name - the name of the blog
     * @param {string} title - the title of the blog
     * @param {string} author - the author of the blog
     * @param {string} excerpt - the excerpt of the blog
     * @param {string} content - the content of the blog
     * @param {array} tags - the tags of the blog
     * @param {string} template - the name of the blog template
     * @param {function(err:error,done:boolean)} callback - the callback function
     * @return {function} the callback function
     */
    create(name,title,author,excerpt,content,tags,template,callback){
        this.genId((err,done)=>{
            if(err){
                return callback(err,null);
            }
            this.data.name = name;
            this.data.title = title;
            this.data.author = author;
            this.data.excerpt = excerpt;
            this.data.content = content;
            this.data.tags = tags;
            this.data.template = template;
            this.data.dateCreated = new Date();
            this.data.permalink = '/' + this.data.dateCreated.getDay() + '/' + this.data.dateCreated.getMonth() + '/' + this.data.dateCreated.getYear() + '/' + this.data.name;
            this.save((err,done)=>{
                return callback(err,done);
            });
        });
    }

}

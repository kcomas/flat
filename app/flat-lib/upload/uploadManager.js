
"use strict"

import manager from '../helpers/items/manager.js';
import upload from './upload.js';

/**
 * Manages all of the uploads
 * @extends {item} 
 */
export default class uploadManager extends manager {

    /**
     * Create a new upload item
     * @override
     * @param {string} filename - the filename
     * @param {boolean} priv - indicates if the file is private or not
     * @param {string} mime - the mime type
     * @param {function(err:err,done:boolean)} callback - done is true if the obj was created
     * @return {function} the callback function
     */
    create(filename,priv,mime,callback){
        var up = new upload(this.dir);
        up.create(filename,priv,mime,(err,done)=>{
            if(err){
                return callback(err,null);
            }
            this.add(up);
            return callback(null,true);
        });
    }

    /**
     * Int all of the uploads
     * @override
     */
    init(){
        var itemArr = subInt();
        itemArr.forEach((obj)=>{
            var newItem = new upload(this.dir,obj.file,obj.data);
            this.add(newItem);
        });
    }

}

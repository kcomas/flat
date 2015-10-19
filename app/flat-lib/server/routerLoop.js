
"use strict"

/**
 * The class that loops through the uses,gets,posts and calls the end function if need be
 */
export default class routerLoop {
    /**
     * @constructor
     * @param {object} req - the request object
     * @param {object} res - the response object
     * @param {funtion} next - the function to call the next route/fn
     * @param {array} uses - the function to be called in order
     * @param {array} gets - the array of get functions
     * @param {array} posts - the array of post functions
     * @param {funtion} end - the final function of the route
     */
    constructor(req,res,next,uses,gets,posts,end){
        /**
         * The position of the uses array
         */
        this.usesPosition = 0;
        
        /**
         * The position of the gets array
         */
        this.getsPosition = 0;

        /**
         * The position of the posts arra
         */
        this.postsPosition = 0;

        this.req = req;
        this.res = res;
        this.next = next;
        this.uses = uses;
        this.gets = gets;
        this.posts = posts;
        this.end = end;

    }

    /**
     * Run though all of the uses/gets/posts and call end if nessacary
     */
    loop(){
        var self = this;
        if(this.usesPosition < this.uses.length){
            this.uses[this.usesPosition](req,res,function next(){
                self.usesPosition++;
                self.loop();
            });
        } else {
            if(this.req.method === 'GET'){
                if(this.getsPosition < this.gets.length){
                   if(this.gets[this.getsPosition].path === this.req.url){
                        //run the get
                        this.gets[this.getsPosition].fn(this.req,this.res);
                   } else {
                        this.getsPosition++;
                        this.loop();
                   }
                } else {
                    //end function
                    this.end(this.next);
                }
            } else if(this.req.method === 'POST'){
                if(this.postsPosition < this.posts.length){
                    if(this.posts[this.postsPosition].path === this.req.url){
                        this.posts[this.postsPosition].fn(this.req,this.res);
                    } else {
                        this.postsPosition++;
                        this.loop();
                    }
                } else {
                    //end function
                    this.end(this.next);
                }
            } else {
                //stop the request we do not handel other then get/post
                this.req.connection.destroy();
            }
        }
    }
}


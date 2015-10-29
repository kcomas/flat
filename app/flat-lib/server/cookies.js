"use strict"

import qs from 'querystring';

/**
 * This gives cookie functions to the req and res objects
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @return {object} req/res the request response
 * @property {array} req.cookies the cookies from the request
 * @property {array} res.cookies the cookies to be sent
 * @property {function} res.setCookie sets a cookie
 * @property {function} res.removeCookie removes a cookie
 */
export default function cookies(req,res){

    /**
     * Load the cookies
     * @type {object}
     */
    req.cookies = qs.parse(req.headers.cookie,';','=');
    
    /*
     *  Set up for cookie sending
     *  @type {object}
     */
    res.cookies = [];

    /*
     * Set a cookie for sending
     * @param {string} name - the name of the cookie
     * @param {string} value - the value of the cookie
     * @param {number} expires - the timespan of the cookie
     * @param {string} domain - the domain of the cookie
     * @param {string} path - the path of the cookie
     * @return {object} the cookie that was added
     * @property {string} name the cookie name
     * @property {string} value the cookie value
     * @poperty {number} the timespan of the cookie
     * @property {string} domain the domain of the cookie
     * @property {sting} path the path of the cookie
     */
    res.setCookie = function(name,value,expires,domain,path){
        var cookie = {};
        cookie[name] = value;
        cookie.expires = (new Date(Date.now() + expires)).toUTCString();
        if(domain){
            cookie.domain = domain;
        }
        if(path){
            cookie.path = path;
        }
        var cookieStr = qs.stringify(cookie,';','=');
        res.cookies.push(qs.unescape(cookieStr));
        res.setHeader('Set-Cookie',res.cookies);
        return cookie;
    }

    /*
     * Remove an existing cookie
     * @param {string} name - the name of the cookie
     */
    res.removeCookie = function(name){
        var cookie = {};
        cookie[name] = null;
        cookie.expires = (new Date(Date.now() - 3)).toUTCString();
        cookieStr = qs.stringify(cookie,';','=');
        res.cookies.push(qs.unescape(cookieStr));
        res.setHeader('Set-Cookie',res.cookies);
    }


}

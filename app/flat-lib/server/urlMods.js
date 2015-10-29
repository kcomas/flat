"use strict"

import url from 'url';

/**
 * This function modifies the url
 * @param {object} req - the request object
 * @return {object} the request object
 * @property {string} req.url the modified url as only the path
 * @property {object} req.parsedUrl the parsed url
 * @property {object} req.query the query of the url as an object
 */
export default function urlMods(req){
    req.parsedUrl = url.parse(req.url,true);
    req.url = req.parsedUrl.pathname;
    req.query = req.parsedUrl.query;
}

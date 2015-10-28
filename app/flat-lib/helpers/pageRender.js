
"use strict"

/**
 * Redner a cached page based on data and the template
 * @param {object} pageData - the page data object
 * @param {object} templateLayout - the json object layout of the template 
 * @return {string} the created page string
 */
export default function pageRender(pageData,templateLayout){
    return recursePage(pageData,JSON.parse(templateLayout));
}

/*
 * list of self closing tags
 * @type {array}
 */
var selfClose = ['br','hr','meta','link','input','img','!DOCTYPE html']; 

/**
 * Length of the self close, cache for loops
 * @type {number}
 */
var selfCloseLength = selfClose.length;

/**
 * Replace the %%name!type:default%% with the page data
 * @param {object} pageData - the page data object
 * @property {string} name - the name of the data to replace
 * @property {string} type - the type of data text or html
 * @propery {string} html - the html to replace with
 * @property {string} text - the text to replace with
 * @param {string} toReplace - the item to replace
 * @return {string} the replaced string or inputed string
 */
function dataReplace(pageData,toReplace){
    if(toReplace.indexOf('%%') === -1){
        return toReplace;
    }
    toReplace = toReplace.replace(/%%/g,'');
    toReplace = toReplace.replace(/!/,'<>');
    toReplace = toReplace.replace(/:/,'<>');
    toReplace = toReplace.split('<>');
    /**
     * three parts
     * 1 the name of the item to replace
     * 2 the type of the item to replace
     * 3 the html to replace with
     */
    for(let i=0,l=pageData.length; i<l; i++){
        if(pageData[i].name === toReplace[0]){
            var html = '';
            if(pageData[i].type === 'text'){
                html = pageData[i].text;
            } else if(pageData[i].type === 'html'){
                html = pageData[i].html;
            }
            return html;
        }
    }
}

/**
 * Sub recursive function
 * @param {object} pageDataParts - page data
 * @param {object} layout - template layout
 * @return {string} the html string
 */
function recursePage(pageDataParts,layout){
    var html = '';
    if(Array.isArray(layout)){
        layout.forEach((tmp)=>{
            html += recursePage(pageDataParts,tmp);
        });
    } else {
        //make the part string
        var tag = layout.tag;
        var subHtml = '<'+tag;
        if(layout.atts){
            //render the attibutes
            for(let i=0,l=layout.atts.length; i<l; i++){
                subHtml += ' ' + dataReplace(pageDataParts,layout.atts[i].key) + '="' + dataReplace(pageDataParts,layout.atts[i].value) + '"';
            }
        }
        subHtml += '>';
        //render the html
        if(layout.html){
            subHtml += dataReplace(pageDataParts,layout.html);
        }
        //render the children
        if(layout.children){
            if(layout.children.length > 0){
                subHtml += recursePage(pageDataParts,layout.children);
            }
        }
        //determine if the tag self closes
        for(var x=0; x<selfCloseLength; x++){
            if(tag === selfClose[x]){
                break;
            }
        }

        if(x === selfCloseLength){
            subHtml += '</' + tag + '>';
        }
        //add to html
        html += subHtml;
    }
    return html;

}

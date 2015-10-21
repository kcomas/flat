
"use strict"

import fs from 'fs';

/**
 * This function builds the html files for the admin page
 * @param {string} dir - the directory of the cache files
 * @param {string} permalink - the filename/permalink of the page
 * @param {array} tags - the array of tag objets as key:content
 * @param {array} files - the array of files objects as name:filename to render
 */
export default function pageRender(dir,permalink,tags,files){
    var file = dir+permalink + '.html';
    var loadedFiles = [];
    for(let key in files){
        loadedFiles.push({'name':key,'string':fs.readFileSync(files[key],'utf8')});
    }
    for(var i=0; i<loadedFiles.length; i++){
        for(var x=0; x<loadedFiles.length; x++){
            if(loadedFiles[i].string.indexOf('['+loadedFiles[x].name+']') > 0){
                loadedFiles[i].string.replace('['+loadedFiles[x].name+']',loadedFiles[x].string);
                loadedFiles.splice(x,1);
            }
        }
    }
    var string = loadedFiles.shift();
    fs.writeFileSync(file,string,'utf8');
}

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
    files.forEach(function(file){
        for(var key in file){
            try {
                loadedFiles.push({'name':key,'string':fs.readFileSync(file[key],'utf8')});
            } catch(err){
                console.log(err);
            }
        }
    });
    for(var i=1; i<loadedFiles.length; i++){
        loadedFiles[0].string.replace('['+loadedFiles[i].name+']',loadedFiles[i].string);
    }
    tags.forEach(function(tag){
        for(key in tag){
            loadedFiles[0].replace('['+key+']',tag[key]);
        }
    });
    console.dir(loadedFiles);
    fs.writeFileSync(file,string,'utf8');
}

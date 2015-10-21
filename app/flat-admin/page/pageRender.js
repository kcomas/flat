
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
    var file = dir+permalink.replace('/') + '.html';
    var loadedFiles = [];
    files.forEach(function(file){
        for(var key in file){
            try {
                loadedFiles.push({name:key,str:fs.readFileSync(file[key],'utf8')});
            } catch(err){
                console.log(err);
            }
        }
    });
    var container = loadedFiles.shift().str;
    loadedFiles.forEach(function(file2){
        try{
            container = container.replace('['+file2.name+']',file2.str);
        } catch(err){
            console.log(err);
        }
    });
    tags.forEach(function(tag){
        for(key in tag){
            try {
                container = container.replace('['+key+']',tag[key]);
            } catch(err){
                console.log(err);
            }
        }
    });
    console.log(container);
    try {
        fs.writeFileSync(file,container,'utf8');
    } catch(err){
        console.log(err);
    }
}

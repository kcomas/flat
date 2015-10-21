
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
                loadedFiles.push({name:key,str:fs.readFileSync(file[key],'utf8')});
            } catch(err){
                console.log(err);
            }
        }
    });
    var container = loadedFiles.shift().str;
    console.dir(container);
    loadedFiles.forEach(function(file2){
        try{
            var reg = new RegExp('\['+file2.name+'\]',g);
            container.replace(reg,file2.str);
        } catch(err){
            console.log(err);
        }
    });
    console.dir(container);
    tags.forEach(function(tag){
        for(key in tag){
            try {
                loadedFiles[0].str.replace('['+key+']',tag[key]);
            } catch(err){
                console.log(err);
            }
        }
    });
    console.dir(loadedFiles);
    fs.writeFileSync(file,string,'utf8');
}

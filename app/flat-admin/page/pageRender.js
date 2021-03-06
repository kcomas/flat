
"use strict"

import fs from 'fs';

/**
 * This function builds the html files for the admin page
 * @param {string} dir - the directory of the cache files
 * @param {string} permalink - the filename/permalink of the page
 * @param {array} tags - the array of tag objets as key:content
 * @param {array} files - the array of files objects as name:filename to render
 * @return {string} - the string of the file generated
 */
export default function pageRender(dir,permalink,tags,files){
    var file = dir+permalink.replace('/','~') + '.html';
    var loadedFiles = [];
    files.forEach((file)=>{
        for(var key in file){
            try {
                loadedFiles.push({name:key,str:fs.readFileSync(file[key],'utf8')});
            } catch(err){
                console.log(err);
            }
        }
    });
    var container = loadedFiles.shift().str;
    loadedFiles.forEach((file2)=>{
        try{
            var reg = new RegExp('%'+file2.name+'%','g');
            container = container.replace(reg,file2.str);
        } catch(err){
            console.log(err);
        }
    });
    tags.forEach((tag)=>{
        for(var key in tag){
            try {
                var reg = new RegExp('%'+key+'%','g');
                container = container.replace(reg,tag[key]);
            } catch(err){
                console.log(err);
            }
        }
    });
    try {
        fs.writeFileSync(file,container,'utf8');
    } catch(err){
        console.log(err);
    }
    return container;
}

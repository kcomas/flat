
"use strict"

/**
 * This function detrimes the file encoding to use when reading/writing files uploaded
 * @param {string} mime - the mime type
 * @return {string} the encoding to use
 */
export default function determineEncoding(mime){
    var encoding = 'binary';
    var textTypes = ['text','json','javascript'];
    for(let i=0,l=textTypes.length; i<l; i++){
        if(mime.indexOf(textTypes[i]) > -1){
            encoding = 'utf-8';
            break;
        }
    }
    return encoding;
}

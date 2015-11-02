
"use strict"

/**
 * Replaces object name with object value and passes back rendered layout
 * @param {object} toReplace - the replaces in the layout
 * @param {string} layout - the layout to replace
 * @return {string} the rendered layout
 */
export default function blogReplace(toReplace,layout){
    //@TODO CHNAGE THIS AND ALL OTHERS
    for(let key in toReplace){
        layout = layout.replace(key,toReplace[key]);
    }
    return layout;
}


"use strict"

/**
 * Check if the email is valid based on regex
 * @param {string} email - the email to check
 * @return {boolean} if the email is valid
 */
export default function emailVal(email){
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(email);
}


"use strict";

/**
 * Check if the email is valid based on regex
 * @param {string} email - the email to check
 * @return {boolean} if the email is valid
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = emailVal;

function emailVal(email) {
  var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(email);
}

module.exports = exports["default"];
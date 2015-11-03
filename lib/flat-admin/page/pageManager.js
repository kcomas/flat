
"use strict";

/**
 * Handeles the loading and saving of pages based on routes
 */
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pageManager = (function () {

    /**
     * @constructor
     * @param {array} pages - the pages to load into the page manager
     */

    function pageManager(pages) {
        _classCallCheck(this, pageManager);

        /**
         * The pages array
         * @type {array}
         */
        this.pages = pages;
    }

    /**
     * Load a page based on the url
     * @param {string} url - the url of the page
     * @param {function(err:error,page:string)} callback - the page if found or error if not
     * @return {function} the callback function
     */

    _createClass(pageManager, [{
        key: "load",
        value: function load(url, callback) {
            var page = null;
            for (var i = 0, _length = this.pages.length; i < _length; i++) {
                if (this.pages[i].permalink === url) {
                    page = this.pages[i];
                    break;
                }
            }
            if (page === null) {
                return callback(new Error("No Page Found"), null);
            }
            page.load(function (err, string) {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, string);
            });
        }

        /**
         * Render a page
         * @param {string} url - the url of the page
         * @return {Error} if there was an error rendering
         */
    }, {
        key: "render",
        value: function render(url) {
            var page = null;
            for (var i = 0, _length2 = this.pages.length; i < _length2; i++) {
                if (this.pages[i].permalink === url) {
                    page = this.pages[i];
                    break;
                }
            }
            if (page !== null) {
                try {
                    page.render();
                    return null;
                } catch (err) {
                    return error;
                }
            }
            return new Error("Page Not Found");
        }

        /**
         * Render all of the pages - SLOW
         * @return {array} array of errors if any 
         */
    }, {
        key: "renderAll",
        value: function renderAll() {
            var errors = [];
            this.pages.forEach(function (page) {
                try {
                    page.render();
                } catch (err) {
                    errors.push(err);
                }
            });
            return errors;
        }
    }]);

    return pageManager;
})();

exports["default"] = pageManager;
module.exports = exports["default"];
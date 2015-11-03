
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _helpersItemsItemJs = require('../helpers/items/item.js');

var _helpersItemsItemJs2 = _interopRequireDefault(_helpersItemsItemJs);

/**
 * This class manages the saving,loading from file and rendering from memory
 * @extend {item}
 */

var page = (function (_item) {
    _inherits(page, _item);

    function page() {
        _classCallCheck(this, page);

        _get(Object.getPrototypeOf(page.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(page, [{
        key: "create",

        /**
         * Create a new page
         * @overide
         * @param {string} permalink - the link of the page
         * @param {object} def - the default data to be passed into the page object as key:value
         * @property {string} name - the name of the string to replace
         * @property {string} type - the type of the string to replace text or html
         * @property {string} html - the html string
         * @param {string} template - the default template name
         * @param {function(err:err,done:boolean)} callback - returns done true if created
         * @return {function} the callback function
         */
        value: function create(permalink, def, template, callback) {
            var _this = this;

            this.genId(function (err, done) {
                if (err) {
                    return callback(err, null);
                }
                _this.data.permalink = permalink;
                _this.data.def = def;
                _this.data.dateCreated = new Date();
                _this.data.template = template;
                _this.save(function (err, done) {
                    return callback(err, done);
                });
            });
        }
    }]);

    return page;
})(_helpersItemsItemJs2["default"]);

exports["default"] = page;
module.exports = exports["default"];
"use strict";

/**
 * The class for looping through the routes and use function of the main server
 */
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var serverLoop = (function () {

    /**
     * @constructor
     * @param {object} req - the request object
     * @param {object} res - the response object
     * @param {array} uses - the array of use functions
     * @param {array} routers - the array of routers
     * @param {function} end - the final function to be called
     */

    function serverLoop(req, res, uses, routers, end) {
        _classCallCheck(this, serverLoop);

        /**
         * the position of the uses array
         */
        this.usesPosition = 0;

        this.req = req;
        this.res = res;
        this.uses = uses;
        this.routers = routers;
        this.end = end;
    }

    /**
     * the loop function to run through all the uses and routers
     */

    _createClass(serverLoop, [{
        key: "loop",
        value: function loop() {
            var _this = this;

            if (this.usesPosition < this.uses.length) {
                this.uses[this.usesPosition](this.req, this.res, function () {
                    _this.usesPosition++;
                    _this.loop();
                });
            } else {
                //loop through the routers
                var currentRouter = null;
                this.routers.forEach(function (router) {
                    if (_this.req.url.indexOf(router.path) > -1) {
                        currentRouter = router.router;
                    }
                });
                if (currentRouter === null) {
                    //run the end function
                    this.end(this.req, this.res);
                } else {
                    //run the route
                    currentRouter(this.req, this.res);
                }
            }
        }
    }]);

    return serverLoop;
})();

exports["default"] = serverLoop;
module.exports = exports["default"];
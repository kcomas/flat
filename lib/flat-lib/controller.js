
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _helpersItemsManagerJs = require('./helpers/items/manager.js');

var _helpersItemsManagerJs2 = _interopRequireDefault(_helpersItemsManagerJs);

/**
 * This class manages all of the managers
 */

var controller = (function () {

  /**
   * Add all of the managers into the class
   * @constructor
   * @param {pageManager} pageManager - the page manager
   * @param {sectionManager} sectionManager - the section manager
   * @param {sessionManager} sessionManager - the session manager
   * @param {templateManager} templateManager - the template manager
   * @param {userManager} userManager - the user manager
   * @param {cacheManager} cacheManager - the cache manager
   * @param {uploadManager} uploadManger - the uplaod manager
   * @param {blogManager} blogManager - the blog manager
   * @param {config} configManager - the config manager
   * @param {info} infoManager - the info manager
   * @param {uploadedFiles} uploadedFiles - the class that reads and writes files from the user
   * @param {blogTemplate} blogTemplate - the blog template manager
   * @param {cacheManager} blogCache - the cacheManager for blogs
   * @param {cacheManager} blogListCache - the cache manager for the blog lists
   */

  function controller(pageManager, sectionManager, sessionManager, templateManager, userManager, cacheManager, uploadManager, blogManager, configManager, infoManager, uploadedFiles, blogTemplate, blogCache, blogListCache) {
    _classCallCheck(this, controller);

    /**
     * The page manager
     * @type {pageManager}
     */
    this._pageManager = pageManager;

    /**
     * The Section Manager
     * @type {sectionManager}
     */
    this._sectionManager = sectionManager;

    /**
     * The session manager
     * @type {sessionManager}
     */
    this._sessionManager = sessionManager;

    /**
     * The template manager
     * @type {templateManager}
     */
    this._templateManager = templateManager;

    /**
     * The user manager
     * @type {userManager}
     */
    this._userManager = userManager;

    /**
     * The cache manager
     * @type {cacheManager}
     */
    this._cacheManager = cacheManager;

    /**
     * The uplaod manager
     * @type {uploadManager}
     */
    this._uploadManager = uploadManager;

    /**
     * The blog manager
     * @type {blogManager}
     */
    this._blogManager = blogManager;

    /**
     * The config manager
     * @type {config}
     */
    this._config = configManager;

    /**
     * The info manager
     * @type {info}
     */
    this._info = infoManager;

    /**
     * The user file manager
     * @type {uploadedFiles}
     */
    this._uploader = uploadedFiles;

    /**
     * The blog template manager
     * @type {blogTemplate}
     */
    this._blogTemplate = blogTemplate;

    /**
     * The blog cache manager
     * @type {cacheManager}
     */
    this._blogCache = blogCache;

    /**
     * The blog list cache manager
     * @type {cacheManager}
     */
    this._blogListCache = blogListCache;
  }

  /**
   * Get the page manager
   * @return {pageManager} the page manager
   */

  _createClass(controller, [{
    key: "init",

    /**
     * Init all of the managers
     */
    value: function init() {
      this._pageManager.init();
      this._sectionManager.init();
      this._sessionManager.init();
      this._templateManager.init();
      this._userManager.init();
      this._cacheManager.init();
      this._uploadManager.init();
      this._blogManager.init();
      this._blogCache.init();
      this._blogListCache.init();
    }
  }, {
    key: "pageManager",
    get: function get() {
      return this._pageManager;
    },

    /**
     * Set the pageManager
     * @param {pageManager} manager - the page manager
     */
    set: function set(manager) {
      this._pageManager = manager;
    }

    /**
     * Get the section manager
     * @return {sectionManager} the section manager
     */
  }, {
    key: "sectionManager",
    get: function get() {
      return this._sectionManager;
    },

    /**
     * Set the section manager
     * @param {sectionManager} manager - the section manager
     */
    set: function set(manager) {
      this._sectionManager = manager;
    }

    /**
     * Get the session manager
     * @return {sessionManager} the session manager
     */
  }, {
    key: "sessionManager",
    get: function get() {
      return this._sessionManager;
    },

    /**
     * Set the session manager
     * @param {sessionManager} manager - the session manager
     */
    set: function set(manager) {
      this._sessionManager = manager;
    }

    /**
     * Get the template manager
     * @return {templateManager} the template manager
     */
  }, {
    key: "templateManager",
    get: function get() {
      return this._templateManager;
    },

    /**
     * Set the template manager
     * @param {templateManager} manager - the template manager
     */
    set: function set(manager) {
      this._templateManager = manager;
    }

    /**
     * Get the user manager
     * @return {userManager} the user manager
     */
  }, {
    key: "userManager",
    get: function get() {
      return this._userManager;
    },

    /**
     * Set the user manager
     * @param {userManager} userManager - the user manager
     */
    set: function set(userManager) {
      this._userManager = _helpersItemsManagerJs2["default"];
    }

    /**
     * Get the cache manager
     * @return {cacheManager} the cache manager
     */
  }, {
    key: "cacheManager",
    get: function get() {
      return this._cacheManager;
    },

    /**
     * Set the cache manager
     * @param {cacheManager} manager - the cache manager
     */
    set: function set(manager) {
      this._cacheManager = manager;
    }

    /**
     * Get the upload manager
     * @return {uploadManger} the upload manager
     */
  }, {
    key: "uploadManager",
    get: function get() {
      return this._uploadManager;
    },

    /**
     * Set the upload manager
     * @param {uploadManager} manager - the upload manager
     */
    set: function set(manager) {
      this._uploadManager = manager;
    }

    /**
     * Get the blog manager
     * @return {blogManager} - the blog manager
     */
  }, {
    key: "blogManager",
    get: function get() {
      return this._blogManager;
    },

    /**
     * Set the blog manager
     * @param {blogManager} manager - the blog manager
     */
    set: function set(manager) {
      this._blogManager = manager;
    }

    /**
     * set the config manager
     * @param {config} manager - the config manager
     */
  }, {
    key: "config",
    set: function set(manager) {
      this._config = manager;
    },

    /**
     * get the config manager
     * @return {config} the config manager
     */
    get: function get() {
      return this._config;
    }

    /**
     * Set the info manager
     * @param {info} manager - the info manager
     */
  }, {
    key: "info",
    set: function set(manager) {
      this._info = manager;
    },

    /**
     * Get the info manager
     * @return {info} the info manager
     */
    get: function get() {
      return this._info;
    }

    /**
     * Set the user file manager
     * @param {uploadedFiles} manager - the user file manager
     */
  }, {
    key: "uploader",
    set: function set(manager) {
      this._uploader = manager;
    },

    /**
     * Get the user file manager
     * @return {uploadedFiles} the user file manager
     */
    get: function get() {
      return this._uploader;
    }

    /**
     * Set the blog template manager
     * @param {blogTemplate} manager - the blog template manager
     */
  }, {
    key: "blogTemplate",
    set: function set(manager) {
      this._blogTemplate = manager;
    },

    /**
     * Get the blog template manager
     * @return {blogTemplate} the blog template manager
     */
    get: function get() {
      return this._blogTemplate;
    }

    /**
     * Get the blog cache
     * @type {cacheManager}
     */
  }, {
    key: "blogCache",
    get: function get() {
      return this._blogCache;
    },

    /**
     * Set the blog cache
     * @param {cacheManager} manager - the blog cache manager
     */
    set: function set(manager) {
      this._blogCache = manager;
    }

    /**
     * Get the blog list cache
     * @return {cacheManager} - the blog list cache manager
     */
  }, {
    key: "blogListCache",
    get: function get() {
      return this._blogListCache;
    },

    /**
     * Set the blog list cache
     * @param {cacheManager} manager - the blog list cache manager
     */
    set: function set(manager) {
      this._blogListCache = manager;
    }
  }]);

  return controller;
})();

exports["default"] = controller;
module.exports = exports["default"];
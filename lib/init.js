
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _flatLibPagePageManagerJs = require('./flat-lib/page/pageManager.js');

var _flatLibPagePageManagerJs2 = _interopRequireDefault(_flatLibPagePageManagerJs);

var _flatLibSectionSectionManagerJs = require('./flat-lib/section/sectionManager.js');

var _flatLibSectionSectionManagerJs2 = _interopRequireDefault(_flatLibSectionSectionManagerJs);

var _flatLibSessionSessionManagerJs = require('./flat-lib/session/sessionManager.js');

var _flatLibSessionSessionManagerJs2 = _interopRequireDefault(_flatLibSessionSessionManagerJs);

var _flatLibTemplateTemplateManagerJs = require('./flat-lib/template/templateManager.js');

var _flatLibTemplateTemplateManagerJs2 = _interopRequireDefault(_flatLibTemplateTemplateManagerJs);

var _flatLibUserUserManagerJs = require('./flat-lib/user/userManager.js');

var _flatLibUserUserManagerJs2 = _interopRequireDefault(_flatLibUserUserManagerJs);

var _flatLibCacheCacheManagerJs = require('./flat-lib/cache/cacheManager.js');

var _flatLibCacheCacheManagerJs2 = _interopRequireDefault(_flatLibCacheCacheManagerJs);

var _flatLibUploadUploadManagerJs = require('./flat-lib/upload/uploadManager.js');

var _flatLibUploadUploadManagerJs2 = _interopRequireDefault(_flatLibUploadUploadManagerJs);

var _flatLibBlogBlogManagerJs = require('./flat-lib/blog/blogManager.js');

var _flatLibBlogBlogManagerJs2 = _interopRequireDefault(_flatLibBlogBlogManagerJs);

var _flatLibControllerJs = require('./flat-lib/controller.js');

var _flatLibControllerJs2 = _interopRequireDefault(_flatLibControllerJs);

var _flatLibConfigConfigJs = require('./flat-lib/config/config.js');

var _flatLibConfigConfigJs2 = _interopRequireDefault(_flatLibConfigConfigJs);

var _flatLibInfoInfoJs = require('./flat-lib/info/info.js');

var _flatLibInfoInfoJs2 = _interopRequireDefault(_flatLibInfoInfoJs);

var _flatLibHelpersUploadedFilesJs = require('./flat-lib/helpers/uploadedFiles.js');

var _flatLibHelpersUploadedFilesJs2 = _interopRequireDefault(_flatLibHelpersUploadedFilesJs);

var _flatLibBlogTemplateBlogTemplateJs = require('./flat-lib/blogTemplate/blogTemplate.js');

var _flatLibBlogTemplateBlogTemplateJs2 = _interopRequireDefault(_flatLibBlogTemplateBlogTemplateJs);

var config = new _flatLibConfigConfigJs2['default']('./flat-config/config.json');

var pm = new _flatLibPagePageManagerJs2['default'](config.getValue('pageDir'));

var sm = new _flatLibSectionSectionManagerJs2['default'](config.getValue('sectionDir'));

var ses = new _flatLibSessionSessionManagerJs2['default'](config.getValue('sessionDir'));

var tm = new _flatLibTemplateTemplateManagerJs2['default'](config.getValue('templateDir'));

var usm = new _flatLibUserUserManagerJs2['default'](config.getValue('userDir'));

var cm = new _flatLibCacheCacheManagerJs2['default'](config.getValue('cacheDir'));

var blogCache = new _flatLibCacheCacheManagerJs2['default'](config.getValue('blogCacheDir'));

var blogListCache = new _flatLibCacheCacheManagerJs2['default'](config.getValue('blogListCacheDir'));

var um = new _flatLibUploadUploadManagerJs2['default'](config.getValue('uploadDir'));

var bm = new _flatLibBlogBlogManagerJs2['default'](config.getValue('blogDir'));

var info = new _flatLibInfoInfoJs2['default'](config.getValue('infoDir'), config.getValue('infoFile'), parseInt(config.getValue('writeInfoToDiskAfter')));

var uploadDirs = config.getValue('upload');

var uploader = new _flatLibHelpersUploadedFilesJs2['default'](uploadDirs['public'], uploadDirs['private']);

var bt = new _flatLibBlogTemplateBlogTemplateJs2['default'](config.getValue('blogListTemplateDir'), config.getValue('blogListTemplateFile'));

var controll = new _flatLibControllerJs2['default'](pm, sm, ses, tm, usm, cm, um, bm, config, info, uploader, bt, blogCache, blogListCache);
controll.init();

exports['default'] = controll;
module.exports = exports['default'];
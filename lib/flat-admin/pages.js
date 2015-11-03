
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _pagePageJs = require('./page/page.js');

var _pagePageJs2 = _interopRequireDefault(_pagePageJs);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

/**
 * The global page config object
 * @type {object}
 * @property {string} templateDir - the directory of the templates
 * @property {string} contentDir - the directory of the content files
 * @property {string} cacheDir - the directory of the built pages
 * @property {array} metaDefault - the default meta object
 * @property {array} cssDefault - the default css object
 * @property {array} jsDefault - the default js object
 * @property {array} headJsDefault - the default head js object
 * @property {string} containerDefault - the default container filename
 * @property {string} headDefault - the default head filename
 * @property {string} menuDefault - the default menu filename
 * @property {string} bodyDefault - the default body filename 
 */
var pageConfig = JSON.parse(_fs2['default'].readFileSync('./flat-config/pageConfig.json'), 'utf8');

//make sure the cache dir exists
if (!_fs2['default'].existsSync(pageConfig.cacheDir)) {
  _fs2['default'].mkdirSync(pageConfig.cacheDir);
}

/**
 * This is the array of all of the admin pages
 * @type {array}
 */
var pages = [];

var index = new _pagePageJs2['default']('/', 'Admin Home', pageConfig, 'indexEdit');
index.addContents('Info', 'indexInfo.part');
index.addContents('Sessions', 'indexSessions.part');
index.addContents('Logs', 'indexLogs.part');
index.addJs({ "src": "/globals/admin/js/indexEditor.js" });

var upload = new _pagePageJs2['default']('/upload', 'Upload Files', pageConfig, 'adminUpload');
upload.addContents('Upload', 'fileUpload.part');
upload.addContents('List', 'fileList.part');
upload.addJs({ "src": "/globals/admin/js/uploadEditor.js" });

var sectionEditor = new _pagePageJs2['default']('/section-editor', 'Edit Section', pageConfig, 'adminSectionEdit');
sectionEditor.addContents('Edit', 'sectionEditor.part');
sectionEditor.addContents('List', 'sectionList.part');
sectionEditor.addJs({ "src": "/globals/admin/js/sectionEditor.js" });
sectionEditor.addHeadJs({ "src": "/globals/tinymce/tinymce.min.js" });

var templateEditor = new _pagePageJs2['default']('/template-editor', 'Edit Template', pageConfig, 'adminTemplateEdit');
templateEditor.addContents('Edit', 'templateEditor.part');
templateEditor.addContents('List', 'templateList.part');
templateEditor.addJs({ "src": "/globals/admin/js/templateEditor.js" });

var pageEditor = new _pagePageJs2['default']('/page-editor', 'Edit Page', pageConfig, 'adminPageEdit');
pageEditor.addContents('Edit', 'pageEditor.part');
pageEditor.addContents('List', 'pageList.part');
pageEditor.addJs({ "src": "/globals/admin/js/pageEditor.js" });
pageEditor.addHeadJs({ "src": "/globals/tinymce/tinymce.min.js" });

var userEditor = new _pagePageJs2['default']('/user-editor', 'Edit User', pageConfig, 'userPageEdit');
userEditor.addContents('Edit', 'userEditor.part');
userEditor.addContents('List', 'userList.part');
userEditor.addContents('Add', 'userAdd.part');
userEditor.addJs({ "src": "/globals/admin/js/userEditor.js" });

var blogEditor = new _pagePageJs2['default']('/blog-editor', 'Edit Blog', pageConfig, 'blogPageEdit');
blogEditor.addContents('Edit', 'blogEditor.part');
blogEditor.addContents('List', 'blogList.part');
blogEditor.addContents('Blog List Template', 'blogTemplate.part');
blogEditor.addJs({ "src": "/globals/admin/js/blogEditor.js" });
blogEditor.addHeadJs({ "src": "/globals/tinymce/tinymce.min.js" });

pages.push(index);
pages.push(sectionEditor);
pages.push(templateEditor);
pages.push(pageEditor);
pages.push(userEditor);
pages.push(upload);
pages.push(blogEditor);

exports['default'] = pages;
module.exports = exports['default'];
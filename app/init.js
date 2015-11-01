
"use strict"

import pageManager from './flat-lib/page/pageManager.js';
import sectionManager from './flat-lib/section/sectionManager.js';
import sessionManager from './flat-lib/session/sessionManager.js';
import templateManager from './flat-lib/template/templateManager.js';
import userManager from './flat-lib/user/userManager.js'
import cacheManager from './flat-lib/cache/cacheManager.js';
import uploadManager from './flat-lib/upload/uploadManager.js';
import blogManager from './flat-lib/blog/blogManager.js';
import controller from './flat-lib/controller.js';
import configManager from './flat-lib/config/config.js';
import infoManager from './flat-lib/info/info.js';
import uploadedFiles from './flat-lib/helpers/uploadedFiles.js';

const config = new configManager('./flat-config/config.json');

const pm = new pageManager(config.getValue('pageDir'));

const sm = new sectionManager(config.getValue('sectionDir'));

const ses = new sessionManager(config.getValue('sessionDir'));

const tm = new templateManager(config.getValue('templateDir'));

const usm = new userManager(config.getValue('userDir'));

const cm = new cacheManager(config.getValue('cacheDir'));

const um = new uploadManager(config.getValue('uploadDir'));

const bm = new blogManager(config.getValue('blogDir'));

const info = new infoManager(config.getValue('infoFile'),config.getValue('infoFile'),parseInt(config.getValue('writeInfoToDiskAfter')));

var uploadDirs =  config.getValue('upload');

const uploader = new uploadedFiles(uploadDirs.public,uploadDirs.private);

const controll = new controller(pm,sm,ses,tm,usm,cm,um,bm,config,info,uploader); 
controll.init();

export default controll;

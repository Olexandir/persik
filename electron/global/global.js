/* Start global constants */
exports.app = require('electron').app;
exports.Menu = require('electron').Menu;
exports.shell = require('electron').shell;
exports.dialog = require('electron').dialog;
exports.ipcMain = require('electron').ipcMain;
exports.session = require('electron').session;
exports.contextBridge = require('electron').contextBridge;
exports.BrowserWindow = require('electron').BrowserWindow;
exports.globalShortcut = require('electron').globalShortcut;
exports.windowStateKeeper = require('electron-window-state');
exports.systemPreferences = require('electron').systemPreferences;
exports.powerSaveBlocker = require('electron').powerSaveBlocker;

exports.isDev = require('electron-is-dev');
// exports.physicalCpuCount = require('physical-cpu-count');
// exports.autoUpdater = require('electron-updater').autoUpdater;

exports.os = require('os');
// exports.osUtils = require('node-os-utils');
exports.url = require('url');
exports.path = require('path');
exports.fs = require('graceful-fs');
// exports.process = require('process');
// exports.fileType = require('file-type');
// exports.getPath = require('platform-folders');
// exports.checkDiskSpace = require('check-disk-space');
// exports.machineId = require('node-machine-id').machineId;
// exports.machineIdSync = require('node-machine-id').machineIdSync;

// exports.templateNone = require('../menu-templates/menu-templates').templateNone;
// exports.templateDefault = require('../menu-templates/menu-templates').templateDefault;

// exports.axios = require('axios').default;
/* End global constants */

/* Start global variables */
exports.homePage = '';
exports.deviceId = '';
exports.platform = '';
exports.win = '';
/* End global variables */

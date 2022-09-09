const global = require('./electron/global/global');

function initWindow() {
  const mainWindowState = global.windowStateKeeper({
    defaultWidth: 1300,
    defaultHeight: 750
  });
  global.win = new global.BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    center: true,
    minWidth: 1180,
    minHeight: 600,
    fullscreen: true,
    titleBarStyle: 'hidden',
    trafficLightPosition: {
      x: 12,
      y: 20
    },
    icon: global.path.join(__dirname, './src/favicon.ico'),
    webPreferences: {
      // preload: global.path.join(__dirname, './preload.js'),
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: true,
      devTools: global.isDev
    },
    frame: false
  });

  global.win.loadURL(
    global.url.format({
      pathname: global.path.join(__dirname, `./dist/index.html`),
      protocol: 'file:',
      slashes: true
    })
  );

  mainWindowState.manage(global.win);

  global.win.on('closed', function () {
    global.win = null;
  });

  global.win.webContents.openDevTools();
}

//listeners
global.app.on('ready', initWindow);
global.app.on('window-all-closed', function () {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    global.app.quit();
  }
});
global.app.on('activate', function () {
  if (win === null) {
    initWindow();
  }
});

global.app.on('browser-window-focus', function () {
  global.globalShortcut.register('CommandOrControl+R', () => {
    console.log('CommandOrControl+R is pressed: Shortcut Disabled');
  });
  global.globalShortcut.register('F5', () => {
    console.log('F5 is pressed: Shortcut Disabled');
  });
});
global.app.on('browser-window-blur', function () {
  global.globalShortcut.unregister('CommandOrControl+R');
  global.globalShortcut.unregister('F5');
});

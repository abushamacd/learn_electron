const { app, BrowserWindow } = require("electron/main");
const windowStateKeeper = require("electron-window-state");
const path = require("path");
const { ipcMain } = require("electron");
let win;
const createWindow = () => {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 1000,
  });

  win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    title: "Web Title",
    webPreferences: {
      // nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  // win.loadFile("index.html");

  if (process.env.mode !== "production") {
    win.webContents.openDevTools();
  }

  mainWindowState.manage(win);
};

app.whenReady().then(() => {
  createWindow();

  // send to renderer process
  win.webContents.send("send", "Take it");

  // get to renderer process
  ipcMain.handle("rptomp", (event, arg) => {
    console.log(arg);

    return "Data Receiving";
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

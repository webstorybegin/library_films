const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, "resources/icons/app_icon.png"),
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.setMenuBarVisibility(true);

  // Development
  mainWindow.loadURL("http://localhost:3000/films_library");
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
});

ipcMain.on("minimize", (event, args) => {
  console.log("minimize");
});

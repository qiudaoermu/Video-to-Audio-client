const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const videoToAudio = require("./convert.js")
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  const indexPath = path.join(__dirname, 'index.html');

  mainWindow.loadFile(indexPath); // Update the file path to the bundled index.html
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('open-dialog', async (event) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'Videos', extensions: ['mp4', 'mov', 'avi', 'rmvb'] }],
  });
  if (!result.canceled && result.filePaths.length > 0) {
    const filePaths = result.filePaths;
    filePaths.forEach(item => {
      videoToAudio(item)
    })
    // event.reply('selected-files', filePaths);
  }
});

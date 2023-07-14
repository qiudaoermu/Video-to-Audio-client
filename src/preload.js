const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel, listener) => {
    console.log(listener,"listener")
    ipcRenderer.on(channel, listener);
  },
});

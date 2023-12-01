const { app, BrowserWindow } = require('electron');

app.disableHardwareAcceleration(); // Deshabilitar la aceleración de hardware

let win; // Declaración de la variable win

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile('Login.html');
}

app.whenReady().then(createWindow);

const { app, BrowserWindow, remote } = require('electron')

let mainWindow

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        width: 800,
        height: 700, 
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: __dirname + '/src/images/favicon.ico'
    })

    mainWindow.loadURL(`file://${__dirname}/index.html`)

})
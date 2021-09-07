const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const tmi = require('tmi.js');

function createWindow () {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, '/preload.js')
		}
	})
	
	win.webContents.openDevTools()
	win.loadFile('index.html')
}


app.whenReady().then(() => {
	createWindow()

	app.on('activate', function() {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('start-chat', (event, arg) => {
	console.log("starting chat");
	const client = new tmi.Client({
		options: { debug: true, messagesLogLevel: "info" },
		connection: {
			reconnect: true,
			secure: true
		},
		identity: {
			username: 'alcaeus_',
			password: 'oauth:4o2d4gjarti4qzcj54iom0h2dmmbnx'
		},
		channels: [ 'cohhcarnage' ]
	});

	client.connect().catch(console.error);
	
	client.on('message', (channel, tags, message, self) => {
		event.reply('chat-reply', message)
	});

})

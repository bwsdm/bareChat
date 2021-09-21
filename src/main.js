const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const tmi = require('tmi.js');
const querystring = require('querystring');

var output = "";

function createWindow () {
	const win = new BrowserWindow({
		width: 1600,
		height: 900,
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
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('get-auth-URL', (event, arg) => {
	const params = {
		client_id: 'fqqc53xh0gnvms57x43k07walos930',
		redirect_uri: 'http://localhost',
		response_type: 'token',
		scope: 'chat:read chat:edit'
	}
	const url = 'https://id.twitch.tv/oauth2/authorize?'

	const args = querystring.stringify(params);
	event.reply('auth-URL-reply', url + args);
	
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
			username: '',
			password: ''
		},
		channels: [ '' ]
	});

	client.connect().catch(console.error);
	
	client.on('message', (channel, tags, message, self) => {
		event.reply('chat-reply', message)
	});

})

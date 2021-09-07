const { ipcMain } = require('electron')
const tmi = require('tmi.js')

function getMessages() {
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
	
	while(client) {
		client.on('message', (channel, tags, message, self) => {
			console.log(message)
			return message;

		});
	}
}


ipcMain.handle('chat-start', (event, arg) => {
	getMessages()
	event.reply('chat-start-reply', 'Started chat stream')
})

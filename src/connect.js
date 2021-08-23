const tmi = require('tmi.js');

export function getMessages() {
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
		channels: [ 'mathil1' ]
	});

	client.connect().catch(console.error);
	client.on('message', (channel, tags, message, self) => {
		return message;

	});
}

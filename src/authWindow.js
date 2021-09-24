const { BrowserWindow } = require('electron')
const querystring = require('querystring')
const nodeUrl = require('url')


function createAuthWindow() {
	console.log("WE MADE IT");
	const params = {
		client_id: 'fqqc53xh0gnvms57x43k07walos930',
		redirect_uri: 'http://localhost',
		response_type: 'token',
		scope: 'chat:read chat:edit'
	}

	const authWindow = new BrowserWindow({
		width:800,
		height: 600,
	})

	const twitchUrl = 'https://id.twitch.tv/oauth2/authorize?'
	const args = querystring.stringify(params)

	authWindow.loadURL(twitchUrl + args);
	authWindow.show();

	authWindow.on('closed', () => {
		reject(new Error('window was closed by user'));
	});

	function onCallback(url) {
		const urlParts = nodeUrl.parse(url, true);
		const query = urlParts.query;
		const code = query.code;
		const error = query.error;

		console.log(url);
		console.log(urlParts);
		console.log(query);

		if (error !== undefined) {
			reject(error);
			authWindow.removeAllListeners('closed');
			setImmediate(function () {
				authWindow.close();
			});
		} else if (code) {
			resolve(code)
			authWindow.removeAllListeners('closed')
			setImmediate(function() {
				authWindow.close()
			})
		}
	}

	authWindow.webContents.on('will-navigate', (event, url) => {
		onCallback(url)
	})

	authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
		onCalllback(newUrl)
	})
}

exports.createAuthWindow = createAuthWindow;

const { contextBridge, ipcRenderer, shell } = require('electron');



contextBridge.exposeInMainWorld(
	'electron',
	{
		startChat: () => ipcRenderer.send('start-chat'),
		chatIngest: (event, arg) => ipcRenderer.on('chat-reply', (event, arg) => {
			const element = document.getElementById("chatBox")
			if (element) {
				element.innerText = arg
			}
		}),
		getAuthURL: () => ipcRenderer.send('get-auth-URL'),
		recAuthURL: (event, url) => ipcRenderer.on('auth-URL-reply', (event, url) => {
			const loginButton = document.getElementById("loginButton")
			loginButton.addEventListener('click', function(event) {
				shell.openExternal(url);
			})
			
		})
	}
)



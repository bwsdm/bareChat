const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
	'electron',
	{
		startChat: () => ipcRenderer.send('start-chat'),
		chatIngest: (event, arg) => ipcRenderer.on('chat-reply', (event, arg) => {
			const element = document.getElementById("chatBox")
			if (element) {
				element.innerText = arg
			}
		})
	}
)


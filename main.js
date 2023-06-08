// Req
const { app, BrowserWindow, ipcMain, protocol } = require('electron');
const { Menu } = require('electron');
const { shell } = require('electron');
const contextMenu = require('electron-context-menu')
const fetch = require('cross-fetch');
const { ElectronBlocker } = require('@cliqz/adblocker-electron');

const lists = [
	"https://easylist.to/easylist/easylist.txt", 
	"https://ublockorigin.github.io/uAssets/filters/filters.txt?_=8",
	"https://ublockorigin.github.io/uAssets/filters/filters-2020.txt?_=8",
	"https://ublockorigin.github.io/uAssets/filters/filters-2021.txt?_=8",
	"https://ublockorigin.github.io/uAssets/filters/filters-2022.txt?_=8",
	"https://ublockorigin.github.io/uAssets/filters/filters-2023.txt?_=8",
	"https://ublockorigin.github.io/uAssets/filters/badware.txt?_=8",
	"https://ublockorigin.github.io/uAssets/filters/privacy.txt?_=8",
	"https://ublockorigin.github.io/uAssets/filters/resource-abuse.txt?_=8",
	"https://ublockorigin.github.io/uAssets/filters/unbreak.txt?_=8",
	"https://ublockorigin.github.io/uAssets/filters/quick-fixes.txt?_=8",
	"https://filters.adtidy.org/extension/ublock/filters/3.txt?_=8"
]


// Main & webview Settings
app.setName('Squirrel')
app.userAgentFallback = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Squirrel/0.0.1 Chrome/112.0.0.0 Safari/537.3';
app.on('ready', () => {
	protocol.registerHttpProtocol('Squirrel', (request, callback) => {
	  const url = request.url.substr(7) // remove the `squirrel://` protocol prefix
	  callback({path: url})
	})
  })


// Updater
const update = require('./functions/update.js');
console.log("Update Found")
console.log("Updating...")
update();

// Discord RPC
const rpc = require('./functions/rpc-discord.js');
rpc();

app.on("web-contents-created", (event, contents) => {
	if (contents.getType() === 'webview') {
	   contextMenu({
		  window: contents,
		  copy: true,
		  paste: true,
		  showSaveImageAs: true,
		  showInspectElement: true
	   });
	}
 })

// StartApp
let startUpWindow;

app.once('ready', () => {
	//Menu.setApplicationMenu(null) // Vypne developerské menu
	/*startUpWindow = new BrowserWindow({
		width: 400,
		height: 350,
		icon: 'logo.png',
		title: 'Squirrel Browser',
		frame: false,
		autoHideMenuBar: true,
		transparent: true,
		show: false,
	});
	startUpWindow.loadFile('./public/startup.html');
	startUpWindow.once('ready-to-show', () => {
		startUpWindow.show();
		startUpWindow.webContents.executeJavaScript(`
    const audio = document.getElementById('startup-sound');
    audio.play();
    `);
		setTimeout(() => {
			startUpWindow.webContents.executeJavaScript(`
        const audio = document.getElementById('startup-sound');
        audio.pause();
    `);
			startUpWindow.hide();
			createMainWindow();
		}, 10000);
	});*/
	createMainWindow();
});

function createMainWindow() {
	const mainWindow = new BrowserWindow({
		width: 1920,
		height: 1080,
		icon: 'logo.png',
		frame: false,
		autoHideMenuBar: true,
		webPreferences: {
			webviewTag: true,
			preload: __dirname + "/preload.js"
		},
	});
	
	ElectronBlocker.fromLists(fetch, lists)
	.then((blocker) => {
		blocker.enableBlockingInSession(mainWindow.webContents.session);
	});


	ipcMain.on('minimize', event => {
		const webContents = event.sender
		const win = BrowserWindow.fromWebContents(webContents)
		win.minimize();
	})

	ipcMain.on('maximize', event => {
		const webContents = event.sender
		const win = BrowserWindow.fromWebContents(webContents)
		win.maximize();
	})

	ipcMain.on('close', event => {
		const webContents = event.sender
		const win = BrowserWindow.fromWebContents(webContents)
		win.close();
	})

	mainWindow.loadFile('./public/index.html');

}

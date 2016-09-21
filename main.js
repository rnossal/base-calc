// Pricipal constants.
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// require('electron-reload')(__dirname);

let mainWindow = null;

// Initialize the window
let init = () => {
	mainWindow = new BrowserWindow({
		width: 400,
		height: 600,
		minWidth: 400,
		minHeight: 600,
		icon: `${__dirname}/assets/app-icon/png/512.png`
	});

	// mainWindow.setMenu(null);

	mainWindow.loadURL(`file://${__dirname}/index.html`);

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
};

// Start everything
app.on('ready', init);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		init();
	}
});

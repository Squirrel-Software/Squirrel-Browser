const { autoUpdater } = require('electron-updater');

function update() {
  autoUpdater.setFeedURL({
    provider: 'github',
    owner: 'Squirrel-Software',
    repo: 'Squirrel-Browser'
  });

  autoUpdater.on('update-available', (info) => {
    console.log(`Nájdená nová verzia: ${info.version}. Sťahovanie...`);
  });

  autoUpdater.on('update-downloaded', (info) => {
    console.log(`Stiahnutá nová verzia ${info.version}. Inštalácia...`);
    autoUpdater.quitAndInstall();
  });

  autoUpdater.checkForUpdates();
}

module.exports = update;
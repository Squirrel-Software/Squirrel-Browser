function update() {
    const { autoUpdater } = require('electron-updater');
    autoUpdater.setFeedURL({
        provider: "github",
        repo: "Squirrel-Software/Squirrel-Browser"
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
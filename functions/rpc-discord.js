function rpc() {
    const DiscordRPC = require('discord-rpc');
    const clientId = '1116308590622408744';
    DiscordRPC.register(clientId);
    const rpc = new DiscordRPC.Client({ transport: 'ipc' });

  
  rpc.on('ready', () => {
    console.log("Discord RPC is ready");
    rpc.setActivity({
      state: 'Browsing...',
      startTimestamp: new Date(),
      largeImageKey: 'logo',
      instance: false
    });
  });
  
  rpc.login({ clientId }).catch(console.error);
  
  }
  
  module.exports = rpc;
  
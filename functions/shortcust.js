document.addEventListener('keydown', (event) => {
  if (event.code === 'F5') { // Refresh current website
    event.preventDefault();
    webview.reload();
  } else if (event.ctrlKey && event.shiftKey && (event.code === 'KeyI' || event.code === 'KeyJ')) { // Devtools
    event.preventDefault();
    webview.openDevTools();
  } else if (event.code === 'F12') { // Devtools
    event.preventDefault();
    webview.openDevTools();
  } else if (event.ctrlKey && event.code === 'KeyT') { // Open new tab
    event.preventDefault();
    addTab();
  } else if (event.ctrlKey && event.code === 'KeyW') { // Close current tab (BUG: If you close tab with this shortcut you dont go to lastest tab NEED FIX)
    event.preventDefault();
    tab.querySelector(".close-tab").click();
  }
});
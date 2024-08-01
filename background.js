chrome.action.onClicked.addListener((tab) => {
  console.log("toggleDarkMode");
  chrome.tabs.sendMessage(tab.id, { action: "toggleDarkMode" });
});

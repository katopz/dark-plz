function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleDarkMode") {
    toggleDarkMode();
  }
});

function toggleDarkMode() {
  const body = document.body;
  if (body.classList.contains("light")) {
    body.classList.remove("light");
    body.classList.add("dark");
  } else if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.classList.add("light");
  } else {
    body.classList.toggle("dark-mode");
  }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleDarkMode") {
    toggleDarkMode();
  }
});

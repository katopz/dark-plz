// Function to toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  const images = document.querySelectorAll("img");

  if (body.style.filter) {
    // If dark mode is already enabled, reset the filters
    body.style.filter = "";
    images.forEach((img) => {
      img.style.filter = "";
    });
  } else {
    // Apply dark mode filters
    body.style.filter = "invert(1) hue-rotate(180deg)";
    images.forEach((img) => {
      img.style.filter = "invert(1) hue-rotate(180deg)";
    });
  }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleDarkMode") {
    toggleDarkMode();
  }
});

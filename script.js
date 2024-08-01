function toggleDarkMode() {
  const body = document.body;
  // for https://chat.deepseek.com/
  if (body.classList.contains("light")) {
    body.classList.remove("light");
    body.classList.add("dark");
    localStorage.setItem("theme", "dark-mode");
  } else if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.classList.add("light");
    localStorage.setItem("theme", "light-mode");
  } else {
    body.classList.toggle("dark-mode");
    localStorage.setItem(
      "theme",
      body.classList.contains("dark-mode") ? "dark-mode" : "light-mode"
    );
  }
}

// Function to load the theme from localStorage
function loadTheme() {
  const body = document.body;
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    if (body.classList.contains("light")) {
      body.classList.remove("light");
      body.classList.add(savedTheme.split("-")[0]);
    } else if (body.classList.contains("dark")) {
      body.classList.remove("dark");
      body.classList.add(savedTheme.split("-")[0]);
    } else {
      body.classList.add(savedTheme);
    }
  } else {
    body.classList.add("light-mode");
  }
}

// Function to observe DOM changes and reapply the theme
function observeDOMChanges() {
  const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        loadTheme();
      }
    }
  });

  // Observe all immediate children of the body
  const bodyChildren = document.body.children;
  for (let child of bodyChildren) {
    observer.observe(child, {
      childList: true,
      subtree: true,
    });
  }
}

// Load the theme when the page loads
window.addEventListener("load", () => {
  loadTheme();
  observeDOMChanges();
});

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleDarkMode") {
    toggleDarkMode();
  }
});

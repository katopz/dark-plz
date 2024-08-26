function toggleDarkMode() {
  const body = document.body;

  // For https://chat.deepseek.com/
  if (body.classList.contains("light")) {
    body.classList.remove("light");
    body.classList.add("dark");
    localStorage.setItem("theme", "dark-plz");
  } else if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.classList.add("light");
    localStorage.setItem("theme", "light-plz");
  } else {
    const html = document.documentElement;

    // For https://arxiv.org/
    const embed = document.body.querySelector("embed");
    if (!embed) {
      html.classList.toggle("dark-plz");
    } else if (embed.style.filter === "") {
      embed.style.filter = "invert(1) hue-rotate(180deg)";
    } else {
      embed.style.filter = "";
    }
    localStorage.setItem(
      "theme",
      html.classList.contains("dark-plz") ? "dark-plz" : "light-plz"
    );
  }
}

// Function to load the theme from localStorage
function loadTheme() {
  const body = document.body;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    // For https://chat.deepseek.com/
    if (body.classList.contains("light")) {
      body.classList.remove("light");
      body.classList.add(savedTheme.split("-")[0]);
    } else if (body.classList.contains("dark")) {
      body.classList.remove("dark");
      body.classList.add(savedTheme.split("-")[0]);
    } else {
      const html = document.documentElement;
      // For https://arxiv.org/
      const embed = document.body.querySelector("embed");
      if (!embed) {
        if (savedTheme == "dark-plz") {
          html.classList.add(savedTheme);
        }
      } else if (savedTheme == "dark-plz") {
        embed.style.filter = "invert(1) hue-rotate(180deg)";
      } else {
        embed.style.filter = "";
      }
    }
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

  observer.observe(document.head, {
    childList: true,
    subtree: true,
  });
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

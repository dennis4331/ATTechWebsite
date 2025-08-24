// 🌙 Darkmode Umschalten
document.addEventListener("DOMContentLoaded", () => {
  const darkToggle = document.getElementById("darkmode-toggle");

  if (!darkToggle) return; // Falls Toggle nicht existiert → nichts machen

  // Zustand laden (bevor der User interagiert)
  if (localStorage.getItem("darkmode") === "true") {
    document.documentElement.classList.add("dark");
    darkToggle.checked = true;
  } else {
    document.documentElement.classList.remove("dark");
    darkToggle.checked = false;
  }

  // Umschalten
  darkToggle.addEventListener("change", () => {
    if (darkToggle.checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkmode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkmode", "false");
    }
  });
});



// 🔑 Netlify Identity (global für alle Seiten)
if (window.netlifyIdentity) {
  netlifyIdentity.init();

  function updateUI(user) {
    const loggedIn = !!user;

    // Desktop
    const btnLoginDesktop = document.getElementById("netlify-login-desktop");
    const btnLogoutDesktop = document.getElementById("netlify-logout-desktop");
    if (btnLoginDesktop) btnLoginDesktop.classList.toggle("hidden", loggedIn);
    if (btnLogoutDesktop) btnLogoutDesktop.classList.toggle("hidden", !loggedIn);

    // Mobile
    const btnLoginMobile = document.getElementById("netlify-login-mobile");
    const btnLogoutMobile = document.getElementById("netlify-logout-mobile");
    if (btnLoginMobile) btnLoginMobile.classList.toggle("hidden", loggedIn);
    if (btnLogoutMobile) btnLogoutMobile.classList.toggle("hidden", !loggedIn);
  }

  // Globales Event Delegation (Login/Logout Buttons)
  document.addEventListener("click", e => {
    if (e.target.closest("#netlify-login-desktop") || e.target.closest("#netlify-login-mobile")) {
      netlifyIdentity.open("login");
    }
    if (e.target.closest("#netlify-logout-desktop") || e.target.closest("#netlify-logout-mobile")) {
      netlifyIdentity.logout();
    }
  });

  // Events von Netlify Identity
  netlifyIdentity.on("init", user => updateUI(user));
  netlifyIdentity.on("login", user => {
    updateUI(user);
    netlifyIdentity.close();
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu) mobileMenu.classList.add("hidden");
  });
  netlifyIdentity.on("logout", () => updateUI(null));

  // Direkt beim Laden (falls User schon eingeloggt ist)
  updateUI(netlifyIdentity.currentUser());
}





// 📌 Aktive Seite markieren
(function () {
  function normalizePath(input) {
    try {
      const url = new URL(input, window.location.href);
      let path = url.pathname;
      if (path.endsWith("/")) path += "index.html";
      const file = path.split("/").pop();
      return file || "index.html";
    } catch (e) {
      let s = (input || "").split("#")[0].split("?")[0];
      if (s.endsWith("/")) s += "index.html";
      return s.split("/").pop() || "index.html";
    }
  }

  const current = normalizePath(window.location.href);
  document.querySelectorAll("nav a[href]").forEach(a => {
    const target = normalizePath(a.getAttribute("href"));
    if (target === current) {
      a.classList.add("text-purple-500", "font-bold");
      a.setAttribute("aria-current", "page");
    } else {
      a.classList.remove("text-purple-500", "font-bold");
      a.removeAttribute("aria-current");
    }
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  // 📱 Hamburger-Menü
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // 🌙 Darkmode (Desktop & Mobile gemeinsam)
  function setDarkmode(enabled) {
    document.documentElement.classList.toggle("dark", enabled);
    localStorage.setItem("darkmode", enabled ? "true" : "false");
    if (document.getElementById("darkmode-toggle"))
      document.getElementById("darkmode-toggle").checked = enabled;
    if (document.getElementById("darkmode-toggle-mobile"))
      document.getElementById("darkmode-toggle-mobile").checked = enabled;
  }

  const saved = localStorage.getItem("darkmode") === "true";
  setDarkmode(saved);

  ["darkmode-toggle", "darkmode-toggle-mobile"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("change", () => setDarkmode(el.checked));
    }
  });

  


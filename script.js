// 🌙 Darkmode Umschalten
document.addEventListener("DOMContentLoaded", () => {
  const toggles = [
    document.getElementById("darkmode-toggle-desktop"),
    document.getElementById("darkmode-toggle-mobile")
  ].filter(Boolean); // Nur existierende nehmen

  if (!toggles.length) return;

  // Zustand laden
  const isDark = localStorage.getItem("darkmode") === "true";
  document.documentElement.classList.toggle("dark", isDark);
  toggles.forEach(t => (t.checked = isDark));

  // Umschalten + Synchronisieren
  toggles.forEach(toggle => {
    toggle.addEventListener("change", (e) => {
      const enabled = e.target.checked;
      document.documentElement.classList.toggle("dark", enabled);
      localStorage.setItem("darkmode", enabled);

      // andere Switches mitziehen
      toggles.forEach(t => (t.checked = enabled));
    });
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
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuToggle && mobileMenu) {
      // Toggle öffnen/schließen
      menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });

      // Menü schließen, wenn ein Link oder Button angeklickt wird
      mobileMenu.querySelectorAll("a, button").forEach(el => {
        el.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
        });
      });
    }
  });



  


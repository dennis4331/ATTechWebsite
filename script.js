// 🌙 Darkmode Umschalten
document.addEventListener("DOMContentLoaded", () => {
  const darkToggle = document.getElementById("darkmode-toggle");
  if (darkToggle) {
    darkToggle.addEventListener("change", () => {
      document.documentElement.classList.toggle("dark", darkToggle.checked);
      localStorage.setItem("darkmode", darkToggle.checked ? "true" : "false");
    });

    // Zustand laden
    if (localStorage.getItem("darkmode") === "true") {
      document.documentElement.classList.add("dark");
      darkToggle.checked = true;
    }
  }
});


// 🔑 Netlify Identity
if (window.netlifyIdentity) {
  netlifyIdentity.init();

  document.addEventListener("DOMContentLoaded", () => {
    const statusDesktop = document.getElementById("status-desktop");
    const statusMobile = document.getElementById("status-mobile");
    const mobileMenu = document.getElementById("mobileMenu");

    function updateUI(user) {
      const loggedIn = !!user;

      // Desktop
      const btnLoginDesktop = document.getElementById("netlify-login-desktop");
      const btnLogoutDesktop = document.getElementById("netlify-logout-desktop");
      if (btnLoginDesktop) btnLoginDesktop.classList.toggle("hidden", loggedIn);
      if (btnLogoutDesktop) btnLogoutDesktop.classList.toggle("hidden", !loggedIn);
      if (statusDesktop) statusDesktop.textContent = "";

      // Mobile
      const btnLoginMobile = document.getElementById("netlify-login-mobile");
      const btnLogoutMobile = document.getElementById("netlify-logout-mobile");
      if (btnLoginMobile) btnLoginMobile.classList.toggle("hidden", loggedIn);
      if (btnLogoutMobile) btnLogoutMobile.classList.toggle("hidden", !loggedIn);
      if (statusMobile) statusMobile.textContent = "";
    }

    // Delegation: Klicks einmal global abfangen
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
      if (mobileMenu) mobileMenu.classList.add("hidden");
    });
    netlifyIdentity.on("logout", () => updateUI(null));

    // Falls schon eingeloggt
    updateUI(netlifyIdentity.currentUser());
  });
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


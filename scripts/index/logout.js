document.addEventListener("DOMContentLoaded", () => {
  const myAccountLink = document.getElementById("myAccount");
  const token = localStorage.getItem("token");

  if (token) {
    const logoutLink = document.createElement("a");
    logoutLink.className = "nav-link";
    logoutLink.id = "logout";
    logoutLink.textContent = "Sair";
    logoutLink.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "../../pages/user/login.html";
    });

    const navMenu = document.querySelector(".nav-menu");
    navMenu.appendChild(logoutLink);
  }
});

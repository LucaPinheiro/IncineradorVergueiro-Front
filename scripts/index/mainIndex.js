document.addEventListener("DOMContentLoaded", () => {
  const myAccountLink = document.getElementById("myAccount");

  myAccountLink.addEventListener("click", () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "../../pages/user/login.html";
    } else {
      window.location.href = "../../pages/user/myAccount.html";
    }
  });
});

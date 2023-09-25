export function toggleNavVisibility(menuButton, nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("nav--visible");
    });
  }
  
import { clearCart } from "./functions/clearCart.js";
import { updateTotal } from "./functions/updateTotal.js";

let cartData; 

document.addEventListener("DOMContentLoaded", () => {
  const cartDataJSON = localStorage.getItem("cartData");
  const userId = localStorage.getItem("userId");

  if (cartDataJSON && userId) {
    cartData = JSON.parse(cartDataJSON);

    const cartTable = document.getElementById("cartTable");
    const cartTableBody = cartTable.querySelector("tbody");
    cartTableBody.innerHTML = "";

    cartData.items.forEach((item) => {
      const newRow = cartTableBody.insertRow();
      const productNameCell = newRow.insertCell(0);
      const productQuantityCell = newRow.insertCell(1);
      const productPriceCell = newRow.insertCell(2);
      const deleteButtonCell = newRow.insertCell(3);

      productNameCell.textContent = item.name;
      productQuantityCell.textContent = item.quantity;
      productPriceCell.textContent = `R$ ${item.price.toFixed(2)}`;
      productPriceCell.classList.add("product-price");

      const trashImg = document.createElement("img");
      trashImg.src = "../../assets/store/trash.svg";
      trashImg.alt = "Remover";
      trashImg.className = "trash-icon";
      deleteButtonCell.appendChild(trashImg);

      trashImg.addEventListener("click", () => {
        newRow.style.animation = "fadeOut 0.3s";

        setTimeout(() => {
          cartTableBody.removeChild(newRow);

          newRow.style.animation = "none";

          const index = cartData.items.findIndex((i) => i.name === item.name);
          if (index !== -1) {
            cartData.items.splice(index, 1);

            cartData.total -= item.price;

            const cartTotalElement = document.getElementById("cartTotal");
            cartTotalElement.textContent = `Total: R$ ${cartData.total.toFixed(
              2
            )}`;
          }

          localStorage.setItem("cartData", JSON.stringify(cartData));
        }, 300);
      });
    });

    updateTotal();
  }

  let date = new Date();
  let day = date.getDay();
  let alteratingDays = document.getElementById("days-of-week");

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  for (let i = 1; i <= 4; i++) {
    let days = document.createElement("p");
    let dayIndex = (day + i - 1) % 7;
    days.textContent = daysOfWeek[dayIndex];
    days.setAttribute("data-day", daysOfWeek[dayIndex]);

    if (day === 1 && i === 1) {
      days.classList.add("container__fourth-box-text");
    }

    alteratingDays.appendChild(days);
  }

  document.getElementById("buttonAddOrder").onclick = function () {
    var selectedDay;

    var radios = document.getElementsByName("options");
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        var dayIndex = (day + i) % 7;
        selectedDay = new Date(date);
        selectedDay.setDate(date.getDate() + i);

        var formattedDate = `${selectedDay.getFullYear()}-${(
          selectedDay.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${selectedDay
          .getDate()
          .toString()
          .padStart(2, "0")}`;

        console.log("Data Completa: " + formattedDate);

        if (cartData) {
          const order = {
            userId: userId,
            orderItems: cartData.items.map((item) => ({
              productName: item.name,
              price: item.price,
              quantity: item.quantity,
              date: formattedDate,
            })),
            totalPrice: cartData.total.toFixed(2),
          };

          fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Resposta da API:", data);
            })
            .catch((error) => {
              console.error("Erro na requisição:", error);
            });

          clearCart();
          updateTotal();
        }

      }
    }
  };

  const clearCartBtn = document.getElementById("clearCartBtn");

  clearCartBtn.addEventListener("click", () => {
    const cartTable = document.getElementById("cartTable");
    const cartTableBody = cartTable.querySelector("tbody");

    cartTableBody.classList.add("fade-out");

    setTimeout(() => {
      cartTableBody.innerHTML = "";

      const cartTotalElement = document.getElementById("cartTotal");
      cartTotalElement.textContent = "Total: R$ 0.00";

      cartTableBody.classList.remove("fade-out");

      localStorage.removeItem("cartData");
    }, 300);
  });
});

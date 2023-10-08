import { generateProductHTML} from "./functions/productUtil.js";
import { addProductToSection } from "./functions/addProductToSection.js";
import { products } from "./productsData.js/products.js";
import { clearCart } from "./functions/clearCart.js";
import { updateTotal } from "./functions/cartTotal.js";

for (const product of products) {
  addProductToSection(product.name, product.imageSrc, product.price, product.id, "productSection");
}

const clearCartIcon = document.getElementById("clearCartIcon");
clearCartIcon.addEventListener("click", () => {
  clearCart(); 
  updateTotal();
});

const newOrderBtn = document.getElementById("newOrderBtn");

newOrderBtn.addEventListener("click", (event) => {
    const cartTable = document.getElementById("cartTable");
    const cartItems = cartTable.querySelectorAll("tbody tr");

    if (cartItems.length === 0) {
        alert("Seu carrinho está vazio. Adicione produtos antes de agendar um pedido.");
        event.preventDefault();
    }
});

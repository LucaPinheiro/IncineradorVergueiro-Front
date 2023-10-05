import { generateProductHTML} from "./functions/productUtil.js";
import { addProductToSection } from "./functions/addProductToSection.js";
import { products } from "./productsData.js/products.js";
import { clearCart } from "./functions/clearCart.js";

for (const product of products) {
  addProductToSection(product.name, product.imageSrc, product.price, product.id, "productSection");
}

const clearCartIcon = document.getElementById("clearCartIcon");
clearCartIcon.addEventListener("click", () => {
  clearCart(); // Chame a função para limpar o carrinho
});
import { generateProductHTML} from "./functions/productUtil.js";
import { addProductToSection } from "./functions/addProductToSection.js";
import { products } from "./productsData.js/products.js";

for (const product of products) {
  addProductToSection(product.name, product.imageSrc, product.price, product.id, "productSection");
}

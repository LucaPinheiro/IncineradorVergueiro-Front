import { addProductToSection } from "./addProductFunction.js";

import { products } from "./products.js";

for (const product of products) {
  addProductToSection(
    product.name,
    product.imageSrc,
    product.price,
    product.id,
    "productSection"
  );
}
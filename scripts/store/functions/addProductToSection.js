import { addToCart } from "./cartUtils.js";
import { generateProductHTML } from "./productUtil.js";

const itemsInCart = {}; //object to track cart items

export function addProductToSection(
  productName,
  productImageSrc,
  productPrice,
  id,
  sectionId
) {
  const section = document.getElementById(sectionId);
  const { column, modal } = generateProductHTML(
    productName,
    productImageSrc,
    productPrice,
    id
  );

  section.appendChild(column);

  document.body.appendChild(modal);

  const addButton = document.getElementById(`adicionar${id}`);
  addButton.addEventListener("click", () => {
    if (!itemsInCart[id]) {
      const trashImageSrc = "../../../assets/store/trash.svg";
      addToCart(productName, productPrice, id, trashImageSrc);
      // adding to track
      itemsInCart[id] = true;
    }
  });
}

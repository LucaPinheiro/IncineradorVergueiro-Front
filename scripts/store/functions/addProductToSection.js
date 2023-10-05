import { updateTotal } from './cartTotal.js'
import { addToCart } from './cartUtils.js'
import { generateProductHTML } from './productUtil.js'

export let itemsInCart = {
  data: []
} //object to track cart items

export function removeItemFromCart(id) {
  if (itemsInCart.data.indexOf(id) != -1) {
    itemsInCart.data.splice(itemsInCart.data.indexOf(id), 1)
  }
}

export function clearItemsInCart() {
  itemsInCart.data = []
  
}

export function addProductToSection(
  productName,
  productImageSrc,
  productPrice,
  id,
  sectionId
) {
  const section = document.getElementById(sectionId)
  const { column, modal } = generateProductHTML(
    productName,
    productImageSrc,
    productPrice,
    id
  )

  section.appendChild(column)

  document.body.appendChild(modal)

  const addButton = document.getElementById(`adicionar${id}`)
  addButton.setAttribute('data-bs-dismiss', 'modal')
  addButton.addEventListener('click', () => {
    if (itemsInCart.data.indexOf(id) == -1) {
      const trashImageSrc = '../../../assets/store/trash.svg'
      addToCart(productName, productPrice, id, trashImageSrc)
      itemsInCart.data.push(id)
    }
  })
}
import { clearItemsInCart } from './addProductToSection.js'
import { updateTotal } from './cartTotal.js'

export function clearCart() {
  const cartTableBody = document.querySelector('#cartTable tbody')
  const cartItems = Array.from(cartTableBody.querySelectorAll('tr'))
  clearItemsInCart()

  cartItems.forEach(item => {
    item.classList.add('fade-out')
  })

  setTimeout(() => {
    cartItems.forEach(item => {
      item.remove()
    })
    updateTotal()
  }, 500)
}
import { showCartProducts, removeCartProduct, increaseCartProductCount, decreaseCartProductCount } from "./funcs/cart.js";

window.removeCartProduct = removeCartProduct
window.increaseCartProductCount = increaseCartProductCount
window.decreaseCartProductCount = decreaseCartProductCount

window.addEventListener('load', () => {
    showCartProducts()
})
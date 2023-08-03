import { showIncredibleProducts, showBestSellingProducts, removeFromWishlist, addToWishlist, addToCart } from "./funcs/index.js";
import { showShoppingCartSidebar } from "./funcs/shared.js";

window.addToWishlist = addToWishlist
window.removeFromWishlist = removeFromWishlist
window.showShoppingCartSidebar = showShoppingCartSidebar
window.addToCart = addToCart

window.addEventListener('load', () => {
    showBestSellingProducts()
    showIncredibleProducts()
})
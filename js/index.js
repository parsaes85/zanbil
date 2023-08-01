import { showIncredibleProducts, showBestSellingProducts, removeFromWishlist, addToWishlist } from "./funcs/index.js";

window.addToWishlist = addToWishlist
window.removeFromWishlist = removeFromWishlist

window.addEventListener('load', () => {
    showBestSellingProducts()
    showIncredibleProducts()
})
import { showProductAllDetails, showWishlistBtn, changeProductMainImg, addToWishlist, removeFromWishlist } from "./funcs/product.js";

window.changeProductMainImg = changeProductMainImg
window.addToWishlist = addToWishlist
window.removeFromWishlist = removeFromWishlist

window.addEventListener('load', () => {
    showProductAllDetails()
    showWishlistBtn()
})
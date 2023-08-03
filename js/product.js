import { showProductAllDetails, showWishlistBtn, changeProductMainImg, addToWishlist, removeFromWishlist, addToCart } from "./funcs/product.js";

const addToCartBtn = document.getElementById('add-to-cart-btn')
const decreaseProductCount = document.getElementById('decrease-product-count')
const increaseProductCount = document.getElementById('increase-product-count')
const productCount = document.getElementById('product-count')

window.changeProductMainImg = changeProductMainImg
window.addToWishlist = addToWishlist
window.removeFromWishlist = removeFromWishlist

window.addEventListener('load', () => {
    showProductAllDetails()
    showWishlistBtn()
})
addToCartBtn.addEventListener('click', e => {
    addToCart()
})
decreaseProductCount.addEventListener('click', e => {
    if(productCount.innerHTML > 1) {
        --productCount.innerHTML
    }
})
increaseProductCount.addEventListener('click', e => {
    ++productCount.innerHTML
})
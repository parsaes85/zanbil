import { showProductAllDetails, showWishlistBtn, changeProductMainImg, addToWishlist, removeFromWishlist, addToCart, addRecommendationToWishlist, removeRecommendationToWishlist, addRecommendationToCart } from "./funcs/product.js";
import { showShoppingCartSidebar } from "./funcs/shared.js";

const addToCartBtn = document.getElementById('add-to-cart-btn')
const decreaseProductCount = document.getElementById('decrease-product-count')
const increaseProductCount = document.getElementById('increase-product-count')
const productCount = document.getElementById('product-count')

window.changeProductMainImg = changeProductMainImg
window.addToWishlist = addToWishlist
window.removeFromWishlist = removeFromWishlist
window.addRecommendationToWishlist = addRecommendationToWishlist
window.removeRecommendationToWishlist = removeRecommendationToWishlist
window.addRecommendationToCart = addRecommendationToCart
window.showShoppingCartSidebar = showShoppingCartSidebar

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
import { showAllWishlistProducts, removeFromWishlist } from "./funcs/wishlist.js";

window.removeFromWishlist = removeFromWishlist

window.addEventListener('load', () => {
    showAllWishlistProducts()
})
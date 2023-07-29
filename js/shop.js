import { showAllProducts, showSearchedProducts, showCategoryProducts } from "./funcs/shop.js";
import { getUrlParam } from "./funcs/utils.js"

const searchedValue = getUrlParam('searchedValue')
const categoryCode = getUrlParam('categoryCode')

window.addEventListener('load', () => {
    if(searchedValue !== null) {
        showSearchedProducts()
    } else if (categoryCode !== null) {
        showCategoryProducts()
    } else {
        showAllProducts()
    }
})
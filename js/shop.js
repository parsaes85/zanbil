import { showAllProducts, showSearchedProducts, showCategoryProducts, showCategoryFilters, filterProductsByCategory, filterProductsByPrice, showFiltersSidebar, closeFiltersSidebar, addToWishlist, removeFromWishlist } from "./funcs/shop.js";
import { getUrlParam } from "./funcs/utils.js"


const priceFilterRangeInputs = document.querySelectorAll('.range-input input')
const priceFilterPriceInputs = document.querySelectorAll('.price-input')
const priceFilterProgress = document.querySelector('.slider .progress')
const filterByPriceBtn = document.getElementById('filter-by-price-btn')
const showFiltersSidebarBtn = document.getElementById('show-filters-sidebar-btn')
const closeFiltersSidebarBtn = document.getElementById('close-filters-sidebar-btn')


window.addToWishlist = addToWishlist
window.removeFromWishlist = removeFromWishlist

const searchedValue = getUrlParam('searchedValue')
const categoryCode = getUrlParam('categoryCode')

let priceGap = 1000000
let currentPage = 1

priceFilterRangeInputs.forEach(input => {
    input.addEventListener('input', e => {
        let minVal = parseInt(priceFilterRangeInputs[0].value)
        let maxVal = parseInt(priceFilterRangeInputs[1].value)

        if(maxVal - minVal < priceGap) {
            if(e.target.classList.contains("range-min")) {
                priceFilterRangeInputs[0].value = maxVal - priceGap
            } else {
                priceFilterRangeInputs[1].value = minVal + priceGap
            }
        } else {
            priceFilterPriceInputs[0].innerHTML = `${minVal.toLocaleString()} تومان`
            priceFilterPriceInputs[1].innerHTML = `${maxVal.toLocaleString()} تومان`
            priceFilterProgress.style.right = (minVal / priceFilterRangeInputs[0].max) * 100 + "%"
            priceFilterProgress.style.left = 100 - (maxVal / priceFilterRangeInputs[1].max) * 100 + "%"
        }

    })
})

window.addEventListener('load', () => {
    showCategoryFilters()

    if(categoryCode !== null && searchedValue !== null) {
        filterProductsByCategory(false, currentPage)
    } else if(searchedValue !== null) {
        showSearchedProducts(false, currentPage)
    } else if (categoryCode !== null) {
        showCategoryProducts(false, currentPage)
    } else {
        showAllProducts(false, currentPage)
    }
})

window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    
    if (scrollTop + clientHeight >= scrollHeight - 1100 && scrollTop + clientHeight <= scrollHeight - 1070 ) {
        currentPage++
        if(categoryCode !== null && searchedValue !== null) {
            filterProductsByCategory(false, currentPage)
        } else if(searchedValue !== null) {
            showSearchedProducts(false, currentPage)
        } else if (categoryCode !== null) {
            showCategoryProducts(false, currentPage)
        } else {
            showAllProducts(false, currentPage)
        }
        console.log("next page", currentPage)
    }
}, {
    passive: true
});

filterByPriceBtn.addEventListener('click', e => {
    filterProductsByPrice(true)
})
showFiltersSidebarBtn.addEventListener('click', e => {
    showFiltersSidebar()
})
closeFiltersSidebarBtn.addEventListener('click', e => {
    closeFiltersSidebar()
})

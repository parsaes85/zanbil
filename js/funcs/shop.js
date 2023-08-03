import { showCartProductsCount, showProductInShoppingCartSidebar, showShoppingCartSidebar } from "./shared.js"
import { getLocalStorage, getUrlParam, showWishlistProductsCount, addToWishlistLocalStorage, removeFromWishlistLocalStorage, addToCartLocalStorage } from "./utils.js"

const productsWrapper = document.getElementById('products-wrapper')

const mainUrl = "https://leverapi.f4rd1n.ir/api/digikala"
let wishlistArray = []
let cartProductsArray = []

const searchedValue = getUrlParam('searchedValue')
const categoryCode = getUrlParam('categoryCode')

const insertProductHtmlBox = (array, emptyContainer) => {
    wishlistArray = getLocalStorage('zanbil-wishlist')
    cartProductsArray = getLocalStorage('zanbil-cart')

    if(emptyContainer) {
        productsWrapper.innerHTML = ''
    }
    
    array.forEach(product => {
        productsWrapper.insertAdjacentHTML('beforeend', `
        <div class="border max-w-xs p-4 select-none relative group">
            ${
                product.price.discount_percent ? `
                <span class="bg-darkRed text-white px-4 py-1 text-xs absolute right-1 top-3 rounded-full">-${product.price.discount_percent}%</span>
                ` : ""
            }

            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="">
            </a>

            <div class="text-center text-sm sm:text-base">
                <a href="product.html?id=${product.id}" class="text-gray-800">${product.title_fa}</a>

                <div class="mt-4">
                    ${
                        product.price.discount_percent ? `
                        <p class="text-gray-400 line-through font-medium text-[10px] md:text-xs">${Number(product.price.prev_price.toString().slice(0, -1)).toLocaleString()} هزارتومان</p>
                        ` : ""
                    }
                    <p class="text-darkRed font-semibold">${Number(product.price.current_price.toString().slice(0, -1)).toLocaleString()} تومان</p>
                </div>
            </div>

            <div class="absolute left-2 md:-left-0 top-4 bg-white rounded-lg flex flex-col gap-4 shadow px-3 py-2 transition-all duration-200 md:invisible md:opacity-0 group-hover:opacity-100 group-hover:visible group-hover:left-2">
                <div class="relative product-side-icon">
                    ${
                        wishlistArray.some(wishlist => wishlist.id === product.id ) ? `
                        <i onclick='removeFromWishlist(${JSON.stringify(product)})' class="fa fa-heart text-red-600 md:text-xl cursor-pointer hover:text-red-700"></i>
                        <p class="absolute -top-2 -right-32 bg-black text-white text-xs p-2 rounded-sm invisible opacity-0 transition-all">حذف از علاقه مندی</p>
                        ` : `
                        <i onclick='addToWishlist(${JSON.stringify(product)})' class="fa-regular fa-heart md:text-xl cursor-pointer text-gray-800 hover:text-gray-500"></i>
                        <p class="absolute -top-2 -right-32 bg-black text-white text-xs p-2 rounded-sm invisible opacity-0 transition-all">افزودن به علاقه مندی</p>
                        `
                    }
                </div>
                <div class="relative product-side-icon">
                    ${
                        cartProductsArray.some(cartProduct => cartProduct.id === product.id) ? `
                        <i onclick='showShoppingCartSidebar()' class="fa-solid fa-check text-sm md:text-lg cursor-pointer text-gray-800 hover:text-gray-500"></i>

                        <p class="absolute -top-2 -right-36 bg-black text-white text-xs p-2 rounded-sm invisible opacity-0 transition-all">به سبد خرید افزوده شده</p>
                        ` : `
                        <i onclick='addToCart(${JSON.stringify(product)}, this)' class="fa-solid fa-cart-shopping text-sm md:text-lg cursor-pointer text-gray-800 hover:text-gray-500"></i>

                        <p class="absolute -top-2 -right-32 bg-black text-white text-xs p-2 rounded-sm invisible opacity-0 transition-all">افزودن به سبد خرید</p>
                        `
                    }
                </div>
            </div>
        </div>
        `)
    })
}

const showAllProducts = async (emptyContainer, page = 1) => {
    const res = await fetch(`${mainUrl}/search?q=&page=${page}`)
    const data = await res.json()

    const products = data.results.products

    insertProductHtmlBox(products, emptyContainer)
}

const showSearchedProducts = async (emptyContainer, page = 1) => {
    const res = await fetch(`${mainUrl}/search?q=${searchedValue}&page=${page}`)
    const data = await res.json()

    const products = data.results.products

    insertProductHtmlBox(products, emptyContainer)
}

const showCategoryProducts = async (emptyContainer, page = 1) => {
    const res = await fetch(`${mainUrl}/categories/${categoryCode}/search?q=&page=${page}`)
    const data = await res.json()

    const products = data.results.products

    insertProductHtmlBox(products, emptyContainer)
}

const showCategoryFilters = async () => {
    const categoriesFilterWrapper = document.getElementById('categories-filter-wrapper')

    const res = await fetch(`${mainUrl}`)
    const data = await res.json()

    const categories = data.results.categories

    categories.forEach(category => {
        categoriesFilterWrapper.insertAdjacentHTML('beforeend', `
            <a href="shop.html?${searchedValue? `searchedValue=${searchedValue}&` : ''}categoryCode=${category.code}" class="text-sm my-4 text-gray-500 block hover:text-gray-800 transition-all">${category.title_fa}</a>
        `)
    })
}

const filterProductsByCategory = async (emptyContainer, page = 1) => {
    if(searchedValue) {
        const res = await fetch(`${mainUrl}/categories/${categoryCode}/search?q=${searchedValue}&page=${page}`)
        const data = await res.json()
    
        const products = data.results.products
        insertProductHtmlBox(products, emptyContainer)
    } else {
        const res = await fetch(`${mainUrl}/categories/${categoryCode}/search?q=&page=${page}`)
        const data = await res.json()
    
        const products = data.results.products
        insertProductHtmlBox(products, emptyContainer)
    }

    closeFiltersSidebar()
}

const filterProductsByPrice = async () => {
    const priceFilterRangeMin = document.querySelector('.range-min')
    const priceFilterRangeMax = document.querySelector('.range-max')

    const searchedValue = getUrlParam('searchedValue')
    let minPrice = priceFilterRangeMin.value * 10
    let maxPrice = priceFilterRangeMax.value * 10

    if(searchedValue) {
        const res = await fetch(`${mainUrl}/search?price[max]=${maxPrice}&price[min]=${minPrice}&q=${searchedValue}&page=1`)
        const data = await res.json()

        const products = data.results.products

        insertProductHtmlBox(products, true)
    } else {
        const res = await fetch(`${mainUrl}/search?price[max]=${maxPrice}&price[min]=${minPrice}&q=&page=1`)
        const data = await res.json()

        const products = data.results.products

        insertProductHtmlBox(products, true)
    }

    closeFiltersSidebar()
}

const showFiltersSidebar = () => {
    const productsFiltersSidebar = document.getElementById('products-filters-section')

    productsFiltersSidebar.classList.remove('-right-96')
    productsFiltersSidebar.classList.add('right-0')
}
const closeFiltersSidebar = () => {
    const productsFiltersSidebar = document.getElementById('products-filters-section')

    productsFiltersSidebar.classList.add('-right-96')
    productsFiltersSidebar.classList.remove('right-0')
}

const addToWishlist = (productInfo) => {
    addToWishlistLocalStorage(productInfo.id, productInfo)

    if(categoryCode !== null && searchedValue !== null) {
        filterProductsByCategory(true)
    } else if(searchedValue !== null) {
        showSearchedProducts(true)
    } else if (categoryCode !== null) {
        showCategoryProducts(true)
    } else {
        showAllProducts(true)
    }

    showWishlistProductsCount()
}

const removeFromWishlist = (productInfo) => {
    removeFromWishlistLocalStorage(productInfo.id)

    if(categoryCode !== null && searchedValue !== null) {
        filterProductsByCategory(true)
    } else if(searchedValue !== null) {
        showSearchedProducts(true)
    } else if (categoryCode !== null) {
        showCategoryProducts(true)
    } else {
        showAllProducts(true)
    }

    showWishlistProductsCount()
}

const addToCart = (productInfo) => {
    addToCartLocalStorage(productInfo.id, productInfo, 1)
    showProductInShoppingCartSidebar()
    showShoppingCartSidebar()
    showCartProductsCount()
    
    if(categoryCode !== null && searchedValue !== null) {
        filterProductsByCategory(true)
    } else if(searchedValue !== null) {
        showSearchedProducts(true)
    } else if (categoryCode !== null) {
        showCategoryProducts(true)
    } else {
        showAllProducts(true)
    }
}

export {
    showAllProducts, showSearchedProducts, showCategoryProducts, showCategoryFilters, filterProductsByCategory, filterProductsByPrice, showFiltersSidebar, closeFiltersSidebar, addToWishlist, removeFromWishlist, addToCart
}
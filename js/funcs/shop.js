import { getLocalStorage, getUrlParam, setToLocalStorage, showWishlistProductsCount, addToWishlistLocalStorage, removeFromWishlistLocalStorage } from "./utils.js"

const productsWrapper = document.getElementById('products-wrapper')

const mainUrl = "https://leverapi.f4rd1n.ir/api/digikala"
let wishlistArray = []

const searchedValue = getUrlParam('searchedValue')
const categoryCode = getUrlParam('categoryCode')

const insertProductHtmlBox = (array) => {
    wishlistArray = getLocalStorage('zanbil-wishlist')
    productsWrapper.innerHTML = ''
    
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
                    <i class="fa-solid fa-cart-shopping text-sm md:text-lg cursor-pointer text-gray-800 hover:text-gray-500"></i>

                    <p class="absolute -top-2 -right-32 bg-black text-white text-xs p-2 rounded-sm invisible opacity-0 transition-all">افزودن به سبد خرید</p>
                </div>
            </div>
        </div>
        `)
    })
}

const showAllProducts = async () => {
    const res = await fetch(`${mainUrl}/search?q=&page=1`)
    const data = await res.json()

    const products = data.results.products

    insertProductHtmlBox(products)
}

const showSearchedProducts = async () => {
    const res = await fetch(`${mainUrl}/search?q=${searchedValue}&page=1`)
    const data = await res.json()

    const products = data.results.products

    insertProductHtmlBox(products)
}

const showCategoryProducts = async () => {
    const res = await fetch(`${mainUrl}/categories/${categoryCode}/search?q=&page=1`)
    const data = await res.json()

    const products = data.results.products

    insertProductHtmlBox(products)
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

const filterProductsByCategory = async () => {
    if(searchedValue) {
        console.log(categoryCode, 'searched')
        const res = await fetch(`${mainUrl}/categories/${categoryCode}/search?q=${searchedValue}&page=1`)
        const data = await res.json()
    
        const products = data.results.products
        console.log(products)
        insertProductHtmlBox(products)
    } else {
        console.log(categoryCode, 'not searched')
        const res = await fetch(`${mainUrl}/categories/${categoryCode}/search?q=&page=1`)
        const data = await res.json()
    
        const products = data.results.products
        console.log(products)
        insertProductHtmlBox(products)
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

        console.log(products)
        insertProductHtmlBox(products)
    } else {
        const res = await fetch(`${mainUrl}/search?price[max]=${maxPrice}&price[min]=${minPrice}&q=&page=1`)
        const data = await res.json()

        const products = data.results.products

        console.log(products)
        insertProductHtmlBox(products)
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
        filterProductsByCategory()
    } else if(searchedValue !== null) {
        showSearchedProducts()
    } else if (categoryCode !== null) {
        showCategoryProducts()
    } else {
        showAllProducts()
    }

    showWishlistProductsCount()
}

const removeFromWishlist = (productInfo) => {
    removeFromWishlistLocalStorage(productInfo.id)

    if(categoryCode !== null && searchedValue !== null) {
        filterProductsByCategory()
    } else if(searchedValue !== null) {
        showSearchedProducts()
    } else if (categoryCode !== null) {
        showCategoryProducts()
    } else {
        showAllProducts()
    }

    showWishlistProductsCount()
}

export {
    showAllProducts, showSearchedProducts, showCategoryProducts, showCategoryFilters, filterProductsByCategory, filterProductsByPrice, showFiltersSidebar, closeFiltersSidebar, addToWishlist, removeFromWishlist
}
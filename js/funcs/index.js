import { getLocalStorage, getUrlParam, setToLocalStorage, showWishlistProductsCount } from "./utils.js"

const mainUrl = "https://leverapi.f4rd1n.ir/api/digikala"

let wishlistArray = []

const insertProductHtmlBox = (array, parentElem) => {
    wishlistArray = getLocalStorage('zanbil-wishlist')
    parentElem.innerHTML = ''
    
    array.forEach(product => {
        parentElem.insertAdjacentHTML('beforeend', `
        <div class="swiper-slide select-none bg-white rounded-xl relative group">
        ${
            product.price.discount_percent ? `
            <span class="bg-darkRed text-white px-4 py-1 text-xs absolute right-1 top-3 rounded-full">-${product.price.discount_percent}%</span>
            ` : ""
        }
        <a href="product.html?id=${product.id}">
            <img class="p-2" src="${product.image}" alt="">
        </a>
        <div class="p-4">
            <a href="product.html?id=${product.id}" class="text-xs sm:text-sm md:text-base">${product.title_fa}</a>
            <div class="flex mt-3 mb-2">
                <i class="fa-solid fa-star text-yellow-400 text-xs"></i>
                <i class="fa-solid fa-star text-yellow-400 text-xs"></i>
                <i class="fa-solid fa-star text-yellow-400 text-xs"></i>
                <i class="fa-solid fa-star text-yellow-400 text-xs"></i>
                <i class="fa-solid fa-star text-yellow-400 text-xs"></i>
            </div>
            ${
                product.price.discount_percent ? `
                <p class="text-gray-400 line-through font-medium text-[10px] md:text-xs">${Number(product.price.prev_price.toString().slice(0, -1)).toLocaleString()} هزارتومان</p>
                ` : ""
            }
            <p class="text-darkRed font-medium sm:font-semibold text-xs md:text-sm">${Number(product.price.current_price.toString().slice(0, -1)).toLocaleString()} هزارتومان</p>
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

const showIncredibleProducts = async () => {
    const incredibleProductsWrapper = document.getElementById('incredible-products-wrapper')

    const res = await fetch(mainUrl)
    const data = await res.json()

    const products = data.results.incredible.products

    insertProductHtmlBox(products, incredibleProductsWrapper)
}

const showBestSellingProducts = async () => {
    const bestsellingProductsWrapper = document.getElementById('bestselling-products-wrapper')

    const res = await fetch(mainUrl)
    const data = await res.json()

    const products = data.results.bestSelling.products

    insertProductHtmlBox(products, bestsellingProductsWrapper)
}

const addToWishlist = (productInfo) => {
    wishlistArray = getLocalStorage('zanbil-wishlist')

    let isInWishlist = wishlistArray.some(wishlist => wishlist.id === productInfo.id )

    if(!isInWishlist) {
        wishlistArray.push(productInfo)
    }

    setToLocalStorage('zanbil-wishlist', wishlistArray)

    showIncredibleProducts()
    showBestSellingProducts()
    showWishlistProductsCount()
}

const removeFromWishlist = (productInfo) => {
    wishlistArray = getLocalStorage('zanbil-wishlist')

    let mainWishlistIndex = wishlistArray.findIndex(wishlist => wishlist.id == productInfo.id)

    wishlistArray.splice(mainWishlistIndex, 1)

    setToLocalStorage('zanbil-wishlist', wishlistArray)
    
    showIncredibleProducts()
    showBestSellingProducts()
    showWishlistProductsCount()
}

export {
    showIncredibleProducts, showBestSellingProducts, removeFromWishlist, addToWishlist
}
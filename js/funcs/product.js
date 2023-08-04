import { showProductInShoppingCartSidebar, showShoppingCartSidebar } from "./shared.js"
import { getLocalStorage, getUrlParam, showWishlistProductsCount, addToWishlistLocalStorage, removeFromWishlistLocalStorage, addToCartLocalStorage } from "./utils.js"

const productCategrotyPath = document.getElementById('product-categroty-path')
const productOtherImgsWrapper = document.getElementById('product-other-imgs-wrapper')
const productMainImg = document.getElementById('product-main-img')
const productTitle = document.getElementById('product-title')
const productCommentsCount = document.getElementById('product-comments-count')
const productCategoryTitle = document.getElementById('product-category-title')
const productCode = document.getElementById('product-code')
const productDiscountPercent = document.getElementById('product-discount-percent')
const productPrevPrice = document.getElementById('product-prev-price')
const productCurrentPrice = document.getElementById('product-current-price')
const productWatchingCount = document.getElementById('product-watching-count')
const productDescription = document.getElementById('product-description')
const productCommentsTitle = document.getElementById('product-comments-title')
const productCommentsWrapper = document.getElementById('product-comments-wrapper')
const productRecommendationsWrapper = document.getElementById('product-recommendations-wrapper')
const addToWishlistBtn = document.getElementById('add-to-wishlist-btn')

const mainUrl = "https://leverapi.f4rd1n.ir/api/digikala"
const productId = getUrlParam('id')

let wishlistArray = []
let globalProductInfo = null

const changeProductMainImg = (otherProductImages, clickedImg ,imgSrc) => {
    productMainImg.src = imgSrc
    
    Array.from(otherProductImages).forEach(image => {
        image.classList.remove('border-4')
    })

    clickedImg.classList.add('border-4', 'border-darkRed')
}

const showProductAllDetails = async () => {
    const res = await fetch(`${mainUrl}/product/${productId}`)
    const data = await res.json()

    const productCategoryDetails = data.results.eventData
    const productDetails = data.results.product
    const productRecommendations = data.results.recommendations

    globalProductInfo = {
        id: productDetails.id,
        image: productDetails.images[0],
        price: productDetails.price,
        status: productDetails.status,
        title_fa: productDetails.mainDetails.title
    }

    document.title = `زنبیل | ${data.results.seo.title}`

    // show product details
    productCategrotyPath.innerHTML = `خانه / ${productCategoryDetails.categoryLevel1} / <span class="text-black">${productCategoryDetails.leafCategory}</span>`
    productMainImg.src = productDetails.images[0]

    productDetails.images.slice(0, 3).forEach((imgSrc, index) => {
        productOtherImgsWrapper.insertAdjacentHTML('beforeend', `
            <img onclick='changeProductMainImg(this.parentElement.children, this, ${JSON.stringify(imgSrc)})' class="${index === 0 ? "border-4 border-darkRed" : ""} w-[33%] cursor-pointer md:w-28" src="${imgSrc}" alt="">
        `)
    })

    productTitle.innerHTML = productDetails.mainDetails.title
    productCommentsCount.innerHTML = productDetails.last_comments.length
    productCategoryTitle.innerHTML = productCategoryDetails.categoryLevel1
    productCode.innerHTML = productDetails.category.code
    productDiscountPercent.innerHTML = productDetails.price.discount_percent ? `-${productDetails.price.discount_percent}%` : productDiscountPercent.classList.add('hidden')
    productPrevPrice.innerHTML = productDetails.price.discount_percent ? `${Number(productDetails.price.prev_price.toString().slice(0, -1)).toLocaleString()} تومان` : ""
    productCurrentPrice.innerHTML = `${Number(productDetails.price.current_price.toString().slice(0, -1)).toLocaleString()} تومان`
    productWatchingCount.innerHTML = productDetails.images.length
    productDescription.innerHTML = productDetails.introduce
    productCommentsTitle.innerHTML = `${productDetails.last_comments.length} دیدگاه برای ${productDetails.mainDetails.title}`

    // show product comments
    productDetails.last_comments.forEach(comment => {
        productCommentsWrapper.insertAdjacentHTML('beforeend', `
        <div class="mt-8 text-sm md:text-base">
            <div class="flex justify-between">
                <div>
                    <span class="font-semibold">${comment.user_name}</span>
                    <span class="text-gray-500 mr-1">${comment.created_at}</span>
                </div>

                <div class="flex text-sm">
                    ${
                        Array(comment.rate)
                        .fill(0)
                        .map(score => `
                        <i class="fa fa-star text-yellow-500"></i>
                        `)
                        .join('')
                    }

                    ${
                        Array(5 - comment.rate)
                        .fill(0)
                        .map(score => `
                        <i class="fa fa-star text-gray-200"></i>
                        `)
                        .join('')
                    }
                </div>                              
            </div>

            <p class="text-gray-500 mt-4">
                ${comment.body}
            </p>
        </div>
        `)
    })

    // show product productRecommendations
    productRecommendations.forEach(recommendation => {
        productRecommendationsWrapper.insertAdjacentHTML('beforeend', `
        <div class="swiper-slide select-none bg-white rounded-xl relative group">
            ${
                recommendation.price.discount_percent ? `
                <span class="bg-darkRed text-white px-4 py-1 text-xs absolute right-1 top-3 rounded-full">-${recommendation.price.discount_percent}%</span>
                ` : ""
            }
            <div>
                <a href="product.html?id=${recommendation.id}">
                    <img class="p-2" src="${recommendation.image}" alt="">
                </a>
            </div>
            <div class="p-4">
                <a href="product.html?id=${recommendation.id}" class="text-xs sm:text-sm md:text-base">
                    ${recommendation.title_fa}
                </a>
                <div class="flex mt-3 mb-2">
                    <i class="fa-solid fa-star text-yellow-400 text-xs"></i>
                    <i class="fa-solid fa-star text-yellow-400 text-xs"></i>
                    <i class="fa-solid fa-star text-yellow-400 text-xs"></i>
                    <i class="fa-solid fa-star text-yellow-400 text-xs"></i>
                    <i class="fa-solid fa-star text-yellow-400 text-xs"></i>
                </div>
                ${
                    recommendation.price.discount_percent ? `
                    <p class="text-gray-400 line-through font-medium text-[10px] md:text-xs">${Number(recommendation.price.prev_price.toString().slice(0, -1)).toLocaleString()} هزارتومان</p>
                    ` : ""
                }
                <p class="text-darkRed font-medium sm:font-semibold text-xs md:text-sm">${Number(recommendation.price.current_price.toString().slice(0, -1)).toLocaleString()} هزارتومان</p>
            </div>
            <div class="absolute -left-0 top-4 bg-white flex flex-col gap-4 shadow px-3 py-2 transition-all duration-200 invisible opacity-0 group-hover:opacity-100 group-hover:visible group-hover:left-2">
                <div class="relative product-side-icon">
                    <i class="fa-regular fa-heart text-xl cursor-pointer text-gray-800 hover:text-gray-500"></i>

                    <p class="absolute -top-2 -right-32 bg-black text-white text-xs p-2 rounded-sm invisible opacity-0 transition-all">افزودن به علاقه مندی</p>
                </div>
                <div class="relative product-side-icon">
                    <i class="fa-solid fa-cart-shopping text-lg cursor-pointer text-gray-800 hover:text-gray-500"></i>

                    <p class="absolute -top-2 -right-32 bg-black text-white text-xs p-2 rounded-sm invisible opacity-0 transition-all">افزودن به سبد خرید</p>
                </div>
            </div>
        </div>
        `)
    })
}

const showWishlistBtn = () => {
    wishlistArray = getLocalStorage('zanbil-wishlist')

    addToWishlistBtn.innerHTML = `
    ${
        wishlistArray.some(wishlist => wishlist.id === Number(productId) ) ? `        
        <div onclick='removeFromWishlist()' class="flex gap-2 items-center">
            <i class="fa fa-heart text-red-600"></i>
            <p>حذف از علاقه‌مندی</p>
        </div>` : `
        <div onclick='addToWishlist()' class="flex gap-2 items-center">
            <i class="fa-regular fa-heart"></i>
            <p>افزودن به علاقه‌مندی</p>
        </div>`
    }
    `
}

const addToWishlist = () => {
    addToWishlistLocalStorage(Number(productId), globalProductInfo)
    showWishlistBtn()
    showWishlistProductsCount()
}

const removeFromWishlist = () => {
    removeFromWishlistLocalStorage(Number(productId))
    showWishlistBtn()
    showWishlistProductsCount()
}

const addToCart = () => {
    const productCount = document.getElementById('product-count')

    addToCartLocalStorage(Number(productId), globalProductInfo, Number(productCount.innerHTML))

    productCount.innerHTML = 1
    showProductInShoppingCartSidebar()
    showShoppingCartSidebar()
}

export {
    showProductAllDetails, showWishlistBtn, changeProductMainImg, addToWishlist, removeFromWishlist, addToCart
}
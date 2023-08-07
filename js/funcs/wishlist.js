import { getLocalStorage, setToLocalStorage, showWishlistProductsCount, removeFromWishlistLocalStorage } from "./utils.js"

let wishlistArray = []

const showAllWishlistProducts = () => {
    const wishlistProductsWrapper = document.getElementById('products-wrapper')
    const wishlistContainer = document.getElementById('wishlist-container')
    const emptyWishlistContainer = document.getElementById('empty-wishlist-container')

    wishlistProductsWrapper.innerHTML = ''

    wishlistArray = getLocalStorage('zanbil-wishlist')
    
    if(wishlistArray.length) {
        wishlistArray.forEach(product => {
            wishlistProductsWrapper.insertAdjacentHTML('beforeend', `
            <div class="border max-w-xs">
                <div onclick='removeFromWishlist(${JSON.stringify(product)})' class="flex justify-center items-center gap-1 py-2 transition duration-200 cursor-pointer hover:bg-darkRed hover:text-gray-100">
                    <i class="fa fa-xmark"></i>
                    حذف
                </div>
                <div class="px-5 pb-6">
                    <div class="relative">
                        <a href="product.html?id=${product.id}">
                            <img src="${product.image}" alt="">
                        </a>
                        ${
                            product.price.discount_percent ? `
                            <span class="bg-darkRed text-white px-4 py-1 text-xs absolute right-1 top-3 rounded-full">-${product.price.discount_percent}%</span>
                            ` : ""
                        }
                    </div>
                    <div class="text-center">
                        <a href="product.html?id=${product.id}" class="text-sm font-semibold text-gray-800 transition hover:text-gray-500">
                            ${product.title_fa}
                        </a>
                        <div class="flex flex-col sm:flex-row justify-center gap-2 mt-5">
                        ${
                            product.price.discount_percent ? `
                            <p class="text-gray-400 line-through font-medium text-[10px] md:text-xs">${(product.price.prev_price / 10).toLocaleString()} هزارتومان</p>
                            ` : ""
                        }
                        <p class="text-darkRed font-semibold">${(product.price.current_price / 10).toLocaleString()} تومان</p>
                        </div>
                    </div>                        
                </div>
            </div>
            `)
        })
    } else {
        wishlistContainer.classList.add("hidden")
        emptyWishlistContainer.classList.replace('hidden', "flex")
    }

}

const removeFromWishlist = (productInfo) => {
    removeFromWishlistLocalStorage(productInfo.id)    
    showAllWishlistProducts()
    showWishlistProductsCount()
}

export {
    showAllWishlistProducts, removeFromWishlist
}
import { showProductInShoppingCartSidebar, sumCartTotalPrice } from "./shared.js"
import { getLocalStorage, removeFromCartLocalStorage, setToLocalStorage } from "./utils.js"

let cartProductsArray = []

const showCartProducts = () => {
    const desktopCartProductsWrapper = document.getElementById('desktop-cart-products-wrapper')
    const mobileCartProductsWrapper = document.getElementById('mobile-cart-products-wrapper')
    const cartContainer = document.getElementById('cart-container')
    const emptyCartContainer = document.getElementById('empty-cart-container')
    
    desktopCartProductsWrapper.innerHTML = ''
    mobileCartProductsWrapper.innerHTML = ''

    cartProductsArray = getLocalStorage("zanbil-cart")

    if(cartProductsArray.length) {
        cartProductsArray.forEach(product => {
            desktopCartProductsWrapper.insertAdjacentHTML('beforeend', `
            <tr class="border-b">
                <td class="py-4 text-base flex items-center justify-center gap-4">
                    <i onclick='removeCartProduct(${product.id})' class="fa fa-xmark text-gray-800 cursor-pointer"></i>
                    <a href="product.html?id=${product.id}">
                        <img src="${product.image}" class="w-20" alt="">
                    </a>
                    <a href="product.html?id=${product.id}">
                        ${product.title_fa}
                    </a>
                </td>
                <td class="py-4 text-gray-500 text-sm">
                    ${(product.price.current_price / 10).toLocaleString()} تومان
                </td>
                <td class="py-4">
                    <div class="flex items-center border-2 rounded-md w-fit text-sm text-gray-500">
                        <span onclick='decreaseCartProductCount(${product.id})' class="px-1.5 py-1 border-l-2 transition duration-200 rounded-r-md cursor-pointer hover:bg-darkRed hover:text-white">-</span>
                        <p class="px-2 py-1">${product.count}</p>
                        <span onclick='increaseCartProductCount(${product.id})' class="px-1.5 py-1 border-r-2 transition duration-200 rounded-l-md cursor-pointer hover:bg-darkRed hover:text-white">+</span>
                    </div>
                </td>
                <td class="py-4 text-darkRed font-semibold text-end">
                    ${(product.price.current_price * product.count / 10).toLocaleString()} تومان
                </td>
            </tr>
            `)
    
            mobileCartProductsWrapper.insertAdjacentHTML('beforeend', `
            <div class="flex items-center gap-4 border-b py-6">
                <a href="product.html?id=${product.id}">    
                    <img class="w-24" src="${product.image}" alt="">
                </a>
                <div class="w-full">
                    <div class="flex text-sm justify-between">
                        <a href="product.html?id=${product.id}" class="text-gray-900">${product.title_fa}</a>
                        <i onclick='removeCartProduct(${product.id})' class="fa-solid fa-xmark pr-2"></i>
                    </div>
                    <div class="flex text-sm justify-between border-b border-dashed py-2">
                        <p class="text-xs font-semibold">قیمت</p>
                        <p class="text-gray-500">${(product.price.current_price / 10).toLocaleString()} تومان</p>
                    </div>
                    <div class="flex text-sm justify-between items-center border-b border-dashed py-2">
                        <p class="text-xs font-semibold">تعداد</p>
                        <div class="flex items-center border-2 rounded-md w-fit text-sm text-gray-500">
                            <span onclick='decreaseCartProductCount(${product.id})' class="px-1.5 py-1 border-l-2 transition duration-200 rounded-r-md cursor-pointer hover:bg-darkRed hover:text-white">-</span>
                            <p class="px-2 py-1">${product.count}</p>
                            <span onclick='increaseCartProductCount(${product.id})' class="px-1.5 py-1 border-r-2 transition duration-200 rounded-l-md cursor-pointer hover:bg-darkRed hover:text-white">+</span>
                        </div>
                    </div>
                    <div class="flex text-sm font-semibold justify-between py-2">
                        <p class="text-xs">جمع جزء</p>
                        <p class="text-darkRed">${(product.price.current_price * product.count / 10).toLocaleString()} تومان</p>
                    </div>
                </div>
            </div>
            `)
        })
    } else {
        cartContainer.classList.add('hidden')
        emptyCartContainer.classList.replace('hidden', 'flex')
    }

    showProductInShoppingCartSidebar()
    showCartTotalPrice()
}

const removeCartProduct = (productId) => {
    removeFromCartLocalStorage(productId)
    showCartProducts()
}

const increaseCartProductCount = (productId) => {
    cartProductsArray = getLocalStorage('zanbil-cart')

    let mainCartProductIndex = cartProductsArray.findIndex(product => product.id == productId)

    ++cartProductsArray[mainCartProductIndex].count

    setToLocalStorage('zanbil-cart', cartProductsArray)
    showCartProducts()
}
const decreaseCartProductCount = (productId) => {
    cartProductsArray = getLocalStorage('zanbil-cart')

    let mainCartProductIndex = cartProductsArray.findIndex(product => product.id == productId)

    if(cartProductsArray[mainCartProductIndex].count > 1) {
        --cartProductsArray[mainCartProductIndex].count
    }

    setToLocalStorage('zanbil-cart', cartProductsArray)
    showCartProducts()
}

const showCartTotalPrice = () => {
    const totalPriceToPay = document.getElementById('total-price-to-pay')
    
    sumCartTotalPrice()

    totalPriceToPay.innerHTML = `${(sumCartTotalPrice() + 29000).toLocaleString()} تومان`
}

export { showCartProducts, removeCartProduct, increaseCartProductCount, decreaseCartProductCount }
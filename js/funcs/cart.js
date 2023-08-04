import { sumCartTotalPrice } from "./shared.js"
import { getLocalStorage } from "./utils.js"

let cartProductsArray = []

const showCartProducts = () => {
    const desktopCartProductsWrapper = document.getElementById('desktop-cart-products-wrapper')
    const mobileCartProductsWrapper = document.getElementById('mobile-cart-products-wrapper')

    cartProductsArray = getLocalStorage("zanbil-cart")

    cartProductsArray.forEach(product => {
        desktopCartProductsWrapper.insertAdjacentHTML('beforeend', `
        <tr class="border-b">
            <td class="py-4 text-base flex items-center justify-center gap-4">
                <i class="fa fa-xmark text-gray-800 cursor-pointer"></i>
                <a href="#">
                    <img src="${product.image}" class="w-20" alt="">
                </a>
                <a href="#">
                    ${product.title_fa}
                </a>
            </td>
            <td class="py-4 text-gray-500 text-sm">
                ${(product.price.current_price / 10).toLocaleString()} تومان
            </td>
            <td class="py-4">
                <div class="flex items-center border-2 rounded-md w-fit text-sm text-gray-500">
                    <span class="px-1.5 py-1 border-l-2 transition duration-200 rounded-r-md cursor-pointer hover:bg-darkRed hover:text-white">-</span>
                    <p class="px-2 py-1">${product.count}</p>
                    <span class="px-1.5 py-1 border-r-2 transition duration-200 rounded-l-md cursor-pointer hover:bg-darkRed hover:text-white">+</span>
                </div>
            </td>
            <td class="py-4 text-darkRed font-semibold text-end">
                ${(product.price.current_price * product.count / 10).toLocaleString()} تومان
            </td>
        </tr>
        `)

        mobileCartProductsWrapper.insertAdjacentHTML('beforeend', `
        <div class="flex items-center gap-4 border-b py-6">
            <img class="w-24" src="${product.image}" alt="">

            <div class="w-full">
                <div class="flex text-sm justify-between">
                    <p class="text-gray-900">${product.title_fa}</p>
                    <i class="fa-solid fa-xmark pr-2"></i>
                </div>
                <div class="flex text-sm justify-between border-b border-dashed py-2">
                    <p class="text-xs font-semibold">قیمت</p>
                    <p class="text-gray-500">${(product.price.current_price / 10).toLocaleString()} تومان</p>
                </div>
                <div class="flex text-sm justify-between items-center border-b border-dashed py-2">
                    <p class="text-xs font-semibold">تعداد</p>
                    <div class="flex items-center border-2 rounded-md w-fit text-sm text-gray-500">
                        <span class="px-1.5 py-1 border-l-2 transition duration-200 rounded-r-md cursor-pointer hover:bg-darkRed hover:text-white">-</span>
                        <p class="px-2 py-1">${product.count}</p>
                        <span class="px-1.5 py-1 border-r-2 transition duration-200 rounded-l-md cursor-pointer hover:bg-darkRed hover:text-white">+</span>
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

    showCartTotalPrice()
}

const showCartTotalPrice = () => {
    const totalPriceToPay = document.getElementById('total-price-to-pay')
    
    sumCartTotalPrice()

    totalPriceToPay.innerHTML = `${(sumCartTotalPrice() + 29000).toLocaleString()} تومان`
}

export { showCartProducts }
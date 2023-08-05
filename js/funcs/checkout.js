import { sumCartTotalPrice } from "./shared.js"
import { getLocalStorage } from "./utils.js"

let cartProductsArray = []

const showCartProducts = () => {
    const cartProductsWrapper = document.getElementById('cart-products-wrapper')

    cartProductsArray = getLocalStorage("zanbil-cart")

    if(!cartProductsArray.length) {
        location.href = "./cart.html"
    }

    cartProductsArray.forEach(product => {
        cartProductsWrapper.insertAdjacentHTML("beforeend", `
        <div class="flex justify-between border-b py-3">
            <div class="text-sm text-gray-400 w-1/2">
                <span> ${product.title_fa} </span>
                <span class="text-xs "><i class="fa fa-xmark"></i>${product.count}</span>
            </div>
            <p class="text-sm text-gray-400">${(product.price.current_price / 10).toLocaleString()} تومان</p>
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


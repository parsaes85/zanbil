import { getLocalStorage, removeFromCartLocalStorage, setToLocalStorage } from "./utils.js"

const mainUrl = "https://leverapi.f4rd1n.ir/api/digikala"

let wishlistArray = []
let cartProductsArray = []
let lastScrollTop = 0;

const showSidebar = () => {
    const sidebarElem = document.getElementById('sidebar-parent')

    sidebarElem.classList.remove('-right-[1800px]')
    sidebarElem.classList.add('right-0')
}
const closeSidebar = () => {
    const sidebarElem = document.getElementById('sidebar-parent')

    sidebarElem.classList.add('-right-[1800px]')
    sidebarElem.classList.remove('right-0')
}

const showShoppingCartSidebar = () => {
    cartProductsArray = getLocalStorage('zanbil-cart')

    const shoppingCartSidebarElem = document.getElementById('shopping-cart-sidebar-parent')
    const shoppingCartSidebarFooterElem = document.getElementById('shopping-cart-sidebar-footer')

    if(cartProductsArray.length >= 3) {
        shoppingCartSidebarFooterElem.classList.replace('absolute', 'sticky')
    } else {
        shoppingCartSidebarFooterElem.classList.replace('sticky', 'absolute')
    }
    shoppingCartSidebarElem.classList.remove('-left-[1800px]')
    shoppingCartSidebarElem.classList.add('left-0')
}
const closeShoppingCartSidebar = () => {
    const shoppingCartSidebarElem = document.getElementById('shopping-cart-sidebar-parent')

    shoppingCartSidebarElem.classList.add('-left-[1800px]')
    shoppingCartSidebarElem.classList.remove('left-0')
}

const showSidebarMenus = () => {
    const sidebarMenusWrapper = document.getElementById('sidebar-menus-wrapper')

    sidebarMenusWrapper.innerHTML = `
        <a href="shop.html" class="hover:text-primaryRed transition border-t  px-4 py-3">فروشگاه</a>
        <a href="checkout.html" class="hover:text-primaryRed transition border-t px-4 py-3">پرداخت</a>
        <a href="cart.html" class="hover:text-primaryRed transition border-t px-4 py-3">سبد خرید</a>
        <a href="wishlist.html" class="hover:text-primaryRed transition border-t px-4 py-3 flex items-center gap-2">
            <i class="fa-regular fa-heart"></i>
            علاقه‌مندی
        </a>
        <a href="register.html" class="hover:text-primaryRed transition border-y px-4 py-3 flex items-center gap-2">
            <i class="fa-regular fa-user"></i>
            ورود/ثبت نام
        </a>
    `
}
const showSidebarCategories = async () => {
    const sidebarCategoriesWrapper = document.getElementById('sidebar-menus-wrapper')
    sidebarCategoriesWrapper.innerHTML = ''

    const res = await fetch(`${mainUrl}`)
    const data = await res.json()

    const categories = data.results.categories

    categories.forEach(category => {
        sidebarCategoriesWrapper.insertAdjacentHTML('beforeend', `
            <a href="shop.html?categoryCode=${category.code}" class="hover:text-primaryRed transition border-t  px-4 py-3">${category.title_fa}</a>
        `)
    })
}

const showHeaderWhenScrollingUp = (header) => {
    let st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > lastScrollTop) {
        header.classList.replace("top-0", "-top-[600px]")
    } else if (st < lastScrollTop) {
       header.classList.replace("-top-[600px]", "top-0")
    }
    if(st < 235) {
        header.classList.replace("top-0", "-top-[600px]")
    }
    // console.log(st)
    lastScrollTop = st <= 0 ? 0 : st;
}

const desktopSearchProduct = (form) => {
    location.href = `./shop.html?searchedValue=${form.firstElementChild.value}`
}
const mobileSearchProduct = () => {
    const searchInputElem = document.getElementById('mobile-search-input')

    location.href = `./shop.html?searchedValue=${searchInputElem.value}`
}

const showHeaderCategories = async () => {
    const headerCategoriesWrappers = document.querySelectorAll('.header-categories-wrapper')

    const res = await fetch(`${mainUrl}`)
    const data = await res.json()

    const categories = data.results.categories

    headerCategoriesWrappers.forEach(wrapper => {
        categories.forEach(category => {
            wrapper.insertAdjacentHTML('beforeend', `
            <li class="border-b p-2 font-medium text-gray-900 hover:bg-gray-100">
                <a href="shop.html?categoryCode=${category.code}" class="block w-full">${category.title_fa}</a>
            </li>
            `)
        })
    })
}

const showProductInShoppingCartSidebar = () => {
    sumCartTotalPrice()
    showCartProductsCount()

    const shoppingCartProductContainer = document.getElementById('shopping-cart-product-container')
    const shoppingCartContainer = document.getElementById('shopping-cart-container')
    const emptyShoppingCartContainer = document.getElementById('empty-shopping-cart-container')

    shoppingCartProductContainer.innerHTML = ''

    cartProductsArray = getLocalStorage('zanbil-cart')

    if(cartProductsArray.length) {
        shoppingCartContainer.classList.remove('hidden')
        emptyShoppingCartContainer.classList.replace('flex', 'hidden')

        cartProductsArray.forEach(product => {
            shoppingCartProductContainer.insertAdjacentHTML('beforeend', `
            <div class="flex items-center gap-2 p-4 transition hover:bg-gray-100 border-b">
                <a href="product.html?id=${product.id}">
                    <img class="w-14" src="${product.image}" alt="">
                </a>
                <div class="flex flex-col gap-1 text-sm">
                    <a href="product.html?id=${product.id}">${product.title_fa}</a>
                    <div class="flex items-center border-2 rounded-md w-fit text-sm text-gray-500">
                        <span onclick='decreaseCartProductCount(${product.id})' class="px-1.5 py-1 border-l-2 transition duration-200 rounded-r-md cursor-pointer hover:bg-darkRed hover:text-white">-</span>
                        <p class="px-2 py-1">${product.count}</p>
                        <span onclick='increaseCartProductCount(${product.id})' class="px-1.5 py-1 border-r-2 transition duration-200 rounded-l-md cursor-pointer hover:bg-darkRed hover:text-white">+</span>
                    </div>
                    <div>
                        <span class="text-gray-400">${product.count} <i class="fa fa-xmark"></i> </span>
                        <span class="text-darkRed font-semibold">${Number(product.price.current_price.toString().slice(0, -1)).toLocaleString()} تومان</span>
                    </div>
                </div>
                <i onclick='removeProductInShoppingCartSidebar(${product.id})' class="fa fa-xmark self-start mr-auto text-sm cursor-pointer"></i>
            </div>  
            `)
        })
    } else {
        shoppingCartContainer.classList.add('hidden')
        emptyShoppingCartContainer.classList.replace('hidden', 'flex')
    }
}

const removeProductInShoppingCartSidebar = (productId) => {
    removeFromCartLocalStorage(productId)
    showProductInShoppingCartSidebar()
    showShoppingCartSidebar()
}

const showCartProductsCount = () => {
    const cartProductCountElems = document.querySelectorAll(".cart-product-count")

    cartProductsArray = getLocalStorage('zanbil-cart')

    cartProductCountElems.forEach(elem => {
        elem.innerHTML = cartProductsArray.length
    })    
}

const sumCartTotalPrice = () => {
    const cartTotalPriceElems = document.querySelectorAll('.cart-total-price')
    let totalPrice = 0

    cartProductsArray = getLocalStorage('zanbil-cart')

    cartProductsArray.forEach(product => {
        totalPrice += (product.price.current_price / 10) * product.count
    })

    cartTotalPriceElems.forEach(elem => {
        elem.innerHTML = `${totalPrice.toLocaleString()} تومان`
    })

    return totalPrice
}

const increaseCartProductCount = (productId) => {
    cartProductsArray = getLocalStorage('zanbil-cart')

    let mainCartProductIndex = cartProductsArray.findIndex(product => product.id == productId)

    ++cartProductsArray[mainCartProductIndex].count

    setToLocalStorage('zanbil-cart', cartProductsArray)
    showProductInShoppingCartSidebar()
}
const decreaseCartProductCount = (productId) => {
    cartProductsArray = getLocalStorage('zanbil-cart')

    let mainCartProductIndex = cartProductsArray.findIndex(product => product.id == productId)

    if(cartProductsArray[mainCartProductIndex].count > 1) {
        --cartProductsArray[mainCartProductIndex].count
    }

    setToLocalStorage('zanbil-cart', cartProductsArray)
    showProductInShoppingCartSidebar()
}

export {
    showSidebar, closeSidebar, showShoppingCartSidebar, closeShoppingCartSidebar, showSidebarMenus, showSidebarCategories, showHeaderWhenScrollingUp, desktopSearchProduct, mobileSearchProduct, showHeaderCategories, showProductInShoppingCartSidebar, removeProductInShoppingCartSidebar, increaseCartProductCount, decreaseCartProductCount, sumCartTotalPrice
}
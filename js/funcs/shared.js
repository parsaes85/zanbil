const mainUrl = "https://leverapi.f4rd1n.ir/api/digikala"

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
    const shoppingCartSidebarElem = document.getElementById('shopping-cart-sidebar-parent')

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

const desktopSearchProduct = () => {
    const searchInputElem = document.getElementById('search-input')

    location.href = `./shop.html?searchedValue=${searchInputElem.value}`
}
const mobileSearchProduct = () => {
    const searchInputElem = document.getElementById('mobile-search-input')

    location.href = `./shop.html?searchedValue=${searchInputElem.value}`
}

const showHeaderCategories = async () => {
    const headerCategoriesWrapper = document.getElementById('header-categories-wrapper')

    const res = await fetch(`${mainUrl}`)
    const data = await res.json()

    const categories = data.results.categories

    categories.forEach(category => {
        headerCategoriesWrapper.insertAdjacentHTML('beforeend', `
        <li class="border-b p-2 font-medium text-gray-900 hover:bg-gray-100">
            <a href="shop.html?categoryCode=${category.code}" class="block w-full">${category.title_fa}</a>
        </li>
        `)
    })
}

export {
    showSidebar, closeSidebar, showShoppingCartSidebar, closeShoppingCartSidebar, showSidebarMenus, showSidebarCategories, desktopSearchProduct, mobileSearchProduct, showHeaderCategories
}
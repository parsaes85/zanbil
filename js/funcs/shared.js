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
const showSidebarCategories = () => {
    const sidebarCategoriesWrapper = document.getElementById('sidebar-menus-wrapper')

    sidebarCategoriesWrapper.innerHTML = `
        <a href="shop.html" class="hover:text-primaryRed transition border-t  px-4 py-3">آرایشی</a>
        <a href="shop.html" class="hover:text-primaryRed transition border-t px-4 py-3">شوینده</a>
        <a href="shop.html" class="hover:text-primaryRed transition border-t px-4 py-3">لوازم الگتریکی</a>
        <a href="shop.html" class="hover:text-primaryRed transition border-t px-4 py-3 flex items-center gap-2">لباس</a>
        <a href="shop.html" class="hover:text-primaryRed transition border-y px-4 py-3 flex items-center gap-2">ریش تراش</a>
    `
}

export {
    showSidebar, closeSidebar, showShoppingCartSidebar, closeShoppingCartSidebar, showSidebarMenus, showSidebarCategories
}
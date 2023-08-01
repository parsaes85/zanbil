import { showSidebar, closeSidebar, showShoppingCartSidebar, closeShoppingCartSidebar, showSidebarMenus, showSidebarCategories, desktopSearchProduct, mobileSearchProduct, showHeaderCategories} from "./funcs/shared.js";
import { showWishlistProductsCount } from "./funcs/utils.js";

const sidebarBtn = document.getElementById('sidebar-btn')
const shoppingCartSidebarBtns = document.querySelectorAll('.shopping-cart-sidebar-btn')
const closeShoppingCartSidebarBtn = document.getElementById('close-shopping-cart-sidebar-btn')
const showSidebarMenusBtn = document.getElementById('show-sidebar-menus-btn')
const showSidebarCategoriesBtn = document.getElementById('show-sidebar-categories-btn')
const desktopSearchForm = document.getElementById('search-form')
const mobileSearchForm = document.getElementById('mobile-search-form')

shoppingCartSidebarBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        showShoppingCartSidebar()
    })
})
sidebarBtn.addEventListener('click', e => {
    showSidebar()
})
closeShoppingCartSidebarBtn.addEventListener('click', e => {
    closeShoppingCartSidebar()
})
window.addEventListener('load', () => {
    showHeaderCategories()
    showWishlistProductsCount()
})
window.addEventListener('click', e => {
    if(e.target.id === "sidebar-parent") closeSidebar()
    else if(e.target.id === "shopping-cart-sidebar-parent") closeShoppingCartSidebar()
})
showSidebarMenusBtn.addEventListener('click', e => {
    showSidebarCategoriesBtn.classList.remove('sidebar-active-btn')
    showSidebarMenusBtn.classList.add('sidebar-active-btn')

    showSidebarMenus()
})
showSidebarCategoriesBtn.addEventListener('click', e => {
    showSidebarCategoriesBtn.classList.add('sidebar-active-btn')
    showSidebarMenusBtn.classList.remove('sidebar-active-btn')

    showSidebarCategories()
})
desktopSearchForm.addEventListener('submit', e => {
    e.preventDefault()
    
    desktopSearchProduct()
})
mobileSearchForm.addEventListener('submit', e => {
    e.preventDefault()

    mobileSearchProduct()
})
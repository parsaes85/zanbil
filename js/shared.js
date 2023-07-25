import { showSidebar, closeSidebar } from "./funcs/shared.js";

const sidebarBtn = document.getElementById('sidebar-btn')

sidebarBtn.addEventListener('click', e => {
    showSidebar()
})
window.addEventListener('click', e => {
    if(e.target.id === "sidebar-parent") closeSidebar()
})

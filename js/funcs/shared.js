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

export {showSidebar, closeSidebar}
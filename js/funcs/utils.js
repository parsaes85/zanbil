let wishlistArray = []

const getUrlParam = key => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(key)
}

const setToLocalStorage = (key, array) => {
    localStorage.setItem(key, JSON.stringify(array))
}

const getLocalStorage = key => {
    let localStorageWishlist = JSON.parse(localStorage.getItem(key))

    if(localStorageWishlist) {
        return localStorageWishlist
    } else {
        return []
    }
}

const showWishlistProductsCount = () => {
    const wishlistProductsCountElems = document.querySelectorAll('.wishlist-product-count')

    wishlistArray = getLocalStorage('zanbil-wishlist')

    wishlistProductsCountElems.forEach(elem => {
        elem.innerHTML = wishlistArray.length
    })
}
export {
    getUrlParam, setToLocalStorage, getLocalStorage, showWishlistProductsCount
}
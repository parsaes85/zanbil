let wishlistArray = []
let cartProductsArray = []

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

const addToWishlistLocalStorage = (productId, productInfo) => {
    wishlistArray = getLocalStorage('zanbil-wishlist')

    let isInWishlist = wishlistArray.some(wishlist => wishlist.id === productId )

    if(!isInWishlist) {
        wishlistArray.push(productInfo)
    }

    setToLocalStorage('zanbil-wishlist', wishlistArray)
}

const removeFromWishlistLocalStorage = (productId) => {
    wishlistArray = getLocalStorage('zanbil-wishlist')

    let mainWishlistIndex = wishlistArray.findIndex(wishlist => wishlist.id == productId)

    wishlistArray.splice(mainWishlistIndex, 1)

    setToLocalStorage('zanbil-wishlist', wishlistArray)
}

const addToCartLocalStorage = (productId, productInfo, productCount) => {
    cartProductsArray = getLocalStorage('zanbil-cart')

    let isInCart = cartProductsArray.some(product => product.id === productId )

    productInfo.count = productCount
    if(!isInCart) {
        cartProductsArray.push(productInfo)
    }

    setToLocalStorage('zanbil-cart', cartProductsArray)
}

const removeFromCartLocalStorage = (productId) => {
    cartProductsArray = getLocalStorage('zanbil-cart')

    let mainCartProductIndex = cartProductsArray.findIndex(product => product.id == productId)

    cartProductsArray.splice(mainCartProductIndex, 1)

    setToLocalStorage('zanbil-cart', cartProductsArray)
}

export {
    getUrlParam, setToLocalStorage, getLocalStorage, showWishlistProductsCount, addToWishlistLocalStorage, removeFromWishlistLocalStorage, addToCartLocalStorage, removeFromCartLocalStorage
}
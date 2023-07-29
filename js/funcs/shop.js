import { getUrlParam } from "./utils.js"

const mainUrl = "https://leverapi.f4rd1n.ir/api/digikala"

const productsWrapper = document.getElementById('products-wrapper')

const showAllProducts = async () => {
    console.log("all products")

    const res = await fetch(`${mainUrl}/search?q=&page=1`)
    const data = await res.json()

    const products = data.results.products

    products.forEach(product => {
        productsWrapper.insertAdjacentHTML('beforeend', `
        <div class="border max-w-xs p-4 select-none relative group">
            ${
                product.price.discount_percent ? `
                <span class="bg-darkRed text-white px-4 py-1 text-xs absolute right-1 top-3 rounded-full">-${product.price.discount_percent}%</span>
                ` : ""
            }

            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="">
            </a>

            <div class="text-center text-sm sm:text-base">
                <a href="product.html?id=${product.id}" class="text-gray-800">${product.title_fa}</a>

                <div class="mt-4">
                    ${
                        product.price.discount_percent ? `
                        <p class="text-gray-400 line-through font-medium text-[10px] md:text-xs">${Number(product.price.prev_price.toString().slice(0, -1)).toLocaleString()} هزارتومان</p>
                        ` : ""
                    }
                    <p class="text-darkRed font-semibold">${Number(product.price.current_price.toString().slice(0, -1)).toLocaleString()} تومان</p>
                </div>
            </div>

            <div class="absolute left-2 md:-left-0 top-4 bg-white rounded-lg flex flex-col gap-4 shadow px-3 py-2 transition-all duration-200 md:invisible md:opacity-0 group-hover:opacity-100 group-hover:visible group-hover:left-2">
                <div class="relative product-side-icon">
                    <i class="fa-regular fa-heart md:text-xl cursor-pointer text-gray-800 hover:text-gray-500"></i>

                    <p class="absolute -top-2 -right-32 bg-black text-white text-xs p-2 rounded-sm invisible opacity-0 transition-all">افزودن به علاقه مندی</p>
                </div>
                <div class="relative product-side-icon">
                    <i class="fa-solid fa-cart-shopping text-sm md:text-lg cursor-pointer text-gray-800 hover:text-gray-500"></i>

                    <p class="absolute -top-2 -right-32 bg-black text-white text-xs p-2 rounded-sm invisible opacity-0 transition-all">افزودن به سبد خرید</p>
                </div>
            </div>
        </div>
        `)
    })
}

const showSearchedProducts = async () => {
    console.log("searched products")

    const searchedValue = getUrlParam('searchedValue')

    const res = await fetch(`${mainUrl}/search?q=${searchedValue}&page=1`)
    const data = await res.json()

    const products = data.results.products


    products.forEach(product => {
        productsWrapper.insertAdjacentHTML('beforeend', `
        <div class="border max-w-xs p-4 select-none relative group">
            ${
                product.price.discount_percent ? `
                <span class="bg-darkRed text-white px-4 py-1 text-xs absolute right-1 top-3 rounded-full">-${product.price.discount_percent}%</span>
                ` : ""
            }

            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="">
            </a>

            <div class="text-center text-sm sm:text-base">
                <a href="product.html?id=${product.id}" class="text-gray-800">${product.title_fa}</a>

                <div class="mt-4">
                    ${
                        product.price.discount_percent ? `
                        <p class="text-gray-400 line-through font-medium text-[10px] md:text-xs">${Number(product.price.prev_price.toString().slice(0, -1)).toLocaleString()} هزارتومان</p>
                        ` : ""
                    }
                    <p class="text-darkRed font-semibold">${Number(product.price.current_price.toString().slice(0, -1)).toLocaleString()} تومان</p>
                </div>
            </div>

            <div class="absolute left-2 md:-left-0 top-4 bg-white rounded-lg flex flex-col gap-4 shadow px-3 py-2 transition-all duration-200 md:invisible md:opacity-0 group-hover:opacity-100 group-hover:visible group-hover:left-2">
                <div class="relative product-side-icon">
                    <i class="fa-regular fa-heart md:text-xl cursor-pointer text-gray-800 hover:text-gray-500"></i>

                    <p class="absolute -top-2 -right-32 bg-black text-white text-xs p-2 rounded-sm invisible opacity-0 transition-all">افزودن به علاقه مندی</p>
                </div>
                <div class="relative product-side-icon">
                    <i class="fa-solid fa-cart-shopping text-sm md:text-lg cursor-pointer text-gray-800 hover:text-gray-500"></i>

                    <p class="absolute -top-2 -right-32 bg-black text-white text-xs p-2 rounded-sm invisible opacity-0 transition-all">افزودن به سبد خرید</p>
                </div>
            </div>
        </div>
        `)
    })
}

const showCategoryProducts = async () => {
    console.log("category products")

    const categoryCode = getUrlParam('categoryCode')

    const res = await fetch(`${mainUrl}/categories/${categoryCode}/search?q=&page=1`)
    const data = await res.json()

    const products = data.results.products
    
    products.forEach(product => {
        productsWrapper.insertAdjacentHTML('beforeend', `
        <div class="border max-w-xs p-4 select-none relative group">
            ${
                product.price.discount_percent ? `
                <span class="bg-darkRed text-white px-4 py-1 text-xs absolute right-1 top-3 rounded-full">-${product.price.discount_percent}%</span>
                ` : ""
            }

            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="">
            </a>

            <div class="text-center text-sm sm:text-base">
                <a href="product.html?id=${product.id}" class="text-gray-800">${product.title_fa}</a>

                <div class="mt-4">
                    ${
                        product.price.discount_percent ? `
                        <p class="text-gray-400 line-through font-medium text-[10px] md:text-xs">${Number(product.price.prev_price.toString().slice(0, -1)).toLocaleString()} هزارتومان</p>
                        ` : ""
                    }
                    <p class="text-darkRed font-semibold">${Number(product.price.current_price.toString().slice(0, -1)).toLocaleString()} تومان</p>
                </div>
            </div>

            <div class="absolute left-2 md:-left-0 top-4 bg-white rounded-lg flex flex-col gap-4 shadow px-3 py-2 transition-all duration-200 md:invisible md:opacity-0 group-hover:opacity-100 group-hover:visible group-hover:left-2">
                <div class="relative product-side-icon">
                    <i class="fa-regular fa-heart md:text-xl cursor-pointer text-gray-800 hover:text-gray-500"></i>

                    <p class="absolute -top-2 -right-32 bg-black text-white text-xs p-2 rounded-sm invisible opacity-0 transition-all">افزودن به علاقه مندی</p>
                </div>
                <div class="relative product-side-icon">
                    <i class="fa-solid fa-cart-shopping text-sm md:text-lg cursor-pointer text-gray-800 hover:text-gray-500"></i>

                    <p class="absolute -top-2 -right-32 bg-black text-white text-xs p-2 rounded-sm invisible opacity-0 transition-all">افزودن به سبد خرید</p>
                </div>
            </div>
        </div>
        `)
    })
}

export {
    showAllProducts, showSearchedProducts, showCategoryProducts
}
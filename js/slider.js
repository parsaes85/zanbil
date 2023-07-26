const bannerSwiper = new Swiper(".header-banner", {
    loop: true,

    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },

    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
});
const swiper = new Swiper('.swiper-container', {
    loop: true,

    slidesPerView: 2,
    spaceBetween: 20,
    breakpoints: {
        576: {
            slidesPerView: 3
        },
        768: {
            slidesPerView: 3
        },
        900: {
            slidesPerView: 4
        },
        1200: {
            slidesPerView: 5
        }
    }
})
const giftSwiper = new Swiper('.gift-section-body', {
    loop: true,

    slidesPerView: 1,
    spaceBetween: 15,
    breakpoints: {
        576: {
            slidesPerView: 3
        },
        768: {
            slidesPerView: 4
        },
        900: {
            slidesPerView: 5
        },
    }
})
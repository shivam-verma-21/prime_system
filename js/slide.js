const slider = document.querySelector(".slider-container");

if (slider && typeof Swiper !== "undefined") {
    const heroSwiper = new Swiper(slider, {
        loop: true,
        slidesPerView: 1,
        allowTouchMove: true,
        grabCursor: true,
        loopAdditionalSlides: 1,
        effect: "fade",
        speed: 500,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            waitForTransition: false,
        },

        pagination: {
            el: ".hero-pagination",
            clickable: true,
            dynamicBullets: true,
        },

        navigation: {
            nextEl: ".hero-button-next",
            prevEl: ".hero-button-prev",
        },

        fadeEffect: {
            crossFade: true,
        },
    });

    slider.addEventListener("mouseenter", () => {
        if (heroSwiper.autoplay) heroSwiper.autoplay.stop();
    });

    slider.addEventListener("mouseleave", () => {
        if (heroSwiper.autoplay) heroSwiper.autoplay.start();
    });
}

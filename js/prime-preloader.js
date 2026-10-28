(() => {
    const root = document.documentElement;
    const startedAt = Date.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minimumDisplayTime = reducedMotion ? 0 : 500;
    const hideTransitionTime = reducedMotion ? 0 : 450;
    let hasFinished = false;

    root.classList.add("prime-preloader-active");

    const fallbackTimer = window.setTimeout(finishLoading, 10000);

    function finishLoading() {
        if (hasFinished) {
            return;
        }

        hasFinished = true;
        window.clearTimeout(fallbackTimer);

        const remainingDisplayTime = Math.max(
            0,
            minimumDisplayTime - (Date.now() - startedAt)
        );

        window.setTimeout(() => {
            const preloader = document.querySelector(".prime-preloader");

            if (preloader) {
                preloader.classList.add("prime-preloader-is-hidden");
                preloader.setAttribute("aria-hidden", "true");
            }

            window.setTimeout(() => {
                root.classList.remove("prime-preloader-active");
            }, hideTransitionTime);
        }, remainingDisplayTime);
    }

    window.addEventListener("load", finishLoading, { once: true });

    if (document.readyState === "complete") {
        finishLoading();
    }

    document.addEventListener("DOMContentLoaded", () => {
        const logo = document.querySelector(".prime-preloader-logo");

        if (!logo) {
            finishLoading();
            return;
        }

        logo.addEventListener("error", finishLoading, { once: true });

        if (logo.complete && logo.naturalWidth === 0) {
            finishLoading();
        }
    }, { once: true });
})();

// Translation/locale support removed per request.
// All language constants and runtime translation logic were intentionally removed
// to simplify the script and avoid changing HTML layout or other behaviors.

let revealObserver = null;


function initializeHeaderInteractions() {
    const menu = document.querySelector(".site-header .menu");
    const navbar = document.querySelector(".site-header .navbar");

    if (menu && navbar && menu.dataset.bound !== "true") {
        const setMenuOpen = (isOpen) => {
            navbar.classList.toggle("active", isOpen);
            menu.setAttribute("aria-expanded", String(isOpen));
        };

        menu.addEventListener("click", () => {
            setMenuOpen(menu.getAttribute("aria-expanded") !== "true");
        });

        menu.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setMenuOpen(menu.getAttribute("aria-expanded") !== "true");
            } else if (event.key === "Escape") {
                setMenuOpen(false);
            }
        });

        navbar.addEventListener("click", (event) => {
            const productLink = event.target.closest(".nav-product-link");

            if (productLink && window.matchMedia("(max-width: 991px)").matches) {
                event.preventDefault();

                const productItem = productLink.closest(".dropdown-product");
                const isOpen = !productItem.classList.contains("open");

                productItem.classList.toggle("open", isOpen);
                productLink.setAttribute("aria-expanded", String(isOpen));
                return;
            }

            if (event.target.closest("a")) {
                setMenuOpen(false);
            }
        });

        menu.dataset.bound = "true";
    }

    document.addEventListener("DOMContentLoaded", () => {
        const mainImage = document.getElementById("weighingMainImage");
        const thumbnails = document.querySelectorAll(".weighing-thumbnail");
        const zoomButton = document.getElementById("weighingImageZoom");
        const lightbox = document.getElementById("weighingImageLightbox");
        const lightboxImage = document.getElementById("weighingLightboxImage");
        const closeButton = document.getElementById("weighingLightboxClose");

        if (!mainImage || !lightbox || !lightboxImage) return;

        thumbnails.forEach((thumbnail) => {
            thumbnail.addEventListener("click", () => {
                const imagePath = thumbnail.dataset.image;
                if (!imagePath) return;

                mainImage.src = imagePath;
                lightboxImage.src = imagePath;

                thumbnails.forEach((item) => {
                    item.classList.remove("active");
                    item.setAttribute("aria-pressed", "false");
                });

                thumbnail.classList.add("active");
                thumbnail.setAttribute("aria-pressed", "true");
            });
        });

        function openLightbox() {
            lightboxImage.src = mainImage.src;
            lightbox.classList.add("active");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
            closeButton?.focus();
        }

        function closeLightbox() {
            lightbox.classList.remove("active");
            lightbox.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
            zoomButton?.focus();
        }

        zoomButton?.addEventListener("click", openLightbox);
        closeButton?.addEventListener("click", closeLightbox);

        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && lightbox.classList.contains("active")) {
                closeLightbox();
            }
        });
    });


    const question = document.querySelectorAll(".question");

    question.forEach((button) => {
        button.addEventListener("click", () => {
            const currentAnswer = button.nextElementSibling;
            const plusIcon = button.querySelector(".plus");

            document.querySelectorAll(".answer.active").forEach((answer) => {
                if (answer !== currentAnswer) {
                    answer.classList.remove("active");
                }
            });

            document.querySelectorAll(".plus.active").forEach((icon) => {
                if (icon !== plusIcon) {
                    icon.classList.remove("active");
                }
            });

            currentAnswer.classList.toggle("active");
            plusIcon.classList.toggle("active");
        });
    });

    const upArrow = document.querySelector(".Uparrow");
    const sendBtn = document.querySelector(".formbold-main-wrapper .formbold-form-wrapper form #send");
    const whatsapp = document.querySelector('.sendWhatsapp');



    if (!window.__shreejiScrollBound) {
        window.addEventListener("scroll", () => {
            const currentNavbar = document.querySelector("header .flex .navbar ul");
            const currentMenu = document.querySelector("#menu-icon");
            const currentUpArrow = document.querySelector(".Uparrow");

            if (currentUpArrow) {
                currentUpArrow.classList.toggle("active", window.scrollY > 100);
            }
        });

        window.__shreejiScrollBound = true;
    }


    if (upArrow && upArrow.dataset.bound !== "true") {
        upArrow.addEventListener("click", (event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        upArrow.dataset.bound = "true";
    }



    if (sendBtn && sendBtn.dataset.bound !== "true") {


        sendBtn.addEventListener("click", (event) => {
            event.preventDefault();

            const phoneNumber = "919825114627";
            const firstName = document.querySelector("#firstname")?.value || "";
            const lastName = document.querySelector("#lastname")?.value || "";
            const email = document.querySelector("#email")?.value || "";
            const phone = document.querySelector("#phone")?.value || "";
            const sector = document.querySelector("select#sector")?.value || "";
            const cname = document.querySelector("#company")?.value || "";
            const message = document.querySelector("#message")?.value || "";

            if (!firstName || !lastName || !email || !phone || !sector) {
                alert("Please fill all required fields.");
                return;
            }


            const url = "https://wa.me/" + phoneNumber + "?text="
                + "Hello, I would like to contact you: %0a%0a"
                + "*Name:* " + firstName + " " + lastName + "%0a"
                + "*Email:* " + email + "%0a"
                + "*Phone No.:* " + phone + "%0a"
                + "*Sector:* " + sector + "%0a"
                + "*Comany Name:* " + cname + "%0a"
                + "*Message:* " + message + "%0a%0a";

            const popup = window.open(url, "_blank");
            if (popup) {
                popup.focus();
            }
        });

        sendBtn.dataset.bound = "true";
    }

}

function initializeHeader() {
    const headerContainer = document.getElementById("header");

    if (!headerContainer) return;

    function setActiveNavigationLink() {
        const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
        let activeLink = null;

        headerContainer.querySelectorAll(".navbar a[href]").forEach((link) => {
            const linkPath = new URL(link.href, window.location.href).pathname.replace(/\/+$/, "") || "/";
            const isHomePage = linkPath === "/index.html" && (currentPath === "/" || currentPath === "/index.html");
            const isCurrentPage = linkPath === currentPath || isHomePage;

            link.classList.toggle("active", isCurrentPage);

            if (isCurrentPage) {
                link.setAttribute("aria-current", "page");
                activeLink = link;
            } else {
                link.removeAttribute("aria-current");
            }
        });

        if (activeLink?.classList.contains("category-link")) {
            const productsLink = headerContainer.querySelector(".navbar .nav-product-link");
            productsLink?.classList.add("active");
        }
    }

    fetch("header.html?v=" + Date.now())
        .then(response => response.text())
        .then((html) => {

            headerContainer.innerHTML = html;
            setActiveNavigationLink();
            // language switcher / translations removed
            initializeHeaderInteractions();
            // language switcher / translations removed
            if (typeof window.initializeAutocomplete === "function") {
                window.initializeAutocomplete();
            }
        });
}

function observeRevealTargets() {
    if (!revealObserver) {
        return;
    }

    document.querySelectorAll(".reveal, .reveal2, .reveal3, .reveal4, .reveal-left, .reveal-right").forEach((element) => {
        if (element.dataset.observed === "true") {
            return;
        }

        revealObserver.observe(element);
        element.dataset.observed = "true";
    });
}



function initializeRevealAnimations() {
    if (!("IntersectionObserver" in window)) {
        return;
    }

    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    observeRevealTargets();
}




function initializeFooter() {
    const footerContainer = document.getElementById("footer");

    if (!footerContainer) {
        return;
    }

    fetch("footer.html?v=2")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Unable to load footer.");
            }

            return response.text();
        })
        .then((data) => {
            footerContainer.innerHTML = data;
            observeRevealTargets();

            const backToTop = document.getElementById("backToTop");
            const progressCircle = document.querySelector(".progress-value");
            const whatsappButton = document.querySelector(".floating-whatsapp");

            if (backToTop) {
                const circumference = 2 * Math.PI * 29;

                if (progressCircle) {
                    progressCircle.style.strokeDasharray = circumference;
                    progressCircle.style.strokeDashoffset = circumference;
                }

                const updateScrollUI = () => {
                    const scrollTop = window.scrollY;
                    const scrollableHeight =
                        document.documentElement.scrollHeight - window.innerHeight;
                    const progress = scrollableHeight > 0
                        ? Math.min(scrollTop / scrollableHeight, 1)
                        : 0;

                    backToTop.classList.toggle("is-visible", scrollTop > 300);

                    if (progressCircle) {
                        progressCircle.style.strokeDashoffset =
                            circumference * (1 - progress);
                    }
                };

                window.addEventListener("scroll", updateScrollUI, { passive: true });
                updateScrollUI();

                backToTop.addEventListener("click", () => {
                    window.scrollTo({
                        top: 0,
                        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                            ? "instant"
                            : "smooth"
                    });
                });
            }

            if (whatsappButton && window.matchMedia("(hover: none)").matches) {
                window.setTimeout(() => {
                    if (!whatsappButton.matches(":hover")) {
                        whatsappButton.classList.add("show-whatsapp-tooltip");

                        window.setTimeout(() => {
                            whatsappButton.classList.remove("show-whatsapp-tooltip");
                        }, 3500);
                    }
                }, 1800);
            }

            const yearElement = document.getElementById("year");
            if (yearElement) {
                yearElement.textContent = new Date().getFullYear();
            }
        })
        .catch(() => {
            const yearElement = document.getElementById("year");
            if (yearElement) {
                yearElement.textContent = new Date().getFullYear();
            }
        });
}

function initializeGallery() {
    const gallery = document.querySelector(".gallery");

    if (gallery && typeof lightGallery === "function") {
        lightGallery(gallery);
    }
}

function initializePage() {
    // Translation functionality removed; initialize core features only.
    initializeHeaderInteractions();
    initializeHeader();
    initializeFooter();
    initializeRevealAnimations();
    // original reveal initialization (no automatic class assignment)
    initializeGallery();
}

initializePage();
initializeHeaderInteractions();


// ========================================
// PRIME SYSTEMS — EMAILJS ENQUIRY FORM
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // Replace these with your actual EmailJS credentials
    const EMAILJS_PUBLIC_KEY = "0eeWZM5ZL9SObkJx0";
    const EMAILJS_SERVICE_ID = "service_zauu9aj";
    const EMAILJS_TEMPLATE_ID = "template_lhec8dg";

    // Initialize EmailJS
    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });

    const form = document.getElementById("primeEnquiryForm");
    const status = document.getElementById("contactFormStatus");
    const submitButton = form?.querySelector(".contact-submit-btn");
    const submitText = form?.querySelector(".contact-submit-text");
    const messageField = document.getElementById("enquiryMessage");
    const charCount = document.getElementById("enquiryCharCount");

    if (!form) return;

    // Character counter
    if (messageField && charCount) {
        const updateCount = () => {
            charCount.textContent = messageField.value.length;
        };

        messageField.addEventListener("input", updateCount);
        updateCount();
    }

    // Form submission
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const originalButtonText = submitText
            ? submitText.textContent
            : "Submit Enquiry";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.style.opacity = "0.7";
            submitButton.style.cursor = "wait";
        }

        if (submitText) {
            submitText.textContent = "Sending Enquiry...";
        }

        if (status) {
            status.textContent = "Please wait while we send your enquiry.";
            status.style.color = "#475569";
        }

        // Get readable product name instead of its hyphenated value
        const productSelect = document.getElementById("enquiryProduct");
        const selectedProduct = productSelect
            ? productSelect.options[productSelect.selectedIndex].text.trim()
            : "";

        // Prepare template variables
        const templateParams = {
            name: document.getElementById("enquiryName").value.trim(),

            company: document.getElementById("enquiryCompany").value.trim() || "Not provided",

            phone: document.getElementById("enquiryPhone").value.trim(),

            email: document.getElementById("enquiryEmail").value.trim(),

            product: selectedProduct,

            message: messageField.value.trim(),

            time: new Date().toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
                timeZone: "Asia/Kolkata"
            })
        };

        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );

            if (status) {
                status.textContent =
                    "Thank you! Your enquiry has been sent successfully. Our team will contact you soon.";

                status.style.color = "#15803d";
            }

            form.reset();

            if (charCount) {
                charCount.textContent = "0";
            }

        } catch (error) {
            console.error("EmailJS submission error:", error);

            if (status) {
                status.textContent =
                    "Sorry, your enquiry could not be sent. Please try again or contact us directly.";

                status.style.color = "#dc2626";
            }

        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.style.opacity = "1";
                submitButton.style.cursor = "pointer";
            }

            if (submitText) {
                submitText.textContent = originalButtonText;
            }
        }
    });F

});
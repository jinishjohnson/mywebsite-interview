// responsive mobile and tablet menu hamburger
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".menu li a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Counter Animation
const counters = document.querySelectorAll(".col-3 div h1");
const animationDuration = 2000;

const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const originalText = counter.innerText;

    let suffix = originalText.replace(target.toString(), '');

    if (originalText.indexOf(target) === -1) {
        suffix = originalText.replace(/[0-9]+/, '');
        if (!suffix) suffix = "";
    }

    const startTime = performance.now();

    const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);

        // Exponential Ease Out for smoother checking effect
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        const currentCount = Math.floor(easeOut * target);
        counter.innerText = `${currentCount}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(updateCount);
        } else {
            counter.innerText = `${target}${suffix}`; // Ensure final value is exact
        }
    };

    requestAnimationFrame(updateCount);
};

// Use IntersectionObserver to start animation when visible
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target); // Run only once
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    observer.observe(counter);
});

// Product Carousel
const carouselImage = document.querySelector(".product-image");
const prevBtn = document.querySelector("button[data-direction='prev']");
const nextBtn = document.querySelector("button[data-direction='next']");
const dots = document.querySelectorAll(".dots span");

// Image Array 
const images = [
    "./assets/images/newfrag.png",
    "./assets/images/banner.png",
    "./assets/images/newfrag.png"
];

let currentIndex = 0;

const updateCarousel = (index) => {
    // Wrap around index
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;

    currentIndex = index;

    // Update Image
    carouselImage.style.opacity = 0;
    setTimeout(() => {
        carouselImage.src = images[currentIndex];
        carouselImage.style.opacity = 1;
    }, 200); // Short delay for fade

    // Update Dots
    dots.forEach(dot => dot.classList.remove("active-dot"));
    if (dots[currentIndex]) dots[currentIndex].classList.add("active-dot");
};

// Event Listeners
if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => updateCarousel(currentIndex - 1));
    nextBtn.addEventListener("click", () => updateCarousel(currentIndex + 1));
}

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => updateCarousel(index));
});

// Initialize
if (carouselImage) {
    carouselImage.style.transition = "opacity 0.3s ease";
    updateCarousel(0);
}

// star rating
const stars = document.querySelectorAll(".stars svg");
const ratingText = document.querySelector(".rating span");

let currentRating = 4.5; // Default matches HTML

stars.forEach((star, index) => {
    star.addEventListener("click", (e) => {
        const rect = star.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;

        if (x < width / 2) {
            currentRating = index + 0.5;
        } else {
            currentRating = index + 1;
        }
        updateRating();
    });
});

const updateRating = () => {
    stars.forEach((star, index) => {
        star.style.fill = "none";
        star.style.stroke = "rgba(0, 201, 80, 1)";

        if (currentRating >= index + 1) {
            star.style.fill = "rgba(0, 201, 80, 1)";
        } else if (currentRating >= index + 0.5) {
            star.style.fill = "url(#half)";
        }
    });
    ratingText.textContent = `${currentRating}/5`;
};

// Accordion Logic
const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach(header => {
    header.addEventListener("click", (e) => {
        const item = header.parentElement;
        const content = item.querySelector(".accordion-content");

        // If it's a click on the radio input directly
        if (e.target.type === 'radio') {
            document.querySelectorAll(".accordion-item").forEach(acc => {
                if (acc !== item) {
                    acc.classList.remove("active");
                    acc.querySelector(".accordion-content").style.maxHeight = null;
                }
            });

            item.classList.add("active");
            content.style.maxHeight = content.scrollHeight + 100 + "px";

            e.stopPropagation();
            return;
        }

        // Standard Accordion Toggle
        const isActive = item.classList.contains("active");
        const radio = header.querySelector('input[type="radio"]');

        document.querySelectorAll(".accordion-item").forEach(acc => {
            acc.classList.remove("active");
            acc.querySelector(".accordion-content").style.maxHeight = null;
        });

        if (!isActive) {
            item.classList.add("active");
            content.style.maxHeight = content.scrollHeight + 100 + "px";
            if (radio) radio.checked = true;
        } else {
            item.classList.remove("active");
            content.style.maxHeight = null;
            if (radio) radio.checked = false;
        }
    });
});

// Default Open (on load) - Moved outside the loop for cleaner execution
window.addEventListener('load', () => {
    const firstAcc = document.querySelector(".accordion-item");
    if (firstAcc) {
        const header = firstAcc.querySelector(".accordion-header");
        const radio = header.querySelector('input[type="radio"]');
        const content = firstAcc.querySelector(".accordion-content");

        firstAcc.classList.add("active");
        if (content) content.style.maxHeight = content.scrollHeight + 100 + "px";
        if (radio) radio.checked = true;
    }
});

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
    // Simple fade effect could be added here
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
// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
    /* =========================
       Custom Cursor
    ========================== */
    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
    });

    // Smooth follow for outer circle
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Enlarge cursor on hover of links & buttons
    const hoverElements = document.querySelectorAll("a, button, .project-card, .submit-btn");

    hoverElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cursor.style.transform += " scale(1.8)";
            cursor.style.borderColor = "var(--secondary)";
        });

        el.addEventListener("mouseleave", () => {
            cursor.style.transform = cursor.style.transform.replace(" scale(1.8)", "");
            cursor.style.borderColor = "var(--primary)";
        });
    });

    /* =========================
       Background Particles
    ========================== */
    const particlesContainer = document.getElementById("particles");

    const createParticle = () => {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        const size = Math.random() * 3 + 1;
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        particle.style.animationDuration = `${15 + Math.random() * 15}s`;
        particle.style.animationDelay = `${Math.random() * 10}s`;

        particlesContainer.appendChild(particle);
    };

    for (let i = 0; i < 80; i++) {
        createParticle();
    }

    /* =========================
       Scroll Progress Indicator
    ========================== */
    const scrollIndicator = document.querySelector(".scroll-indicator");

    const updateScrollIndicator = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        scrollIndicator.style.width = `${progress}%`;
    };

    window.addEventListener("scroll", updateScrollIndicator);
    updateScrollIndicator();

    /* =========================
       Smooth scroll section highlight (optional)
    ========================== */
    const navLinks = document.querySelectorAll("nav a");

    function setActiveLink() {
        let fromTop = window.scrollY + 150;

        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute("href"));
            if (!section) return;

            if (
                section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop
            ) {
                link.classList.add("active-link");
            } else {
                link.classList.remove("active-link");
            }
        });
    }

    window.addEventListener("scroll", setActiveLink);
    setActiveLink();
});


function sendMail() {
    let Parms = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    }

    emailjs.send("service_n8gp17b", "template_xmnjhrc", Parms).then(alert("thanks for message!"))
}

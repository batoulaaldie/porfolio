// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Sticky Navbar & Active States --- */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Add background to navbar on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active state for nav links
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* --- 2. Mobile Menu Toggle --- */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('nav-active');
        // Change icon between menu and x
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('nav-active')) {
            icon.classList.remove('bx-menu');
            icon.classList.add('bx-x');
        } else {
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('nav-active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        });
    });

    /* --- 3. Scroll Reveal Animations --- */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    // Trigger once on load
    revealOnScroll();
    
    // Trigger on scroll
    window.addEventListener('scroll', revealOnScroll);

    /* --- 4. Smooth Scrolling for Anchor Links --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80; // Size of the sticky header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});

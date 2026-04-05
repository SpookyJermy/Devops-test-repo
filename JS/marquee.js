/* ============================================================================
   KINETIC TYPOGRAPHY - MARQUEE & ANIMATION SYSTEM
   Vanilla JS implementation of marquees and scroll animations
   ============================================================================ */

/**
 * Initialize all marquee elements on the page
 * Duplicates marquee content to create infinite scroll effect
 */
function initMarquees() {
    const marqueeWrappers = document.querySelectorAll('.marquee-wrapper');
    
    marqueeWrappers.forEach(wrapper => {
        // Get marquee speed (default: fast)
        const speedClass = Array.from(wrapper.classList).find(cls => cls.startsWith('speed-'));
        
        // Clone content for infinite scroll effect
        const childNodes = Array.from(wrapper.children);
        childNodes.forEach(child => {
            const clone = child.cloneNode(true);
            wrapper.appendChild(clone);
        });
    });
}

/**
 * Initialize scroll-triggered animations
 * Elements with data-scroll attribute will animate when entering viewport
 */
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('[data-scroll]');
    
    // Create Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const animationType = target.getAttribute('data-scroll');
                
                target.classList.add('animate-in');
                target.setAttribute('data-scroll-triggered', 'true');
                
                // Apply specific animation type if specified
                if (animationType) {
                    target.classList.add(`animate-${animationType}`);
                }
                
                // Optional: unobserve after animation (remove to keep animating)
                // observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    scrollElements.forEach(el => observer.observe(el));
}

/**
 * Initialize sticky card animations
 * Cards stack and overlap as user scrolls
 */
function initStickyCards() {
    const stickyCards = document.querySelectorAll('.card.sticky');
    
    if (stickyCards.length === 0) return;
    
    let scrollHandler = () => {
        stickyCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            
            // Calculate scroll progress through card
            const distanceFromTop = rect.top;
            const speed = 0.5;
            
            if (distanceFromTop < 0) {
                // Card passed the sticky point
                card.style.transform = `translateY(${Math.abs(distanceFromTop) * speed}px)`;
            } else {
                // Reset transform
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
}

/**
 * Initialize hover animations for elements with hover classes
 * Cards flip colors, titles translate, descriptions fade in
 */
function initHoverAnimations() {
    const hoverElements = document.querySelectorAll('.card');
    
    hoverElements.forEach(element => {
        const descriptions = element.querySelectorAll('.card-description');
        
        element.addEventListener('mouseenter', () => {
            descriptions.forEach(desc => {
                desc.style.opacity = '1';
            });
        });
        
        element.addEventListener('mouseleave', () => {
            // Only hide on desktop
            if (window.innerWidth >= 768) {
                descriptions.forEach(desc => {
                    desc.style.opacity = '0';
                });
            }
        });
    });
}

/**
 * Initialize parallax effect on hero section
 * Hero text scales as user scrolls
 */
function initHeroParallax() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    let parallaxHandler = () => {
        const scrolled = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        
        if (scrolled < heroHeight) {
            const scrollPercent = scrolled / heroHeight;
            const scale = 1 + (scrollPercent * 0.2);
            const opacity = 1 - (scrollPercent * 0.8);
            
            // Apply to hero content
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `scale(${scale})`;
                heroContent.style.opacity = Math.max(opacity, 0);
            }
        }
    };
    
    window.addEventListener('scroll', parallaxHandler, { passive: true });
}

/**
 * Active link highlighting in navigation
 * Updates active class based on current scroll position
 */
function initActiveLinks() {
    const navLinks = document.querySelectorAll('nav a');
    if (navLinks.length === 0) return;
    
    let urlHandler = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (href === 'home.html' && currentPage === '')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };
    
    urlHandler();
}

/**
 * Handle mobile interactions for cards
 * Show card descriptions on touch devices
 */
function initMobileInteractions() {
    if (!('ontouchstart' in window)) return;
    
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const descriptions = card.querySelectorAll('.card-description');
        
        // Prevent double-tap zoom on cards
        card.addEventListener('touchend', (e) => {
            e.preventDefault();
            
            // Toggle descriptions visibility
            descriptions.forEach(desc => {
                const currentOpacity = window.getComputedStyle(desc).opacity;
                desc.style.opacity = currentOpacity === '1' ? '0' : '1';
            });
        }, false);
    });
}

/**
 * Respect user's motion preferences
 * Disable animations if user prefers reduced motion
 */
function respectMotionPreferences() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const style = document.createElement('style');
        style.textContent = `
            .marquee-wrapper {
                animation: none !important;
            }
            * {
                transition: none !important;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Format numbers with proper spacing (e.g., 20K+, 500+)
 * Used for stats in marquees
 */
function formatStat(number) {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (number >= 1000) {
        return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return number.toString();
}

/**
 * Main initialization function
 * Call this when DOM is ready
 */
function initKineticTypography() {
    respectMotionPreferences();
    initMarquees();
    initScrollAnimations();
    initStickyCards();
    initHoverAnimations();
    initHeroParallax();
    initActiveLinks();
    initMobileInteractions();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKineticTypography);
} else {
    initKineticTypography();
}

// Re-initialize on dynamic content changes if needed
window.addEventListener('customContentLoaded', initKineticTypography);

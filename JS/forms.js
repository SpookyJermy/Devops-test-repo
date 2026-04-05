/* ============================================================================
   FORM VALIDATION & INTERACTION SYSTEM
   Enhanced form handling with real-time validation and feedback
   ============================================================================ */

/**
 * Form Validation Rules
 */
const validationRules = {
    name: {
        required: true,
        minLength: 2,
        maxLength: 100,
        pattern: /^[a-zA-Z\s'-]+$/,
        message: 'Name must contain only letters, spaces, hyphens, and apostrophes'
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    phone: {
        required: false,
        pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        message: 'Please enter a valid phone number'
    },
    message: {
        required: false,
        minLength: 10,
        maxLength: 2000,
        message: 'Message must be between 10 and 2000 characters'
    }
};

/**
 * Validate a single form field
 */
function validateField(field) {
    const name = field.name || field.id;
    const value = field.value.trim();
    const rules = validationRules[name];

    if (!rules) return true; // No rules for this field

    // Check required
    if (rules.required && !value) {
        setFieldError(field, `${name} is required`);
        return false;
    }

    // Skip validation if field is optional and empty
    if (!rules.required && !value) {
        clearFieldError(field);
        return true;
    }

    // Check min length
    if (rules.minLength && value.length < rules.minLength) {
        setFieldError(field, `${name} must be at least ${rules.minLength} characters`);
        return false;
    }

    // Check max length
    if (rules.maxLength && value.length > rules.maxLength) {
        setFieldError(field, `${name} must not exceed ${rules.maxLength} characters`);
        return false;
    }

    // Check pattern
    if (rules.pattern && !rules.pattern.test(value)) {
        setFieldError(field, rules.message);
        return false;
    }

    clearFieldError(field);
    return true;
}

/**
 * Set error state on field
 */
function setFieldError(field, message) {
    field.classList.add('input-error');
    field.classList.remove('input-success');

    // Remove existing error message
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();

    // Add error message
    const errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    errorEl.textContent = message;
    field.parentElement.appendChild(errorEl);
}

/**
 * Clear error state on field
 */
function clearFieldError(field) {
    field.classList.remove('input-error');
    field.classList.add('input-success');

    // Remove error message
    const errorEl = field.parentElement.querySelector('.error-message');
    if (errorEl) errorEl.remove();
}

/**
 * Initialize form validation
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');

        // Real-time validation on blur
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });

            // Clear error on focus
            input.addEventListener('focus', () => {
                const errorEl = input.parentElement.querySelector('.error-message');
                if (errorEl) errorEl.remove();
                input.classList.remove('input-error', 'input-success');
            });

            // Real-time validation on input for password/email
            if (input.type === 'email' || input.type === 'password') {
                input.addEventListener('input', () => {
                    validateField(input);
                });
            }
        });

        // Form submission validation
        form.addEventListener('submit', (e) => {
            let isValid = true;

            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                e.preventDefault();
                console.log('Form has validation errors');
            }
        });
    });
}

/* ============================================================================
   TOOLTIP SYSTEM
   Lightweight tooltip implementation using data attributes
   ============================================================================ */

/**
 * Initialize tooltips
 */
function initTooltips() {
    const tooltipTargets = document.querySelectorAll('[data-tooltip]');

    tooltipTargets.forEach(target => {
        const tooltipText = target.getAttribute('data-tooltip');
        
        const tooltipEl = document.createElement('div');
        tooltipEl.className = 'tooltip';
        tooltipEl.textContent = tooltipText;
        
        target.appendChild(tooltipEl);
    });
}

/* ============================================================================
   SMOOTH SCROLL ENHANCEMENT
   Smooth scroll to anchor with offset for fixed headers
   ============================================================================ */

/**
 * Initialize smooth scroll behavior
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80; // Nav height
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================================================
   FOCUS MANAGEMENT
   Improve keyboard navigation and accessibility
   ============================================================================ */

/**
 * Add focus visible styles
 */
function initFocusManagement() {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('click', () => {
        document.body.classList.remove('keyboard-nav');
    });
}

/* ============================================================================
   ACTIVE LINK HIGHLIGHTING
   Update nav links based on current page
   ============================================================================ */

/**
 * Initialize active link highlighting
 */
function initActiveLinks() {
    const navLinks = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (href === 'home.html' && currentPage === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* ============================================================================
   INPUT FOCUS ANIMATION
   Move placeholder up on focus
   ============================================================================ */

/**
 * Initialize input focus animations
 */
function initInputAnimations() {
    const inputs = document.querySelectorAll('.form-input, .form-textarea');

    inputs.forEach(input => {
        const formGroup = input.parentElement;

        input.addEventListener('focus', () => {
            formGroup.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                formGroup.classList.remove('focused');
            }
        });

        // Check on load if input has value
        if (input.value) {
            formGroup.classList.add('focused');
        }
    });
}

/* ============================================================================
   FORM SUCCESS FEEDBACK
   Show success message and optionally reset form
   ============================================================================ */

/**
 * Show form success state
 */
function showFormSuccess(form, message = null, resetDelay = 3000) {
    // Hide all form fields
    const formFields = form.querySelectorAll('.form-group');
    formFields.forEach(field => {
        field.style.opacity = '0';
        field.style.pointerEvents = 'none';
    });

    // Create success message if doesn't exist
    let successMessage = form.querySelector('.success-message-container');
    if (!successMessage) {
        successMessage = document.createElement('div');
        successMessage.className = 'success-message-container p-12 bg-muted border-2 border-accent text-center';
        successMessage.innerHTML = `
            <h3 class="text-heading-lg mb-4" style="color: var(--accent);">Success!</h3>
            <p class="text-body">${message || 'Thank you! We will be in touch soon.'}</p>
        `;
        form.appendChild(successMessage);
    }

    successMessage.style.display = 'block';
    successMessage.style.animation = 'slideUp 0.4s ease-out';

    // Reset form after delay
    if (resetDelay > 0) {
        setTimeout(() => {
            form.reset();
            formFields.forEach(field => {
                field.style.opacity = '1';
                field.style.pointerEvents = 'auto';
            });
            successMessage.style.display = 'none';
        }, resetDelay);
    }
}

/* ============================================================================
   MAIN INITIALIZATION
   ============================================================================ */

function initEnhancedJS() {
    initFormValidation();
    initTooltips();
    initSmoothScroll();
    initFocusManagement();
    initActiveLinks();
    initInputAnimations();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnhancedJS);
} else {
    initEnhancedJS();
}

// Export for use in other modules
window.FormValidation = {
    validateField,
    setFieldError,
    clearFieldError,
    showFormSuccess
};

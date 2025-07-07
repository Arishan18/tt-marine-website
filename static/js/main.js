/**
 * T&T Marine Website JavaScript
 * Enhanced interactive elements and animations
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate on Scroll) like functionality
    initScrollAnimations();
    
    // Mobile navigation toggle with enhanced transitions
    initMobileNavigation();
    
    // Project gallery with lightbox and filters
    initProjectGallery();
    
    // Contact form validation with enhanced feedback
    initContactForm();
    
    // FAQ accordion functionality
    initAccordions();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize any sliders/carousels
    initSliders();
    
    // Animate stats counters
    initCounters();
    
    // Initialize marine-themed interactive elements
    initThematicElements();
    
    // Initialize water ripple effects
    initWaterEffects();
});

/**
 * Initialize scroll-based animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if (animatedElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const animationType = el.getAttribute('data-animate') || 'fade-in';
                    const delay = el.getAttribute('data-delay') || 0;
                    
                    // Apply initial state
                    el.style.opacity = '0';
                    
                    // Add staggered animation
                    setTimeout(function() {
                        el.style.opacity = '';
                        el.classList.add(`animate-${animationType}`);
                        
                        // Stagger child animations if specified
                        if (el.hasAttribute('data-stagger')) {
                            const children = el.querySelectorAll('[data-stagger-item]');
                            children.forEach(function(child, index) {
                                setTimeout(function() {
                                    child.classList.add(`animate-${animationType}`);
                                }, index * 100);
                            });
                        }
                        
                        observer.unobserve(el);
                    }, delay);
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(function(element) {
            observer.observe(element);
        });
    }
}
    
/**
 * Initialize mobile navigation with enhanced transitions
 */
function initMobileNavigation() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileNavButton = document.getElementById('close-mobile-nav');
    const mobileNav = document.getElementById('mobile-nav');
    const body = document.body;
    
    if (mobileMenuButton && closeMobileNavButton && mobileNav) {
        mobileMenuButton.addEventListener('click', function() {
            mobileNav.classList.remove('hidden');
            
            // Staggered animation for menu items
            setTimeout(function() {
                mobileNav.classList.remove('-translate-x-full');
                body.classList.add('overflow-hidden');
                
                const menuItems = mobileNav.querySelectorAll('li');
                menuItems.forEach(function(item, index) {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    
                    setTimeout(function() {
                        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 100 + (index * 50));
                });
            }, 50);
        });
        
        const closeNavigation = function() {
            const menuItems = mobileNav.querySelectorAll('li');
            
            // Reverse staggered animation
            menuItems.forEach(function(item, index) {
                const delay = menuItems.length - index - 1;
                setTimeout(function() {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                }, delay * 30);
            });
            
            mobileNav.classList.add('-translate-x-full');
            
            setTimeout(function() {
                mobileNav.classList.add('hidden');
                body.classList.remove('overflow-hidden');
                
                // Reset styles for next opening
                menuItems.forEach(function(item) {
                    item.style = '';
                });
            }, 500);
        };
        
        closeMobileNavButton.addEventListener('click', closeNavigation);
        
        // Close mobile nav when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileNav && 
                !mobileNav.classList.contains('hidden') && 
                !mobileNav.contains(e.target) && 
                e.target !== mobileMenuButton) {
                closeNavigation();
            }
        });
        
        // Close mobile nav when pressing escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !mobileNav.classList.contains('hidden')) {
                closeNavigation();
            }
        });
    }
}

/**
 * Initialize project gallery with lightbox and filtering
 */
function initProjectGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    // Image lightbox functionality
    if (galleryItems.length > 0) {
        galleryItems.forEach(function(item) {
            item.addEventListener('click', function(e) {
                // Don't open lightbox if clicking on a link inside the gallery item
                if (e.target.tagName === 'A' || e.target.closest('a')) {
                    return;
                }
                
                e.preventDefault();
                
                const imgSrc = this.querySelector('img').src;
                const imgAlt = this.querySelector('img').alt || 'Project Image';
                const imgTitle = this.querySelector('.gallery-title')?.textContent || '';
                const imgDesc = this.querySelector('.gallery-description')?.textContent || '';
                
                // Create lightbox elements
                const lightbox = document.createElement('div');
                lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center flex-col p-4';
                lightbox.style.opacity = '0';
                lightbox.style.transition = 'opacity 0.3s ease';
                
                const lightboxContent = document.createElement('div');
                lightboxContent.className = 'relative max-w-4xl w-full';
                lightboxContent.style.transform = 'scale(0.9)';
                lightboxContent.style.transition = 'transform 0.3s ease';
                
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = imgAlt;
                img.className = 'max-h-[80vh] max-w-full mx-auto rounded-lg';
                
                const caption = document.createElement('div');
                caption.className = 'text-white text-center mt-4';
                
                if (imgTitle) {
                    const title = document.createElement('h3');
                    title.className = 'text-xl font-bold';
                    title.textContent = imgTitle;
                    caption.appendChild(title);
                }
                
                if (imgDesc) {
                    const desc = document.createElement('p');
                    desc.className = 'text-gray-300 mt-2';
                    desc.textContent = imgDesc;
                    caption.appendChild(desc);
                }
                
                const closeButton = document.createElement('button');
                closeButton.className = 'absolute top-4 right-4 text-white text-3xl bg-primary rounded-full w-10 h-10 flex items-center justify-center';
                closeButton.innerHTML = '&times;';
                closeButton.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
                
                closeButton.addEventListener('mouseenter', function() {
                    this.style.transform = 'rotate(90deg)';
                    this.style.backgroundColor = 'var(--primary-dark)';
                });
                
                closeButton.addEventListener('mouseleave', function() {
                    this.style.transform = 'rotate(0)';
                    this.style.backgroundColor = '';
                });
                
                // Assemble the lightbox
                lightboxContent.appendChild(img);
                lightboxContent.appendChild(closeButton);
                lightbox.appendChild(lightboxContent);
                lightbox.appendChild(caption);
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                // Animate the lightbox entrance
                setTimeout(function() {
                    lightbox.style.opacity = '1';
                    lightboxContent.style.transform = 'scale(1)';
                }, 50);
                
                // Close the lightbox when clicking the close button
                closeButton.addEventListener('click', closeLightbox);
                
                // Close the lightbox when clicking outside the image
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        closeLightbox();
                    }
                });
                
                // Close the lightbox when pressing escape
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        closeLightbox();
                    }
                });
                
                function closeLightbox() {
                    lightbox.style.opacity = '0';
                    lightboxContent.style.transform = 'scale(0.9)';
                    
                    setTimeout(function() {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = '';
                    }, 300);
                }
            });
        });
    }
    
    // Project filtering functionality
    if (filterTabs.length > 0) {
        filterTabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active tab
                filterTabs.forEach(function(t) {
                    t.classList.remove('active');
                });
                this.classList.add('active');
                
                // Filter gallery items
                galleryItems.forEach(function(item) {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filter === 'all' || itemCategory === filter) {
                        item.style.display = '';
                        setTimeout(function() {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(function() {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}
    
    // Project gallery lightbox
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    if (galleryItems.length > 0) {
        galleryItems.forEach(function(item) {
            item.addEventListener('click', function() {
                const lightbox = document.createElement('div');
                lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50';
                
                const img = document.createElement('img');
                img.src = this.src;
                img.className = 'max-h-[90vh] max-w-[90vw] object-contain';
                
                const closeButton = document.createElement('button');
                closeButton.className = 'absolute top-4 right-4 text-white text-3xl';
                closeButton.innerHTML = '&times;';
                
                lightbox.appendChild(img);
                lightbox.appendChild(closeButton);
                
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                closeButton.addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                });
                
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = '';
                    }
                });
            });
        });
    }
    
/**
 * Initialize contact form with enhanced validation and feedback
 */
function initContactForm() {
    const contactForm = document.querySelector('form[action="/contact"]');
    
    if (contactForm) {
        // Add floating label behavior
        const formGroups = contactForm.querySelectorAll('.form-group.floating');
        formGroups.forEach(function(group) {
            const input = group.querySelector('.form-input');
            const label = group.querySelector('.form-label');
            
            if (input && label) {
                // Check initial state
                if (input.value.trim() !== '') {
                    label.classList.add('active');
                }
                
                // Handle input events
                input.addEventListener('focus', function() {
                    label.classList.add('active');
                });
                
                input.addEventListener('blur', function() {
                    if (input.value.trim() === '') {
                        label.classList.remove('active');
                    }
                });
            }
        });
        
        // Enhanced form validation
        contactForm.addEventListener('submit', function(e) {
            let valid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('border-red-500');
                    field.classList.add('shake-animation');
                    
                    // Add error message with animation
                    const errorId = `${field.id}-error`;
                    if (!document.getElementById(errorId)) {
                        const errorMessage = document.createElement('p');
                        errorMessage.id = errorId;
                        errorMessage.className = 'text-red-500 text-sm mt-1 opacity-0';
                        errorMessage.innerText = 'This field is required';
                        field.parentNode.appendChild(errorMessage);
                        
                        // Animate error message
                        setTimeout(function() {
                            errorMessage.style.transition = 'opacity 0.3s ease';
                            errorMessage.style.opacity = '1';
                        }, 10);
                    }
                    
                    // Remove shake animation after it completes
                    setTimeout(function() {
                        field.classList.remove('shake-animation');
                    }, 500);
                } else {
                    field.classList.remove('border-red-500');
                    
                    // Remove error message if it exists
                    const errorElement = document.getElementById(`${field.id}-error`);
                    if (errorElement) {
                        errorElement.style.opacity = '0';
                        setTimeout(function() {
                            errorElement.remove();
                        }, 300);
                    }
                }
            });
            
            // Enhanced email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    valid = false;
                    emailField.classList.add('border-red-500');
                    emailField.classList.add('shake-animation');
                    
                    // Add error message with animation
                    const errorId = `${emailField.id}-error`;
                    if (!document.getElementById(errorId)) {
                        const errorMessage = document.createElement('p');
                        errorMessage.id = errorId;
                        errorMessage.className = 'text-red-500 text-sm mt-1 opacity-0';
                        errorMessage.innerText = 'Please enter a valid email address';
                        emailField.parentNode.appendChild(errorMessage);
                        
                        // Animate error message
                        setTimeout(function() {
                            errorMessage.style.transition = 'opacity 0.3s ease';
                            errorMessage.style.opacity = '1';
                        }, 10);
                    }
                    
                    // Remove shake animation after it completes
                    setTimeout(function() {
                        emailField.classList.remove('shake-animation');
                    }, 500);
                }
            }
            
            if (!valid) {
                e.preventDefault();
                
                // Scroll to the first error field
                const firstError = contactForm.querySelector('.border-red-500');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(function() {
                        firstError.focus();
                    }, 500);
                }
            } else {
                // Add loading state to submit button
                const submitButton = contactForm.querySelector('button[type="submit"]');
                if (submitButton) {
                    const originalText = submitButton.innerHTML;
                    submitButton.disabled = true;
                    submitButton.innerHTML = '<span class="loading-wave"><span>S</span><span>e</span><span>n</span><span>d</span><span>i</span><span>n</span><span>g</span></span>';
                    
                    // For demo purposes, simulate form submission delay
                    // In a real application, this would be handled by the server
                    setTimeout(function() {
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                    }, 2000);
                }
            }
        });
        
        // Enhanced input interaction
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(function(input) {
            // Clear error styling on input
            input.addEventListener('input', function() {
                input.classList.remove('border-red-500');
                
                // Remove error message if it exists
                const errorElement = document.getElementById(`${input.id}-error`);
                if (errorElement) {
                    errorElement.style.opacity = '0';
                    setTimeout(function() {
                        errorElement.remove();
                    }, 300);
                }
            });
            
            // Add focus highlight effect
            input.addEventListener('focus', function() {
                this.parentNode.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentNode.classList.remove('focused');
            });
        });
    }
}

/**
 * Initialize accordion functionality
 */
function initAccordions() {
    const accordionButtons = document.querySelectorAll('.accordion-header');
    
    if (accordionButtons.length > 0) {
        accordionButtons.forEach(function(button) {
            const content = button.nextElementSibling;
            const icon = button.querySelector('svg');
            
            // Set initial state
            content.style.maxHeight = '0';
            content.style.overflow = 'hidden';
            content.style.transition = 'max-height 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)';
            
            button.addEventListener('click', function() {
                const expanded = button.getAttribute('aria-expanded') === 'true';
                
                // Toggle this accordion
                button.setAttribute('aria-expanded', !expanded);
                
                if (expanded) {
                    content.style.maxHeight = '0';
                    if (icon) {
                        icon.style.transform = '';
                    }
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    if (icon) {
                        icon.style.transform = 'rotate(180deg)';
                    }
                }
            });
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Add highlight animation to target
                const highlight = document.createElement('div');
                highlight.className = 'absolute inset-0 bg-primary';
                highlight.style.opacity = '0.1';
                highlight.style.zIndex = '-1';
                highlight.style.animation = 'pulse 2s ease-out';
                
                // Only add if target doesn't already have a highlight
                if (!targetElement.querySelector('.highlight-pulse')) {
                    highlight.classList.add('highlight-pulse');
                    
                    if (targetElement.style.position !== 'absolute' && 
                        targetElement.style.position !== 'fixed') {
                        targetElement.style.position = 'relative';
                    }
                    
                    targetElement.appendChild(highlight);
                    
                    // Remove after animation completes
                    setTimeout(function() {
                        if (targetElement.contains(highlight)) {
                            targetElement.removeChild(highlight);
                        }
                    }, 2000);
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
}
    
/**
 * Initialize sliders and carousels
 */
function initSliders() {
    const sliders = document.querySelectorAll('.slider');
    
    if (sliders.length > 0) {
        sliders.forEach(function(slider) {
            const slides = slider.querySelectorAll('.slide');
            const nextButton = slider.querySelector('.slider-next');
            const prevButton = slider.querySelector('.slider-prev');
            const dotsContainer = slider.querySelector('.slider-dots');
            let currentSlide = 0;
            let autoplayInterval;
            const autoplayDelay = parseInt(slider.getAttribute('data-auto')) || 5000;
            
            if (slides.length > 0) {
                // Create dots if container exists
                if (dotsContainer) {
                    slides.forEach(function(_, index) {
                        const dot = document.createElement('button');
                        dot.className = 'slider-dot';
                        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                        
                        // Style the dots
                        dot.style.width = '12px';
                        dot.style.height = '12px';
                        dot.style.margin = '0 6px';
                        dot.style.borderRadius = '50%';
                        dot.style.backgroundColor = index === 0 ? 'var(--primary)' : '#e5e7eb';
                        dot.style.border = 'none';
                        dot.style.padding = '0';
                        dot.style.cursor = 'pointer';
                        dot.style.transition = 'all 0.3s ease';
                        
                        dot.addEventListener('click', function() {
                            showSlide(index);
                        });
                        
                        dotsContainer.appendChild(dot);
                    });
                }
                
                // Setup slide transition animations
                slides.forEach(function(slide, index) {
                    if (index > 0) {
                        slide.style.opacity = '0';
                        slide.style.position = 'absolute';
                        slide.style.top = '0';
                        slide.style.left = '0';
                        slide.style.width = '100%';
                        slide.style.height = '100%';
                        slide.style.display = 'none';
                    }
                    
                    slide.style.transition = 'opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1)';
                });
                
                // Navigation functions
                const showSlide = function(index) {
                    // Hide current slide
                    slides[currentSlide].style.opacity = '0';
                    
                    // After fade out, hide current and show new
                    setTimeout(function() {
                        slides[currentSlide].style.display = 'none';
                        slides[index].style.display = 'block';
                        
                        // Force a reflow
                        void slides[index].offsetWidth;
                        
                        // Fade in the new slide
                        setTimeout(function() {
                            slides[index].style.opacity = '1';
                        }, 50);
                        
                        // Update current slide index
                        currentSlide = index;
                        
                        // Update dots if they exist
                        if (dotsContainer) {
                            const dots = dotsContainer.querySelectorAll('.slider-dot');
                            dots.forEach(function(dot, i) {
                                if (i === index) {
                                    dot.style.backgroundColor = 'var(--primary)';
                                    dot.style.transform = 'scale(1.2)';
                                } else {
                                    dot.style.backgroundColor = '#e5e7eb';
                                    dot.style.transform = 'scale(1)';
                                }
                            });
                        }
                        
                        // Reset autoplay if enabled
                        if (autoplayInterval) {
                            clearInterval(autoplayInterval);
                            startAutoplay();
                        }
                    }, 800);
                };
                
                const nextSlide = function() {
                    let next = currentSlide + 1;
                    if (next >= slides.length) {
                        next = 0;
                    }
                    showSlide(next);
                };
                
                const prevSlide = function() {
                    let prev = currentSlide - 1;
                    if (prev < 0) {
                        prev = slides.length - 1;
                    }
                    showSlide(prev);
                };
                
                // Setup navigation buttons
                if (nextButton) {
                    nextButton.addEventListener('click', function(e) {
                        e.preventDefault();
                        nextSlide();
                    });
                }
                
                if (prevButton) {
                    prevButton.addEventListener('click', function(e) {
                        e.preventDefault();
                        prevSlide();
                    });
                }
                
                // Setup keyboard navigation
                slider.setAttribute('tabindex', '0');
                slider.addEventListener('keydown', function(e) {
                    if (e.key === 'ArrowRight') {
                        nextSlide();
                    } else if (e.key === 'ArrowLeft') {
                        prevSlide();
                    }
                });
                
                // Setup autoplay
                const startAutoplay = function() {
                    if (autoplayDelay > 0) {
                        autoplayInterval = setInterval(nextSlide, autoplayDelay);
                    }
                };
                
                // Initialize autoplay if data-auto attribute is present
                if (slider.hasAttribute('data-auto')) {
                    startAutoplay();
                    
                    // Pause autoplay on hover
                    slider.addEventListener('mouseenter', function() {
                        clearInterval(autoplayInterval);
                    });
                    
                    slider.addEventListener('mouseleave', function() {
                        startAutoplay();
                    });
                }
                
                // Setup touch navigation
                let touchStartX = 0;
                let touchEndX = 0;
                
                slider.addEventListener('touchstart', function(e) {
                    touchStartX = e.changedTouches[0].screenX;
                }, { passive: true });
                
                slider.addEventListener('touchend', function(e) {
                    touchEndX = e.changedTouches[0].screenX;
                    handleSwipe();
                }, { passive: true });
                
                function handleSwipe() {
                    const swipeThreshold = 50;
                    if (touchEndX < touchStartX - swipeThreshold) {
                        // Swipe left - next slide
                        nextSlide();
                    } else if (touchEndX > touchStartX + swipeThreshold) {
                        // Swipe right - previous slide
                        prevSlide();
                    }
                }
            }
        });
    }
}

/**
 * Initialize animated counters
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter-value');
    
    if (counters.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
                    const formatWithCommas = counter.hasAttribute('data-format-commas');
                    
                    let startTime;
                    let currentValue = 0;
                    
                    function updateCounter(timestamp) {
                        if (!startTime) startTime = timestamp;
                        
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        currentValue = Math.floor(progress * target);
                        
                        // Format the value
                        counter.textContent = formatWithCommas 
                            ? currentValue.toLocaleString()
                            : currentValue;
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            // Ensure final value is exactly the target
                            counter.textContent = formatWithCommas 
                                ? target.toLocaleString()
                                : target;
                        }
                    }
                    
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);
        
        counters.forEach(function(counter) {
            observer.observe(counter);
        });
    }
}
// Enhanced Website Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSearchFeatures();
    initializeProductInteractions();
    initializeResponsiveFeatures();
    initializePerformanceOptimizations();
});

// Navigation Enhancements
function initializeNavigation() {
    // Mobile menu toggle with smooth animation
    const mobileToggle = document.querySelector('.navbar-toggler');
    const mainNav = document.querySelector('#mainNav');
    
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function() {
            mainNav.style.transition = 'transform 0.3s ease-in-out';
            mainNav.classList.toggle('show');
        });
    }

    // Dropdown menus with hover effect on desktop
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        if (window.innerWidth > 992) { // Desktop only
            dropdown.addEventListener('mouseenter', function() {
                this.querySelector('.dropdown-menu').classList.add('show');
            });
            
            dropdown.addEventListener('mouseleave', function() {
                this.querySelector('.dropdown-menu').classList.remove('show');
            });
        }
    });

    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Search Features
function initializeSearchFeatures() {
    const searchForm = document.querySelector('form[role="search"]');
    const searchInput = searchForm?.querySelector('input[type="search"]');
    
    if (searchForm && searchInput) {
        // Add search suggestions
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                // Simulate search suggestions
                if (this.value.length > 2) {
                    showSearchSuggestions(this.value);
                }
            }, 300);
        });

        // Handle search submission
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            performSearch(searchInput.value);
        });
    }
}

// Product Interactions
function initializeProductInteractions() {
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.dataset.productId;
            addToCart(productId);
            showToast('Product added to cart successfully!');
        });
    });

    // Wishlist functionality
    document.querySelectorAll('.add-to-wishlist').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            showToast('Wishlist updated!');
        });
    });

    // Product image zoom on hover
    document.querySelectorAll('.product-img').forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Responsive Features
function initializeResponsiveFeatures() {
    // Lazy loading images
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyLoadScript = document.createElement('script');
        lazyLoadScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lozad.js/1.16.0/lozad.min.js';
        document.head.appendChild(lazyLoadScript);
    }

    // Responsive tables
    document.querySelectorAll('table').forEach(table => {
        if (!table.parentElement.classList.contains('table-responsive')) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('table-responsive');
            table.parentElement.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });
}

// Performance Optimizations
function initializePerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Handle scroll-based animations or loading
            handleScrollEvents();
        }, 150);
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Utility Functions
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.classList.add('toast', `toast-${type}`);
    toast.innerHTML = `
        <div class="toast-body">
            ${message}
        </div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }, 100);
}

function addToCart(productId) {
    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add product to cart
    cart.push({
        id: productId,
        quantity: 1,
        dateAdded: new Date().toISOString()
    });
    
    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart counter
    updateCartCounter();
}

function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const counter = document.querySelector('.cart-counter');
    
    if (counter) {
        counter.textContent = cart.length;
        counter.classList.toggle('d-none', cart.length === 0);
    }
}

function handleScrollEvents() {
    // Back to top button visibility
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }

    // Sticky header
    const header = document.querySelector('.navbar');
    if (header) {
        if (window.pageYOffset > 100) {
            header.classList.add('navbar-sticky');
        } else {
            header.classList.remove('navbar-sticky');
        }
    }
}

// Initialize cart counter on page load
document.addEventListener('DOMContentLoaded', updateCartCounter);

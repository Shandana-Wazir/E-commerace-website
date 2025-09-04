// Navigation and UI Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.navbar-toggler');
    const mainNav = document.querySelector('#mainNav');
    
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function() {
            mainNav.classList.toggle('show');
        });
    }

    // Dropdown menus
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownMenu = this.nextElementSibling;
            // Close other open dropdowns
            dropdowns.forEach(other => {
                if (other !== this) {
                    other.nextElementSibling.classList.remove('show');
                }
            });
            dropdownMenu.classList.toggle('show');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.matches('.dropdown-toggle')) {
            dropdowns.forEach(dropdown => {
                const dropdownMenu = dropdown.nextElementSibling;
                if (dropdownMenu.classList.contains('show')) {
                    dropdownMenu.classList.remove('show');
                }
            });
        }
    });

    // Add hover effects for buttons and links
    const interactiveElements = document.querySelectorAll('.btn, .nav-link, .dropdown-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            if (this.classList.contains('btn-primary')) {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            } else {
                this.style.opacity = '0.8';
            }
        });

        element.addEventListener('mouseleave', function() {
            if (this.classList.contains('btn-primary')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            } else {
                this.style.opacity = '1';
            }
        });
    });
});

// Add accessibility features
document.addEventListener('DOMContentLoaded', function() {
    // Add aria-labels to icons
    const iconButtons = document.querySelectorAll('a > i, button > i');
    iconButtons.forEach(icon => {
        const parent = icon.parentElement;
        if (!parent.getAttribute('aria-label')) {
            const text = parent.textContent.trim();
            if (text) {
                parent.setAttribute('aria-label', text);
            }
        }
    });

    // Add keyboard navigation for dropdowns
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// Main JavaScript for Alex Rivera Portfolio

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeImageLoading();
    initializeProjectFilters();
    initializeMobileMenu();
    initializeSmoothScroll();
});

// Theme Toggle Functionality
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) return;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
    } else {
        // Check system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Image loading optimization
function initializeImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loaded class when image loads
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // If image is already loaded
        if (img.complete) {
            img.classList.add('loaded');
        }
        
        // Lazy loading for images
        if ('loading' in HTMLImageElement.prototype) {
            img.loading = 'lazy';
        }
    });
}

// Project filtering
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-item');
    
    if (!filterButtons.length || !projects.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button styling
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white', 'shadow-lg', 'shadow-primary/20');
                btn.classList.add('text-slate-600', 'dark:text-slate-400');
            });
            this.classList.add('bg-primary', 'text-white', 'shadow-lg', 'shadow-primary/20');
            this.classList.remove('text-slate-600', 'dark:text-slate-400');
            
            const filter = this.dataset.filter;
            
            // Filter projects
            projects.forEach(project => {
                if (filter === 'all' || project.dataset.category === filter) {
                    project.style.display = 'flex';
                    // Add fade-in animation
                    project.style.animation = 'fadeIn 0.5s ease';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
}

// Mobile menu (simplified version - you can expand this)
function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.md\\:hidden');
    const mobileNav = document.querySelector('.hidden.md\\:flex');
    
    if (!mobileMenuButton || !mobileNav) return;
    
    mobileMenuButton.addEventListener('click', function() {
        // This is a placeholder - implement your mobile menu logic
        console.log('Mobile menu clicked - implement your mobile navigation');
    });
}

// Smooth scroll for anchor links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add fade-in animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Form validation (if you add a contact form)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Optional: Add scroll progress indicator
window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // You can add a progress bar element and update its width
    // document.getElementById('progress-bar').style.width = scrolled + '%';
});

// Console welcome message
console.log('%c👋 Welcome to Alex Rivera\'s Portfolio', 'font-size: 16px; color: #3713ec; font-weight: bold;');
console.log('%c🚀 Built with HTML, Tailwind CSS, and JavaScript', 'font-size: 14px; color: #666;');
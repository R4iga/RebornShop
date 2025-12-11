// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX - 20 + 'px';
            cursorFollower.style.top = e.clientY - 20 + 'px';
        }, 100);
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
        cursorFollower.style.transform = 'scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
}

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Product Filter
const filterTabs = document.querySelectorAll('.filter-tab');
const productCards = document.querySelectorAll('.product-card');

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        filterTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        const filter = tab.getAttribute('data-filter');
        
        productCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Cart Functionality
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');
const productBtns = document.querySelectorAll('.product-btn');

productBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        cartCount++;
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        }
        
        // Show notification
        showNotification('Product added to cart!');
        
        // Add animation to cart button
        const cartBtn = document.querySelector('.cart-btn');
        if (cartBtn) {
            cartBtn.style.animation = 'bounce 0.5s ease';
            setTimeout(() => {
                cartBtn.style.animation = '';
            }, 500);
        }
    });
});

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--accent);
        color: var(--primary);
        padding: 1rem 2rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-family: var(--font-mono);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Search Functionality
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const searchModal = document.createElement('div');
        searchModal.className = 'search-modal';
        searchModal.innerHTML = `
            <div class="search-modal-content">
                <div class="search-modal-header">
                    <h3>Search Products</h3>
                    <button class="search-modal-close">&times;</button>
                </div>
                <div class="search-modal-body">
                    <input type="text" placeholder="Search for gift cards, subscriptions, games..." class="search-input">
                    <div class="search-results"></div>
                </div>
            </div>
        `;
        
        searchModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(10, 10, 10, 0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;
        
        document.body.appendChild(searchModal);
        
        // Close modal
        const closeBtn = searchModal.querySelector('.search-modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(searchModal);
        });
        
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                document.body.removeChild(searchModal);
            }
        });
        
        // Focus on search input
        const searchInput = searchModal.querySelector('.search-input');
        searchInput.focus();
        
        // Search functionality
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const results = searchModal.querySelector('.search-results');
            
            if (query.length > 2) {
                const filteredProducts = Array.from(productCards).filter(card => {
                    const title = card.querySelector('.product-title').textContent.toLowerCase();
                    const description = card.querySelector('.product-description').textContent.toLowerCase();
                    return title.includes(query) || description.includes(query);
                });
                
                if (filteredProducts.length > 0) {
                    results.innerHTML = filteredProducts.map(card => {
                        const title = card.querySelector('.product-title').textContent;
                        const description = card.querySelector('.product-description').textContent;
                        const price = card.querySelector('.price').textContent;
                        
                        return `
                            <div class="search-result-item">
                                <h4>${title}</h4>
                                <p>${description}</p>
                                <span class="search-result-price">${price}</span>
                            </div>
                        `;
                    }).join('');
                } else {
                    results.innerHTML = '<p class="no-results">No products found</p>';
                }
            } else {
                results.innerHTML = '';
            }
        });
    });
}

// Contact Form
const contactForm = document.querySelector('.form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Message sent successfully!');
        contactForm.reset();
    });
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card, .feature-card, .about-text, .contact-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Header Scroll Effect
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (nav) {
        if (currentScroll > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.8)';
            nav.style.backdropFilter = 'blur(20px)';
        }
    }
    
    lastScroll = currentScroll;
});

// Product Action Buttons (Like/Save)
const productActions = document.querySelectorAll('.product-action');
productActions.forEach(action => {
    action.addEventListener('click', (e) => {
        e.stopPropagation();
        action.classList.toggle('active');
        
        if (action.classList.contains('active')) {
            action.style.background = 'var(--accent)';
            action.style.color = 'var(--primary)';
            action.style.borderColor = 'var(--accent)';
            showNotification('Added to favorites!');
        } else {
            action.style.background = 'transparent';
            action.style.color = 'var(--text-secondary)';
            action.style.borderColor = 'var(--border)';
        }
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .search-modal-content {
        background: var(--card-bg);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        width: 90%;
        max-width: 600px;
        max-height: 80vh;
        overflow: hidden;
    }
    
    .search-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid var(--border);
    }
    
    .search-modal-header h3 {
        color: var(--text-primary);
        margin: 0;
    }
    
    .search-modal-close {
        background: transparent;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-secondary);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .search-modal-close:hover {
        background: var(--hover-bg);
        color: var(--text-primary);
    }
    
    .search-modal-body {
        padding: 1.5rem;
    }
    
    .search-input {
        width: 100%;
        padding: 1rem;
        background: var(--secondary);
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        color: var(--text-primary);
        font-family: var(--font-primary);
        margin-bottom: 1rem;
        font-size: 1rem;
    }
    
    .search-input:focus {
        outline: none;
        border-color: var(--accent);
    }
    
    .search-input::placeholder {
        color: var(--text-muted);
    }
    
    .search-results {
        max-height: 300px;
        overflow-y: auto;
    }
    
    .search-result-item {
        padding: 1rem;
        background: var(--secondary);
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        margin-bottom: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .search-result-item:hover {
        background: var(--hover-bg);
        border-color: var(--accent);
        transform: translateY(-2px);
    }
    
    .search-result-item h4 {
        color: var(--text-primary);
        margin-bottom: 0.25rem;
    }
    
    .search-result-item p {
        color: var(--text-secondary);
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }
    
    .search-result-price {
        color: var(--accent);
        font-weight: 600;
        font-family: var(--font-mono);
    }
    
    .no-results {
        text-align: center;
        color: var(--text-muted);
        padding: 2rem;
    }
    
    .menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .nav-menu.active {
        display: flex;
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        background: var(--card-bg);
        border: 1px solid var(--border);
        border-radius: 0 0 var(--radius-md) var(--radius-md);
        padding: 2rem;
        flex-direction: column;
        gap: 1rem;
        z-index: 999;
    }
`;
document.head.appendChild(style);

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll event
const debouncedScroll = debounce(() => {
    // Scroll-related functions here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
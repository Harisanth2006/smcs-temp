// Touch detection
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Add overlay div to HTML if it doesn't exist
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('.sidebar-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        
        // Add click event to close sidebar when overlay is clicked
        overlay.addEventListener('click', closeSidebar);
    }
    
    // Add ripple effect to all interactive elements
    const interactiveElements = document.querySelectorAll('.dropdown-btn, .sidebar a, .toggle-btn');
    interactiveElements.forEach(el => {
        el.classList.add('ripple');
    });
    
    // Add active class handling for dropdowns
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.classList.toggle('active');
        });
    });
});

// Toggle sidebar function
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const button = document.getElementById('toggle-btn');
    const overlay = document.querySelector('.sidebar-overlay');
    const mainContent = document.querySelector('.main-content');
    
    // Check if sidebar is currently open
    const isOpen = sidebar.style.left === '0px' || sidebar.style.left === '';
    
    if (isOpen) {
        // Close sidebar
        closeSidebar();
    } else {
        // Open sidebar
        sidebar.style.left = '0px';
        button.classList.add('sidebar-open');
        
        // Update button appearance
        if (button.style.backgroundImage.includes('Arrowright.png')) {
            button.style.backgroundImage = "url('Arrowleft.png')";
        }
        
        // Show overlay on mobile
        if (window.innerWidth < 768) {
            overlay.classList.add('active');
        } else {
            // On desktop, shift the main content
            mainContent.classList.add('shifted');
        }
    }
}

// Close sidebar function (separate for reuse)
function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const button = document.getElementById('toggle-btn');
    const overlay = document.querySelector('.sidebar-overlay');
    const mainContent = document.querySelector('.main-content');
    
    // Reset sidebar position
    if (window.innerWidth < 768) {
        sidebar.style.left = '-100%';
    } else {
        sidebar.style.left = '-280px';
    }
    
    // Reset button
    button.classList.remove('sidebar-open');
    button.style.left = '15px';
    
    if (button.style.backgroundImage.includes('Arrowleft.png')) {
        button.style.backgroundImage = "url('Arrowright.png')";
    }
    
    // Hide overlay
    overlay.classList.remove('active');
    
    // Reset main content
    mainContent.classList.remove('shifted');
}

// Dropdown toggle function with improved touch behavior
function toggleDropdown(id) {
    // Get the clicked dropdown
    const content = document.getElementById(id);
    
    // First close any other open dropdowns if we're opening this one
    if (!content.classList.contains('show')) {
        const allDropdowns = document.querySelectorAll('.dropdown-content.show');
        allDropdowns.forEach(dropdown => {
            if (dropdown.id !== id) {
                dropdown.classList.remove('show');
                // Find parent dropdown and remove active class
                const parentDropdown = dropdown.closest('.dropdown');
                if (parentDropdown) {
                    parentDropdown.classList.remove('active');
                }
                
                // Properly handle animation
                setTimeout(() => dropdown.style.display = 'none', 300);
            }
        });
    }
    
    // Toggle this dropdown
    if (content.classList.contains('show')) {
        content.classList.remove('show');
        content.parentElement.classList.remove('active');
        setTimeout(() => content.style.display = 'none', 300);
    } else {
        content.style.display = 'block';
        content.parentElement.classList.add('active');
        // Small delay to ensure display: block has taken effect
        setTimeout(() => content.classList.add('show'), 10);
    }
}

// Handle window resize events
window.addEventListener('resize', function() {
    // If screen becomes larger and sidebar was hidden because we were on mobile
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    // Hide overlay on resize
    if (overlay.classList.contains('active') && window.innerWidth >= 768) {
        overlay.classList.remove('active');
    }
    
    // Adjust sidebar position if needed when resizing
    if (window.innerWidth < 768 && sidebar.style.left !== '0px' && sidebar.style.left !== '') {
        sidebar.style.left = '-100%';
    } else if (window.innerWidth >= 768 && sidebar.style.left !== '0px' && sidebar.style.left !== '') {
        sidebar.style.left = '-280px';
    }
});

// Add swipe gesture support for touch devices
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
});

function handleSwipeGesture() {
    const sidebar = document.getElementById('sidebar');
    const sidebarOpen = sidebar.style.left === '0px';
    const swipeDistance = touchEndX - touchStartX;
    
    // Right swipe (to open sidebar)
    if (swipeDistance > 70 && !sidebarOpen && touchStartX < 50) {
        toggleSidebar();
    }
    
    // Left swipe (to close sidebar)
    if (swipeDistance < -70 && sidebarOpen) {
        toggleSidebar();
    }
}
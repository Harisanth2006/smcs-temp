function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var button = document.getElementById('toggle-btn');
    if (sidebar.style.left === '-240px' || sidebar.style.left === '') {
        button.style.backgroundImage = "url('Arrowleft.png')";
        sidebar.style.left = '10px';
        button.style.left = '250px';
    } else {
        sidebar.style.left = '-240px';
        button.style.left = '0px';
        button.style.backgroundImage = "url('Arrowright.png')";
    }
}

function toggleDropdown(id) {
    var content = document.getElementById(id);
    if (content.classList.contains('show')) {
        content.classList.remove('show');
        setTimeout(() => content.style.display = 'none', 300);
    } else {
        content.style.display = 'block';
        setTimeout(() => content.classList.add('show'), 10);
    }
}

// Swipe detection for sidebar toggle
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleGesture();
}, false);

function handleGesture() {
    const swipeThreshold = 100; // Minimum swipe distance
    const sidebar = document.getElementById('sidebar');

    if (touchEndX - touchStartX > swipeThreshold && sidebar.style.left === '-240px') {
        // Swipe right to open sidebar
        toggleSidebar();
    } else if (touchStartX - touchEndX > swipeThreshold && sidebar.style.left !== '-240px') {
        // Swipe left to close sidebar
        toggleSidebar();
    }
}

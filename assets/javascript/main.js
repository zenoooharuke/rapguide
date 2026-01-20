document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById("toggle-btn");
    const sidebar = document.getElementById("sidebar");
    // Select all links inside the sidebar
    const menuLinks = document.querySelectorAll(".sidebar-section a");
    const sidebarProfile = document.getElementById("sidebar-profile");
    const signupBtn = document.querySelector(".signup-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const downloadLink = document.getElementById("download-link");
    const signupDropdownBtn = document.getElementById("signup-dropdown-btn");
    const signupDropdownContent = document.getElementById("signup-dropdown-content");

    // Helper function to close the sidebar
    const closeSidebar = () => {
        if (sidebar.classList.contains("active")) {
            sidebar.classList.remove("active");
            toggleBtn.classList.remove("slide");
            toggleBtn.style.left = ""; // Reset to CSS default
            toggleBtn.textContent = "☰"; // Reset icon
        }
    };

    // Toggle Button Logic
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent click from bubbling to document
            const isActive = sidebar.classList.toggle("active");
            toggleBtn.classList.toggle("slide");

            if (isActive) {
                toggleBtn.style.left = `${sidebar.offsetWidth}px`; // Move button to the right dynamically
                toggleBtn.textContent = "✕"; // Change to 'X' for close
            } else {
                toggleBtn.style.left = ""; // Reset to CSS default
                toggleBtn.textContent = "☰"; // Back to hamburger
            }
        });
    }

    // Close sidebar when clicking outside
    document.addEventListener("click", (e) => {
        if (sidebar && sidebar.classList.contains("active")) {
            // If click is outside sidebar and not on the toggle button
            if (!sidebar.contains(e.target) && (toggleBtn && !toggleBtn.contains(e.target))) {
                closeSidebar();
            }
        }
    });

    // Close sidebar when a menu link is clicked
    menuLinks.forEach(link => {
        link.addEventListener("click", closeSidebar);
    });

    // Sidebar Profile Dropdown Logic
    if (sidebarProfile) {
        const profileToggle = sidebarProfile.querySelector('.profile-toggle');
        if (profileToggle) {
            profileToggle.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent bubbling
                sidebarProfile.classList.toggle('active');
            });
        }
    }


      // Check Login State
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userData = JSON.parse(localStorage.getItem('registeredUser'));
    
    if (isLoggedIn) {
        if (signupBtn) signupBtn.style.display = 'none';
        if (sidebarProfile) sidebarProfile.style.display = 'flex';

        // Populate Profile Page Data if elements exist
        const profileName = document.querySelector('.profile-header .box-header');
        const profileEmail = document.querySelector('.profile-header .note-message');
        
        if (userData) {
            if (profileName) profileName.textContent = userData.username;
            if (profileEmail) profileEmail.textContent = userData.email;
        }
    } else {
        if (signupBtn) {
            signupBtn.style.display = 'block';
            if (sidebarProfile) sidebarProfile.style.display = 'none';
        } else {
            // If no signup button exists (e.g., on internal pages), show profile menu for testing
            if (sidebarProfile) sidebarProfile.style.display = 'flex';
        }
    }


    // Logout Logic
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            // Handle redirect based on current location
            if (window.location.pathname.includes('/assets/')) {
                window.location.href = "../index.html";
            } else {
                window.location.href = "index.html";
            }
        });
    }

    // Contact Button
    document.getElementById("contact-btn").addEventListener("click", function (e) {
        e.preventDefault();
        alert("Contact is not available until the app is fully developed.");
    });


    // Download Button Logic
    if (downloadLink) {
        downloadLink.addEventListener("click", (e) => {
            e.preventDefault();
            alert("The app is still under development. It will be released at the end of January.");
        });
    }

    // Sign Up Dropdown Logic
    if (signupDropdownBtn && signupDropdownContent) {
        signupDropdownBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            signupDropdownContent.classList.toggle("show");
        });

        document.addEventListener("click", (e) => {
            if (!signupDropdownBtn.contains(e.target)) {
                signupDropdownContent.classList.remove("show");
            }
        });
    }

    // Dark Mode Logic
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // 1. Check LocalStorage on Load
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light") {
        body.classList.add("light-mode");
        if (darkModeToggle) darkModeToggle.checked = false;
    } else {
        // Default is dark
        if (darkModeToggle) darkModeToggle.checked = true;
    }

    // 2. Handle Toggle Switch
    if (darkModeToggle) {
        darkModeToggle.addEventListener("change", () => {
            if (darkModeToggle.checked) {
                body.classList.remove("light-mode");
                localStorage.setItem("theme", "dark");
            } else {
                body.classList.add("light-mode");
                localStorage.setItem("theme", "light");
            }
        });
    }
});

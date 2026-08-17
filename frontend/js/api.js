// API Configuration
const API_BASE_URL = 'http://localhost:3000/api'; // Change this for production

// Helper for making authenticated requests
async function fetchAPI(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error);
        throw error;
    }
}

// Check if user is logged in
function isLoggedIn() {
    return !!localStorage.getItem('token');
}

// Log out user
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Update UI based on auth state
function updateAuthUI() {
    const loggedInEls = document.querySelectorAll('.auth-logged-in');
    const loggedOutEls = document.querySelectorAll('.auth-logged-out');
    
    if (isLoggedIn()) {
        loggedInEls.forEach(el => el.classList.remove('hidden'));
        loggedOutEls.forEach(el => el.classList.add('hidden'));
        
        const userNameEl = document.getElementById('user-name-display');
        if (userNameEl) {
            const user = JSON.parse(localStorage.getItem('user'));
            userNameEl.textContent = user ? user.name : 'User';
        }
    } else {
        loggedInEls.forEach(el => el.classList.add('hidden'));
        loggedOutEls.forEach(el => el.classList.remove('hidden'));
    }
    
    updateCartCount();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
});

// API Configuration
// Environment-based configuration for different deployments

const API_CONFIG = {
  // Get appropriate URL based on environment
  getURL: function() {
    // Check environment variable first (from Render, Netlify, etc.)
    if (typeof window !== 'undefined' && window.env && window.env.VITE_API_URL) {
      return window.env.VITE_API_URL;
    }
    
    // Check if localStorage has API_URL set
    if (typeof localStorage !== 'undefined' && localStorage.getItem('API_URL')) {
      return localStorage.getItem('API_URL');
    }
    
    // Local development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:3000';
    }
    
    // Production - use current domain (same as where frontend is loaded from)
    // This way, if on hotel-management-system-1-4hut.onrender.com, it connects to same domain
    return window.location.origin;
  },
  
  // Construct full API endpoint
  endpoint: function(path) {
    return this.getURL() + path;
  },
  
  // Get current base URL
  get BASE_URL() {
    return this.getURL();
  }
};

// Make it globally available
window.API_CONFIG = API_CONFIG;
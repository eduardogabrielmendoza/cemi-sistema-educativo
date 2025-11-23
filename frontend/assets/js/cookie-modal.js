(function() {
  const COOKIE_ACCEPTED_KEY = 'cemi_cookies_accepted';
  
  function checkCookieConsent() {
    return localStorage.getItem(COOKIE_ACCEPTED_KEY) === 'true';
  }
  
  function showCookieModal() {
    if (checkCookieConsent()) {
      return;
    }
    
    const overlay = document.getElementById('cookieOverlay');
    if (overlay) {
      overlay.style.display = 'flex';
    }
  }
  
  function acceptCookies() {
    localStorage.setItem(COOKIE_ACCEPTED_KEY, 'true');
    hideCookieModal();
  }
  
  function hideCookieModal() {
    const overlay = document.getElementById('cookieOverlay');
    if (overlay) {
      overlay.classList.add('hide');
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 300);
    }
  }
  
  function goToCookieConfig() {
    window.location.href = 'cookies-config.html';
  }
  
  window.acceptCookies = acceptCookies;
  window.goToCookieConfig = goToCookieConfig;
  
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(showCookieModal, 500);
  });
})();

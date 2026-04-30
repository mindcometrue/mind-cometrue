document.addEventListener('DOMContentLoaded', () => {
  const enterBtn = document.getElementById('enter-btn');
  const landingPage = document.getElementById('landing-page');
  const mainContent = document.getElementById('main-content');

  enterBtn.addEventListener('click', () => {
    // Fade out landing page
    landingPage.style.opacity = '0';
    
    setTimeout(() => {
      landingPage.style.display = 'none';
      mainContent.style.display = 'block';
    }, 800);
  });
});

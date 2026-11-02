document.addEventListener('DOMContentLoaded', () => {
  const loadComponent = async (selector, file) => {
    const target = document.querySelector(selector);
    if (!target) return;

    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error('Failed to load component');
      const html = await response.text();
      target.innerHTML = html;

      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const currentName = currentPage.replace('.html', '');
      const navLinks = document.querySelectorAll('.main-nav a');

      navLinks.forEach((link) => {
        const pageName = link.getAttribute('data-page');
        if (pageName === currentName) {
          link.classList.add('active');
        }
      });
    } catch (error) {
      target.innerHTML = '<p>Component could not be loaded.</p>';
    }
  };

  loadComponent('[data-header]', 'header.html');
  loadComponent('[data-footer]', 'footer.html');
});

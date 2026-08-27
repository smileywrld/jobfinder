// ===============================
// DARK MODE TOGGLE
// ===============================

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  
  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem('theme') || 'light';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme !== 'light' ? savedTheme : (prefersDark ? 'dark' : 'light');
  
  // Apply saved theme
  setTheme(theme);
  
  // Add event listener to toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    setTheme(newTheme);
  });
});

/**
 * Set the theme and update UI
 */
function setTheme(theme) {
  const themeToggle = document.getElementById('themeToggle');
  
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    if (themeToggle) {
      themeToggle.querySelector('.theme-icon').textContent = '☀️';
      themeToggle.setAttribute('aria-pressed', 'true');
    }
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    if (themeToggle) {
      themeToggle.querySelector('.theme-icon').textContent = '🌙';
      themeToggle.setAttribute('aria-pressed', 'false');
    }
  }
}

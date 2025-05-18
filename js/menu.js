const menuBtn = document.getElementById('menuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const floatingMenu = document.getElementById('floatingMenu');

menuBtn.addEventListener('click', () => {
  floatingMenu.classList.remove('hidden');
  setTimeout(() => {
    floatingMenu.classList.add('show');
  }, 10);
});

closeMenuBtn.addEventListener('click', closeMenu);
document.addEventListener('click', (event) => {
  const clickedInsideMenu = floatingMenu.contains(event.target);
  const clickedMenuBtn = menuBtn.contains(event.target);
  const isMenuVisible = floatingMenu.classList.contains('show');

  if (!clickedInsideMenu && !clickedMenuBtn && isMenuVisible) {
    closeMenu();
  }
});

function closeMenu() {
  floatingMenu.classList.remove('show');
  setTimeout(() => {
    floatingMenu.classList.add('hidden');
  }, 300); 
}

document.getElementById('menuBtn').addEventListener('click', () => {
  const menu = document.getElementById('floatingMenu');
  menu.classList.remove('hidden');
  setTimeout(() => {
    menu.classList.add('show');
  }, 10);
});

document.getElementById('closeMenuBtn').addEventListener('click', () => {
  const menu = document.getElementById('floatingMenu');
  menu.classList.remove('show');
  setTimeout(() => {
    menu.classList.add('hidden');
  }, 300);
});

let menuToggler = document.querySelector('.main-nav__toggle');
let mainMenu = document.querySelector('.main-nav__list');
menuToggler.classList.remove('main-nav__toggle--hidden');
mainMenu.classList.add('main-nav__list--close');

menuToggler.addEventListener('click', menuToggle);

function menuToggle() {
    mainMenu.classList.toggle('main-nav__list--close');
}

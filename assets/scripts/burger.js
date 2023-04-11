const burgerIcon = document.querySelector('.burger-icon');
const navMenu = document.querySelector('.nav-menu');

burgerIcon.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
});

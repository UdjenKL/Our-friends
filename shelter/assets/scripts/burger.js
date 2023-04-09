// const burgerIcon = document.querySelector('.burger-icon');
// const navMenu = document.querySelector('.nav-menu');
//
// burgerIcon.addEventListener('click', function() {
//     this.classList.toggle('active');
//     navMenu.classList.toggle('active');
// });
//


const burgerIcon = document.querySelector('.burger-icon');
const navMenu = document.querySelector('.nav-menu');

burgerIcon.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open'); // добавляем класс к body
});

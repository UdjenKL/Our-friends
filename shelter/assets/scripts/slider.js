// Выбираем элемент контейнера для карточек
const cardContainer = document.querySelector(".pets__slider");
console.log(cardContainer);

let currentIndex = 0;
let pets = null;
let displayedPets = []; // массив, в котором будут храниться уже отображенные объекты

// Загружаем содержимое pets.json
fetch("assets/img/images/pets.json")
    .then(response => response.json())
    .then(data => {
        pets = data;
        showPet(currentIndex);// Показываем первую карточку животного
        console.log(pets);
    })
    .catch(error => console.error(error));

function showPet(index) {
    let randomIndex = index;
    // Генерируем случайный индекс, пока не найдем уникальный объект
    while (displayedPets.includes(pets[randomIndex])) {
        randomIndex = Math.floor(Math.random() * pets.length);
    }
    displayedPets.push(pets[randomIndex]); // добавляем объект в массив отображенных
    if (displayedPets.length > 3) {
        displayedPets.shift(); // удаляем первый элемент, если в массиве больше трех
    }


    const pet = pets[randomIndex];


    const cardHTML = `
        <button class="button-arrow button-arrow__left">
            <img src="assets/img/images/ArrowLeft.png" alt="#" class="button-arrow__img">
        </button>
        <div class="card">
            <img src="${pet.img}" alt="${pet.name}">
            <h3>${pet.name}</h3>
            <button class="card__button">Learn more</button>
        </div>
        <div class="card">
            <img src="${pets[(randomIndex + 1) % pets.length].img}" alt="${pets[(randomIndex + 1) % pets.length].name}">
            <h3>${pets[(randomIndex + 1) % pets.length].name}</h3>
            <button class="card__button">Learn more</button>
        </div>
        <div class="card">
            <img src="${pets[(randomIndex + 2) % pets.length].img}" alt="${pets[(randomIndex + 2) % pets.length].name}">
            <h3>${pets[(randomIndex + 2) % pets.length].name}</h3>
            <button class="card__button">Learn more</button>
        </div>
        <button class="button-arrow button-arrow__right">
            <img src="assets/img/images/ArrowRight.png" alt="#" class="button-arrow__img">
        </button>
    `;

    // Установка html кода для pets__slider!
    cardContainer.innerHTML = cardHTML;

    // Добавляем обработчики событий для кнопок влево и вправо
    const buttonLeft = document.querySelector('.button-arrow__left');
    const buttonRight = document.querySelector('.button-arrow__right');

    buttonLeft.addEventListener('click', showPrevPet);
    buttonRight.addEventListener('click', showNextPet);
}


// функция уменьшает текущий индекс на 1 , если индекс < 0 , то он устанавливается на последний индекс в массиве
function showPrevPet() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = pets.length - 1;
    }
    showPet(currentIndex);
}

// функция увеличивает текущий индекс на 1 , если индекс > pets.length - 1 , то он устанавливается на 0 чтобы перейти к первой карточке.
function showNextPet() {
    currentIndex++;
    if (currentIndex > pets.length - 1) {
        currentIndex = 0;
    }
    showPet(currentIndex);
}

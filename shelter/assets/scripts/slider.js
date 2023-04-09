const petButtons = document.querySelectorAll('.card__button');

// Выбираем элемент контейнера для карточек
const cardContainer = document.querySelector(".pets__slider");

let currentIndex = 0;
let pets = null;
let displayedPets = []; // массив, в котором будут храниться уже отображенные объекты

// Загружаем содержимое pets.json
fetch("assets/img/images/pets.json")
    .then(response => response.json())
    .then(data => {
        pets = data;
        showPet(currentIndex);// Показываем первую карточку животного
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

    // Добавляем обработчики событий для кнопок "Learn more" в каждой карточке
    const buttons = document.querySelectorAll('.card__button');
    buttons.forEach((button, index) => button.addEventListener('click', (event) => showPetModal(event, pets[index])));


    function showPetModal(event, pet) {
        // Получаем контент, который нужно отобразить в попапе
        const popupContent = `
          <img src="${pet.img}" alt="${pet.name}">
          <div class="main-content">
           <h3>${pet.name}</h3>
           <div class="breed">
           <h4>${pet.type} - </h4>
           <h4>${pet.breed}</h4>
           </div>
          <p><h5>${pet.description}</h5></p>
          <div class="list">
          <ul>
          <li>${pet.age}</li>
          <li>${pet.inoculations}</li>
          <li>${pet.diseases}</li>
          <li>${pet.parasites}</li>
          </ul>
          </div>
          <button class="popup__close">x</button>
          </div>
        `;


        // Добавляем html-код попапа в конец body-элемента
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `
          <div class="popup__content">
            ${popupContent}

          </div>
        `;
        document.body.appendChild(popup);

        // Находим кнопку закрытия попапа и добавляем обработчик события
        const popupCloseButton = popup.querySelector('.popup__close');
        popupCloseButton.addEventListener('click', hidePopup);

        // Показываем попап
        popup.style.display = 'block';

        // Функция для скрытия попапа
        function hidePopup() {
            popup.style.display = 'none';
            popupCloseButton.removeEventListener('click', hidePopup);
            popup.remove();
        }
    }

}





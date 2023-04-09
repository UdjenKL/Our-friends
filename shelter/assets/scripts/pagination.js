const cardContainer = document.getElementById('pets-cards-container');
const cards = [...cardContainer.querySelectorAll('.card')];
const cardCount = cards.length;
const cardsPerPage = 4;
const pageCount = Math.ceil(cardCount / cardsPerPage);
let currentPage = 1;

function showCards() {
    // Получаем индексы всех карточек
    const indices = cards.map((card, index) => index);

    // Перемешиваем индексы
    indices.sort(() => Math.random() - 0.5);

    // Удаляем все карточки из контейнера
    cardContainer.innerHTML = '';

    // Создаем новый массив карточек в случайном порядке
    const shuffledCards = indices.map(index => cards[index]);

    // Определяем индексы карточек для текущей страницы
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const cardsToShow = shuffledCards.slice(startIndex, endIndex);

    // Добавляем отображение каждой карточки на странице
    cardsToShow.forEach((card) => {
        cardContainer.appendChild(card);
    });
}

// initialize the cards and pagination buttons
showCards();
document.getElementById('paginator-current').textContent = currentPage;

// add click event listeners to pagination buttons
document.getElementById('paginator-first').addEventListener('click', () => {
    if (currentPage !== 1) {
        currentPage = 1;
        showCards();
        document.getElementById('paginator-current').textContent = currentPage;
    }
});

document.getElementById('paginator-prev').addEventListener('click', () => {
    if (currentPage !== 1) {
        currentPage -= 1;
        showCards();
        document.getElementById('paginator-current').textContent = currentPage;
    }
});

document.getElementById('paginator-next').addEventListener('click', () => {
    if (currentPage !== pageCount) {
        currentPage += 1;
        showCards();
        document.getElementById('paginator-current').textContent = currentPage;
    }
});

document.getElementById('paginator-last').addEventListener('click', () => {
    if (currentPage !== pageCount) {
        currentPage = pageCount;
        showCards();
        document.getElementById('paginator-current').textContent = currentPage;
    }
});

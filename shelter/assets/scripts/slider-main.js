

fetch("assets/img/images/pets.json")
    .then(response => response.json())
    .then(data => {
        const sliderContainer = document.querySelector("#slider-container");
        const leftButton = document.querySelector("#slider-left-button");
        const rightButton = document.querySelector("#slider-right-button");
        let currentSlide = 0;

        // функция для создания карточки животного
        function createPetCard(pet) {
            const card = document.createElement("div");
            card.classList.add("card");

            const img = document.createElement("img");
            img.classList.add("card__img");
            img.src = `${pet.img}`;
            img.alt = pet.name;
            card.appendChild(img);

            const name = document.createElement("h3");
            name.textContent = pet.name;
            card.appendChild(name);

            const button = document.createElement("button");
            button.classList.add("card__button");
            button.textContent = "Learn more";


            button.addEventListener("click", () => showPetModal(pet));

            card.appendChild(button);

            return card;
        }


        function changeSlide(direction) {
            if (direction === "left") {
                currentSlide--;
                if (currentSlide < 0) {
                    currentSlide = data.length - 1;
                }
            } else {
                currentSlide++;
                if (currentSlide >= data.length) {
                    currentSlide = 0;
                }
            }

            const prevCard = sliderContainer.querySelector(".card:nth-child(1)");
            const currentCard = sliderContainer.querySelector(".card:nth-child(2)");
            const nextCard = sliderContainer.querySelector(".card:nth-child(3)");

            prevCard.replaceWith(createPetCard(data[(currentSlide - 1 + data.length) % data.length]));
            currentCard.replaceWith(createPetCard(data[currentSlide]));
            nextCard.replaceWith(createPetCard(data[(currentSlide + 1) % data.length]));
        }

        // добавляем первую карточку в слайдер
        sliderContainer.appendChild(createPetCard(data[0]));
        sliderContainer.appendChild(createPetCard(data[1]));
        sliderContainer.appendChild(createPetCard(data[2]));

        // добавляем обработчики событий для кнопок переключения слайдов
        leftButton.addEventListener("click", () => changeSlide("left"));
        rightButton.addEventListener("click", () => changeSlide("right"));
    })
    .catch(error => console.error(error));

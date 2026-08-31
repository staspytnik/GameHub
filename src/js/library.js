import {openModal} from "./components/modal.js";
import modalTemplate from './templates/library-modal.hbs?raw'
import {getGamesData} from "./services/firebase-db.js";
import placehplderImage from '../../public/images/card-image-placeholder.png'

const libraryAddGameButton = document.querySelector('.library__button')

const libraryGamesList = document.querySelector('.library-games-list');

const init = () => {
    libraryAddGameButton.addEventListener('click', () => {
        openModal(modalTemplate)
    })
}

const renderGames = (data) => {
    data.map(game => {
        const cardElement = document.createElement('article')
        cardElement.classList.add('game-card')
        cardElement.innerHTML = `
            <div class="game-card__cover">
                <img
                  src="${placehplderImage}"
                  alt="game cover"
                />
              </div>
            
              <div class="game-card__content">
                <div class="game-card__top">
                  <h3 class="game-card__title">${game.name}</h3>
            
                  <span class="game-card__status status--want-to-play">
                    ${game.status}
                  </span>
                </div>
            
                <div class="game-card__meta">
                  <span class="game-card__genre">${game.genre}</span>
                  <span class="game-card__separator">•</span>
                  <span class="game-card__year">${game.year}</span>
                </div>
            </div>
        `
        libraryGamesList.appendChild(cardElement)
    })

}

document.addEventListener('DOMContentLoaded', () => {
    getGamesData().then(data => {
        console.log(Object.values(data))
        renderGames(Object.values(data))
    });
})

init()
import {openModal} from "./components/modal.js";
import modalTemplate from './templates/library-modal.hbs?raw'
import {getGamesData} from "./services/firebase-db.js";
import placeholderImage from '../../public/images/card-image-placeholder.png'
import gameCardTemplate from './templates/library-card.hbs?raw';
import Handlebars from "handlebars";

const libraryAddGameButton = document.querySelector('.library__button')

const libraryGamesList = document.querySelector('.library-games-list');
const emptyStateElement = document.querySelector('.library-empty');

const template = Handlebars.compile(gameCardTemplate);
Handlebars.registerHelper('eq', (a, b) => a === b);

const init = () => {
    libraryAddGameButton.addEventListener('click', () => {
        openModal(modalTemplate)
    })
}

const renderGames = (data) => {
    data ? libraryGamesList.innerHTML = template({
        games: Object.values(data),
        placeholderImage: placeholderImage,
    })
    : emptyStateElement.classList.add('library-empty--active')
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const gameData = await getGamesData();
        renderGames(gameData);
    } catch (error) {
        console.error(error);
    }
})

init()
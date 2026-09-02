import {openModal} from "./components/modal.js";
import modalTemplate from './templates/library-modal.hbs?raw'
import {getGamesData} from "./services/firebase-db.js";
import placeholderImage from '/images/card-image-placeholder.png'
import gameCardTemplate from './templates/library-card.hbs?raw';
import Handlebars from "handlebars";

const libraryAddGameButton = document.querySelector('.library__button')

const libraryGamesList = document.querySelector('.library-games-list');
const emptyStateElement = document.querySelector('.library-empty');

const template = Handlebars.compile(gameCardTemplate);
Handlebars.registerHelper('eq', (a, b) => a === b);

Handlebars.registerHelper('formatStatus', status => {
    return status
        .replace(/-/g, ' ')
        .replace(/^./, char => char.toUpperCase());
});

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
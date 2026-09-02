import {openModal} from "./components/modal.js";
import modalTemplate from './templates/library-modal.hbs?raw'
import {getGamesData} from "./services/firebase-db.js";
import placeholderImage from '/images/card-image-placeholder.png'
import gameCardTemplate from './templates/library-card.hbs?raw';
import Handlebars from "handlebars";

const libraryAddGameButton = document.querySelector('.library__button')

const libraryGamesList = document.querySelector('.library-games-list');
const emptyStateElement = document.querySelector('.library-empty');

const totalGames = document.querySelector('[data-status="total"]');
const playingGames = document.querySelector('[data-status="playing"]');
const completedGames = document.querySelector('[data-status="completed"]');
const wantToPlayGames = document.querySelector('[data-status="want-to-play"]');

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

const statusCounts = (data) => {
    const counts = {
        'want-to-play': 0,
        playing: 0,
        completed: 0,
    };

    let totalCounts;

    if (data) {
        Object.values(data).forEach(game => {counts[game.status]++});
    }

    totalCounts = counts;

    totalGames.textContent = String(data ? Object.values(data).length : 0)
    playingGames.textContent = totalCounts.playing
    completedGames.textContent = totalCounts.completed
    wantToPlayGames.textContent = totalCounts['want-to-play']
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
        statusCounts(gameData);
    } catch (error) {
        console.error(error);
    }
})

init()
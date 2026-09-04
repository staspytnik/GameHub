import gameCardTemplate from "../templates/library-card.hbs?raw";
import placeholderImage from '/images/card-image-placeholder.png'
import Handlebars from "handlebars";

export let cards = {}

const template = Handlebars.compile(gameCardTemplate);
Handlebars.registerHelper('eq', (a, b) => a === b);

Handlebars.registerHelper('formatStatus', status => {
    return status
        .replace(/-/g, ' ')
        .replace(/^./, char => char.toUpperCase());
});

const totalGames = document.querySelector('[data-status="total"]');
const playingGames = document.querySelector('[data-status="playing"]');
const completedGames = document.querySelector('[data-status="completed"]');
const wantToPlayGames = document.querySelector('[data-status="want-to-play"]');

const libraryGamesList = document.querySelector('.library-games-list');
const emptyStateElement = document.querySelector('.library-empty');

export function addAllCards(dataCards) {
    cards = {
        ...cards,
        ...dataCards
    }
    renderGames(cards);
    statusCounts(cards);
}
export function addCard(cardData) {
    cards = {
        ...cards,
        [crypto?.randomUUID() ?? Date.now()]: cardData
    };

    renderGames(cards);
    statusCounts(cards);
}

export const renderGames = (data) => {
    data ? libraryGamesList.innerHTML = template({
            games: Object.values(data),
            placeholderImage: placeholderImage,
        })
        : emptyStateElement.classList.add('library-empty--active')
}

export const statusCounts = (data) => {
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
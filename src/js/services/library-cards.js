import gameCardTemplate from "../templates/library-card.hbs?raw";
import Handlebars from "handlebars";

const placeholderImage = `${import.meta.env.BASE_URL}images/card-image-placeholder.png`;

export let cards = {}

const template = Handlebars.compile(gameCardTemplate);
Handlebars.registerHelper('eq', (a, b) => a === b);

Handlebars.registerHelper('formatStatus', status => {
    return String(status ?? 'want-to-play')
        .replace(/-/g, ' ')
        .replace(/^./, char => char.toUpperCase());
});

const totalGames = document.querySelector('[data-status="total"]');
const playingGames = document.querySelector('[data-status="playing"]');
const completedGames = document.querySelector('[data-status="completed"]');
const wantToPlayGames = document.querySelector('[data-status="want-to-play"]');

const libraryGamesList = document.querySelector('.library-games-list');
const emptyStateElement = document.querySelector('.library-empty');

function toGameEntries(dataCards) {
    if (!dataCards) {
        return [];
    }

    if (Array.isArray(dataCards)) {
        return dataCards.map((game, index) => [game?.id ?? index, game]);
    }

    if (typeof dataCards === 'object') {
        return Object.entries(dataCards);
    }

    return [];
}

function getGenre(game) {
    if (game.genre) {
        return game.genre;
    }

    if (Array.isArray(game.genres) && game.genres.length) {
        return game.genres.map(genre => genre.name).filter(Boolean).join(', ');
    }

    return 'Unknown';
}

function normalizeGame(game, fallbackId) {
    return {
        id: game.id ?? fallbackId,
        name: game.name,
        genre: getGenre(game),
        year: game.year ?? game.released?.slice(0, 4) ?? 'Unknown',
        status: game.status ?? 'want-to-play',
        image: game.background_image ?? game.image ?? placeholderImage,
        rating: game.rating ?? '',
    };
}

function toGamesList(data) {
    if (!data) {
        return [];
    }

    return Array.isArray(data) ? data : Object.values(data);
}

export function addAllCards(dataCards) {
    const normalizedGames = {};

    toGameEntries(dataCards).forEach(([id, game]) => {
        if (!game || typeof game !== 'object' || !game.name) {
            return;
        }

        const key = String(game.id ?? id);
        normalizedGames[key] = normalizeGame(game, key);
    });

    cards = {
        ...cards,
        ...normalizedGames,
    };

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
    const games = toGamesList(data);

    if (!games.length) {
        libraryGamesList.innerHTML = '';
        emptyStateElement?.classList.add('library-empty--active');
        if (emptyStateElement) {
            libraryGamesList.append(emptyStateElement);
        }
        return;
    }

    emptyStateElement?.classList.remove('library-empty--active');

    libraryGamesList.innerHTML = template({
        games,
    });
};

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
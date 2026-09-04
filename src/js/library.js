import {openModal} from "./components/modal.js";
import modalTemplate from './templates/library-modal.hbs?raw'
import {getGamesData} from "./services/firebase-db.js";
import {addAllCards, addCard, cards, renderGames, statusCounts} from "./services/library-cards.js";

const libraryAddGameButton = document.querySelector('.library__button')

const libraryFilters = document.querySelector('.library-filters');

const init = () => {
    libraryAddGameButton.addEventListener('click', () => {
        openModal(modalTemplate)
    })
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const fetchCards = await getGamesData()
        addAllCards(fetchCards)
    } catch (error) {
        console.error(error);
    }
})

const switchTab = (event) => {
    const tabButton = event.target.closest('.library-filters__item')

    document.querySelector('.library-filters__item--active').classList.remove('library-filters__item--active')

    if (tabButton) {
        if (!tabButton.classList.contains('library-filters__item--active')) {
            tabButton.classList.add('library-filters__item--active')
        }
        const filteredCards = Object.fromEntries(
            Object.entries(cards).filter(([id, game]) => {
                if (tabButton.dataset.tab === 'all') {
                    return cards
                } else {
                    return game.status === tabButton.dataset.tab
                }
            })
        );

        renderGames(filteredCards);
    }
}

libraryFilters.addEventListener('click', switchTab);

init()
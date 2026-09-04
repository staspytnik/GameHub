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

    if (tabButton) {
        console.log(Object.values(cards))
    }
}

libraryFilters.addEventListener('click', switchTab);

init()
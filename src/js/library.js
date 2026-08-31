import {openModal} from "./components/modal.js";
import modalTemplate from './templates/library-modal.hbs?raw'
import {getGamesData} from "./services/firebase-db.js";

const libraryAddGameButton = document.querySelector('.library__button')

const init = () => {
    libraryAddGameButton.addEventListener('click', () => {
        openModal(modalTemplate)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    getGamesData().then(data => console.log(data));
})

init()
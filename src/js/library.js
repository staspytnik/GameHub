import {openModal} from "./components/modal.js";
import modalTemplate from './templates/library-modal.hbs?raw'

const libraryAddGameButton = document.querySelector('.library__button')

const init = () => {
    libraryAddGameButton.addEventListener('click', () => {
        openModal(modalTemplate)
    })
}

init()
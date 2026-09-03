// Modal component: open/close a dialog overlay.
// Full modal UI/content is implemented in a later task.

import {FormValidator} from "../services/validation.js";

/**
 * Open the modal with the given content.
 * @param {string} html
 */

const modalDataAttribute = 'data-modal'
const modalCloseDataAttr = '[data-modal-close]'

const modalOverlay = document.createElement('div')
modalOverlay.classList.add('modal-overlay')

let modalForm;

function closeOnEscape(event) {
    if (event.key === 'Escape') {
        closeModal()
    }
}

export function openModal(html) {
  // TODO: implement modal rendering and open state.
    if (!modalOverlay.hasAttribute(modalDataAttribute)) {
        const modalWindow = document.createElement('div')

        modalWindow.classList.add('modal-window')
        modalOverlay.setAttribute(modalDataAttribute, '')

        modalWindow.innerHTML = html

        modalOverlay.appendChild(modalWindow)
        document.body.appendChild(modalOverlay)

        modalOverlay.addEventListener('click', (event) => {
            if (event.target.closest(modalCloseDataAttr) || event.target.matches('.modal-overlay')) {
                closeModal()
            }
        })
        document.addEventListener('keydown', closeOnEscape)

        modalForm = modalWindow.querySelector('[data-modal-form]')

        if (modalForm) {
            new FormValidator(modalForm)
        }

        requestAnimationFrame(() => {
            modalOverlay.classList.add('modal-overlay--active')
        })
    }
}

/**
 * Close the currently open modal.
 */
export function closeModal() {
  // TODO: implement modal close/cleanup.
    modalOverlay.removeEventListener('click', closeModal)
    modalOverlay.classList.remove('modal-overlay--active')
    document.removeEventListener('keydown', closeOnEscape)

    setTimeout(() => {
        modalOverlay.innerHTML = ''
        modalOverlay.removeAttribute(modalDataAttribute)
        modalOverlay.remove()
    }, 400)
}

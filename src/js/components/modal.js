// Modal component: open/close a dialog overlay.
// Full modal UI/content is implemented in a later task.

/**
 * Open the modal with the given content.
 * @param {string} html
 */
const modalDataAttribute = 'data-modal'
const modalCloseDataAttr = '[data-modal-close]'

const modalOverlay = document.createElement('div')
modalOverlay.classList.add('modal-overlay')

let modalClose;

export function openModal(html) {
  // TODO: implement modal rendering and open state.
    if (!modalOverlay.hasAttribute(modalDataAttribute)) {
        const modalWindow = document.createElement('div')

        modalWindow.classList.add('modal-window')
        modalOverlay.setAttribute(modalDataAttribute, '')

        modalWindow.innerHTML = html

        modalOverlay.appendChild(modalWindow)
        document.body.appendChild(modalOverlay)

        modalClose = modalWindow.querySelector(modalCloseDataAttr)

        modalClose.addEventListener('click', closeModal)
    }
}

/**
 * Close the currently open modal.
 */
export function closeModal() {
  // TODO: implement modal close/cleanup.
    modalClose.removeEventListener('click', closeModal)
    modalClose = null;
    modalOverlay.innerHTML = ''
    modalOverlay.removeAttribute(modalDataAttribute)
    modalOverlay.remove()
}

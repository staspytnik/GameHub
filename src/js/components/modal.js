// Modal component: open/close a dialog overlay.
// Full modal UI/content is implemented in a later task.

/**
 * Open the modal with the given content.
 * @param {string} html
 */
const modalDataAtribute = 'data-modal'
const modalOverlay = document.createElement('div')
modalOverlay.classList.add('modal-overlay')

export function openModal(html) {
  // TODO: implement modal rendering and open state.
    if (!modalOverlay.hasAttribute(modalDataAtribute)) {
        const modalWindow = document.createElement('div')

        modalWindow.classList.add('modal-window')
        modalOverlay.setAttribute(modalDataAtribute, '')

        modalWindow.innerHTML = html

        modalOverlay.appendChild(modalWindow)
        document.body.appendChild(modalOverlay)
    }
}

/**
 * Close the currently open modal.
 */
export function closeModal() {
  // TODO: implement modal close/cleanup.
    modalOverlay.innerHTML = ''
    modalOverlay.removeAttribute(modalDataAtribute)
    modalOverlay.remove()
}

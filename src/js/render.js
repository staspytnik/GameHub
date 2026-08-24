// Rendering helpers responsible for putting markup into the DOM.
// Actual view rendering (game grid, cards, etc.) is implemented in later tasks.

/**
 * Render an HTML string into a target container.
 * @param {HTMLElement} target
 * @param {string} html
 */
export function render(target, html) {
  if (!target) return;
  target.innerHTML = html;
}

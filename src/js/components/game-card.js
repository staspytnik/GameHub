// Game card component: renders a single game as an HTML card.
// Full markup/data mapping is implemented in a later task.

import { renderTemplate } from '../templates/compile-template.js';

/**
 * Build a game card's HTML markup from game data.
 * @param {Object} game
 * @returns {string}
 */
export function createGameCard(game) {
  return renderTemplate('gameCard', game);
}

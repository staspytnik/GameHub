// Game card component: renders a single game as an HTML card.
// Full markup/data mapping is implemented in a later task.

import { renderTemplate } from "../templates/compile-template.js";
import { fetchGames } from "../api/games-api.js";
import { refs } from "../refs.js";

/**
 * Build a game card's HTML markup from game data.
 * @param {Object} game
 * @returns {string}
 */
export function createGameCard(game) {
  return renderTemplate("heroCard", game);
}

const games = await fetchGames();
const randomGames = games
  .sort(() => {
    return Math.random() - 0.5;
  })
  .slice(0, 4);

console.log(games);

const gameCards = randomGames.map((game) => {
  return createGameCard(game);
});

refs.heroList.innerHTML = gameCards.join("");

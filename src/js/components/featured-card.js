// Game card component: renders a single game as an HTML card.
// Full markup/data mapping is implemented in a later task.
import Handlebars from "handlebars";
import { renderTemplate } from "../templates/compile-template.js";
import { fetchGames, fetchGameById } from "../api/games-api.js";
import { refs } from "../refs.js";

Handlebars.registerHelper("year", function (date) {
  return date ? date.substring(0, 4) : "";
});

/**
 * Build a game card's HTML markup from game data.
 * @param {Object} game
 * @returns {string}
 */
export function createGameCard(game) {
  return renderTemplate("featuredCard", game);
}

if (refs.featuredList) {
  const randomGame = await fetchGameById(Math.floor(Math.random() * 100) + 1);
  const gameCard = createGameCard(randomGame);

  refs.featuredList.innerHTML = gameCard;

  const addToLibraryButton = document.querySelector(".featured__button");

  addToLibraryButton?.addEventListener("click", () => {
    const library = JSON.parse(localStorage.getItem("library")) || [];

    const isGameInLibrary = library.some((game) => game.id === randomGame.id);

    if (isGameInLibrary) {
      addToLibraryButton.textContent = "In Library";
      return;
    }

    library.push(randomGame);

    localStorage.setItem("library", JSON.stringify(library));

    addToLibraryButton.textContent = "In Library";
  });
}

import { renderTemplate } from "../templates/compile-template.js";
import { fetchRandomGame, fetchGameById } from "../api/games-api.js";
import { refs } from "../refs.js";

export function createGameCard(game) {
  return renderTemplate("surpriseCard", game);
}

async function handleSurpriseClick() {
  refs.surpriseBtn.disabled = true;
  refs.featuredList.innerHTML = `<p class="suprise-status">Searching game...</p>`;

  try {
    const randomGame = await fetchRandomGame();
    const gameDetails = await fetchGameById(randomGame.id);
    refs.featuredList.innerHTML = createGameCard(gameDetails);
  } catch (error) {
    console.error(error);
    refs.featuredList.innerHTML =
      `<p class="suprise-status suprise-status--error">Failed to load game. Please try again.</p>`;
  } finally {
    refs.surpriseBtn.disabled = false;
  }
}

export function initSuprise() {
  refs.surpriseBtn?.addEventListener("click", handleSurpriseClick);
}
import { renderTemplate } from "../templates/compile-template.js";
import { fetchRandomGame, fetchGameById } from "../api/games-api.js";
import { refs } from "../refs.js";

export function createGameCard(game) {
  return renderTemplate("surpriseCard", game);
}

async function handleSurpriseClick() {
  const { surpriseBtn, surpriseResult } = refs;
  if (!surpriseBtn || !surpriseResult) return;

  const surpriseSection = surpriseBtn.closest('.surprise');

  surpriseBtn.disabled = true;
  surpriseResult.innerHTML = `<p class="suprise-status">Searching game...</p>`;

  try {
    const randomGame = await fetchRandomGame();
    const gameDetails = await fetchGameById(randomGame.id);
    surpriseResult.innerHTML = createGameCard(gameDetails);
    surpriseSection?.classList.add('surprise--has-game');
  } catch (error) {
    console.error(error);
    surpriseSection?.classList.remove('surprise--has-game');
    surpriseResult.innerHTML =
      `<p class="suprise-status suprise-status--error">Failed to load game. Please try again.</p>`;
  } finally {
    surpriseBtn.disabled = false;
  }
}

export function initSuprise() {
  refs.surpriseBtn?.addEventListener("click", handleSurpriseClick);
}
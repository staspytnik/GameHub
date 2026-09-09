import { renderTemplate } from "../templates/compile-template.js";
import { fetchRandomGame, fetchGameById } from "../api/games-api.js";
import { refs } from "../refs.js";

function mapGameToCardModel(game) {
  return {
    id: game.id,
    image: game.background_image || "",
    name: game.name,
    genre: game.genres?.map((g) => g.name).join(", ") || "—",
    rating: game.rating ?? "—",
    released: game.released || "—",
  };
}

export function createGameCard(game) {
  return renderTemplate("surpriseCard", mapGameToCardModel(game)); // ключ из compile-template.js
}

async function handleSurpriseClick() {
  refs.surpriseBtn.disabled = true;
  refs.featuredList.innerHTML = `<p class="suprise-status">Ищем игру…</p>`;

  try {
    const randomGame = await fetchRandomGame();
    const gameDetails = await fetchGameById(randomGame.id);
    refs.featuredList.innerHTML = createGameCard(gameDetails);
  } catch (error) {
    console.error(error);
    refs.featuredList.innerHTML =
      `<p class="suprise-status suprise-status--error">Не получилось загрузить игру. Попробуй ещё раз.</p>`;
  } finally {
    refs.surpriseBtn.disabled = false;
  }
}

export function initSuprise() {
  refs.surpriseBtn?.addEventListener("click", handleSurpriseClick);
}
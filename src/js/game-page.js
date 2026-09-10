import { fetchGameById, fetchGameScreenshots } from "./api/games-api.js";
import { addToLibrary, isInLibrary } from "./services/storage.js";
import { renderTemplate } from "./templates/compile-template.js";

async function initGamePage() {
  const status = document.querySelector("[data-game-status]");
  const content = document.querySelector("[data-game-content]");
  const gameId = new URLSearchParams(window.location.search).get("id");

  if (!gameId) {
    if (status) status.textContent = "Game not found. Open a game card first.";
    return;
  }

  try {
    const [game, screenshots] = await Promise.all([
      fetchGameById(gameId),
      fetchGameScreenshots(gameId),
    ]);

    if (!game?.id) throw new Error("Game not found");

    const genres = [...new Set((game.genres ?? []).map((genre) => genre.name).filter(Boolean))];
    const platforms = [...new Set((game.platforms ?? []).map((item) => item.platform?.name).filter(Boolean))];
    const screenshotUrls = (screenshots ?? []).map((item) => item.image).filter(Boolean).slice(0, 3);
    if (!screenshotUrls.length && game.background_image) screenshotUrls.push(game.background_image);

    document.title = `${game.name} | GameHub`;
    content.innerHTML = renderTemplate("gameDetails", {
      name: game.name,
      genre: genres[0] || "Games",
      genres,
      genresText: genres.join(", ") || "Unknown",
      platforms,
      platformsText: platforms.join(", ") || "Unknown",
      year: game.released ? String(game.released).slice(0, 4) : "TBA",
      rating: Number(game.rating || 0).toFixed(1),
      image: game.background_image || "/images/card-image-placeholder.png",
      description: game.description_raw || "No description available.",
      screenshots: screenshotUrls,
      developer: game.developers?.[0]?.name || "Unknown",
      publisher: game.publishers?.[0]?.name || "Unknown",
    });

    const libraryButton = content.querySelector(".gamepage__section--card-buttonLib");
    if (isInLibrary(game.id)) libraryButton.textContent = "In Library";
    libraryButton.addEventListener("click", () => {
      addToLibrary(game);
      libraryButton.textContent = "In Library";
    });

    const favoriteButton = content.querySelector(".gamepage__section--card-buttonFav");
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    favoriteButton.classList.toggle("is-active", favorites.includes(String(game.id)));
    favoriteButton.addEventListener("click", () => {
      const current = JSON.parse(localStorage.getItem("favorites") || "[]");
      const id = String(game.id);
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      localStorage.setItem("favorites", JSON.stringify(next));
      favoriteButton.classList.toggle("is-active", next.includes(id));
    });

    status?.setAttribute("hidden", "");
    content.removeAttribute("hidden");
  } catch (error) {
    console.error(error);
    if (status) status.textContent = "Failed to load this game. Please go back and try again.";
  }
}

initGamePage();
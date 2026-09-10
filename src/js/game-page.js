import { render } from "sass";
import {fetchGameById, fetchGameScreenshots} from "./api/games-api.js";
import {addToLibrary, isInLibrary} from "./services/storage.js";
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
    const description = game.description_raw || "No description available.";
    const year = game.released ? String(game.released).slice(0, 4) : "TBA";
    const rating = Number(game.rating || 0).toFixed(1);
    const image = game.background_image || "/images/card-image-placeholder.png";
    const screenshotUrls = (screenshots ?? []).map((item) => item.image).filter(Boolean).slice(0, 3);
    if (!screenshotUrls.length && game.background_image) screenshotUrls.push(game.background_image);

    document.title = `${game.name} | GameHub`;
    document.querySelector("[data-game-name-crumb]").textContent = game.name;
    document.querySelector("[data-game-genre-crumb]").textContent = genres[0] || "Games";
    document.querySelector("[data-game-name]").textContent = game.name;
    document.querySelector("[data-game-rating]").textContent = rating;
    document.querySelector("[data-game-year]").textContent = year;
    document.querySelector("[data-game-description]").textContent = description;
    document.querySelector("[data-game-developer]").textContent = game.developers?.[0]?.name || "Unknown";
    document.querySelector("[data-game-publisher]").textContent = game.publishers?.[0]?.name || "Unknown";
    document.querySelector("[data-game-info-release]").textContent = year;
    document.querySelector("[data-game-info-genres]").textContent = genres.join(", ") || "Unknown";
    document.querySelector("[data-game-info-platforms]").textContent = platforms.join(", ") || "Unknown";
    document.querySelector("[data-game-info-rating]").textContent = `${rating} / 5.0`;

    const cover = document.querySelector("[data-game-image]");
    cover.src = image;
    cover.alt = game.name;

    document.querySelector("[data-game-genres]").innerHTML = genres
      .slice(0, 4)
      .map((name) => `<h3 class="gamepage__section--card-genre-title">${name}</h3>`)
      .join("");
    document.querySelector("[data-game-platforms]").innerHTML = platforms
      .slice(0, 4)
      .map((name) => `<h3 class="gamepage__section--card-supportedDevices-title">${name}</h3>`)
      .join("");

    const aboutParagraphs = document.querySelectorAll("[data-game-about]");
    aboutParagraphs[0].textContent = description;
    if (aboutParagraphs[1]) aboutParagraphs[1].hidden = true;

    document.querySelector("[data-game-screenshots]").innerHTML = screenshotUrls
      .map((url) => `<li class="details__item"><img src="${url}" alt="${game.name} screenshot" class="details__screenshot" /></li>`)
      .join("");

    document.querySelector(".reviews")?.setAttribute("hidden", "");
    document.querySelector(".details__list--reviews")?.setAttribute("hidden", "");

    const libraryButton = document.querySelector("[data-add-library]");
    if (isInLibrary(game.id)) libraryButton.textContent = "In Library";
    libraryButton.addEventListener("click", () => {
      addToLibrary(game);
      libraryButton.textContent = "In Library";
    });

    const favoriteButton = document.querySelector("[data-toggle-favorite]");
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
    content?.removeAttribute("hidden");
  } catch (error) {
    console.error(error);
    if (status) status.textContent = "Failed to load this game. Please go back and try again.";
  }
}
// const game = await fetchGameById(4200);
// renderTemplate('gameDetails', game);
// renderGame(game);

initGamePage();
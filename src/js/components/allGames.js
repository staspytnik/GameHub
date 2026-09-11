import { fetchGames, fetchGenres, fetchGameById } from "../api/games-api.js";
import { createGameCard } from "./game-card.js";
import {
  createPaginationState,
  getVisiblePages,
} from "../services/pagination.js";
import { refs } from "../refs.js";

const searchInput = document.querySelector(".games__input");
const gamesGenres = document.querySelector(".games__list--categories");
const resultsCount = document.querySelector(".games__subtitle");
const prevBtn = document.querySelector('[data-page="prev"]');
const nextBtn = document.querySelector('[data-page="next"]');
const pagesWrap = document.querySelector("[data-pages]");

const filters = { search: "", genres: "" };

const pagination = createPaginationState(8);

function renderGames(games) {
  refs.gamesList.innerHTML = games.map(createGameCard).join("");
}

function getTotalPages() {
  return Math.ceil(pagination.total / pagination.pageSize) || 0;
}

function updateNavigation(data = {}) {
  const totalPages = getTotalPages();
  const items = getVisiblePages(pagination.page, totalPages);

  pagesWrap.innerHTML = items
    .map((item) => {
      if (item === "...") {
        return "...";
      }

      const isCurrent = item === pagination.page;
      return `<button type="button" class="games__buttons${
        isCurrent ? " chosen" : ""
      }" data-page-number="${item}">${item}</button>`;
    })
    .join("");
  prevBtn.disabled = pagination.page <= 1;
  nextBtn.disabled = pagination.page >= totalPages || !data.next;
  resultsCount.textContent = `${pagination.total} results`;
}

async function loadGames() {
  const params = {
    page: pagination.page,
    page_size: pagination.pageSize,
  };

  if (filters.search) params.search = filters.search;
  if (filters.genres) params.genres = filters.genres;

  const data = await fetchGames(params);

  if (!data || Array.isArray(data)) {
    pagination.total = 0;
    renderGames([]);
    updateNavigation();
    return;
  }

  pagination.total = data.count ?? 0;
  renderGames(data.results ?? []);
  updateNavigation(data);
}

const genres = await fetchGenres();
const list = document.querySelector(".games__list--categories");

const createCategory = function (genre) {
  const categorieItem = document.createElement("li");
  categorieItem.classList.add("games__items--categories");

  const categorieButton = document.createElement("button");
  categorieButton.classList.add("games__buttons");

  categorieButton.innerHTML = genre.name;

  categorieItem.append(categorieButton);
  list.append(categorieItem);
};

if (genres) {
  genres.forEach((genre) => {
    createCategory(genre);
  });
} else {
  alert("Something went wrong");
}

await loadGames();

searchInput.addEventListener("input", async (e) => {
  filters.search = e.target.value.trim();
  pagination.page = 1;
  await loadGames();
});

const listCategories = document.querySelectorAll(".games__items--categories");

gamesGenres.addEventListener("click", async (e) => {
  const currentItem = e.target.closest(".games__items--categories");
  if (!currentItem) return;

  listCategories.forEach((item) => {
    item.querySelector(".games__buttons").classList.remove("chosen");
  });
  currentItem.querySelector(".games__buttons").classList.add("chosen");

  const genres = currentItem.textContent.trim().toLowerCase();
  filters.genres = genres === "all" ? "" : genres;
  pagination.page = 1;
  await loadGames();
});

prevBtn.addEventListener("click", async () => {
  if (pagination.page <= 1) return;
  pagination.page -= 1;
  await loadGames();
});

nextBtn.addEventListener("click", async () => {
  const totalPages = getTotalPages();
  if (pagination.page >= totalPages) return;
  pagination.page += 1;
  await loadGames();
});

pagesWrap.addEventListener("click", async (e) => {
  const pageBtn = e.target.closest("[data-page-number]");
  if (!pageBtn) return;

  const page = Number(pageBtn.dataset.pageNumber);
  if (page === pagination.page) return;

  pagination.page = page;
  await loadGames();
});

refs.gamesList.addEventListener("click", async (event) => {
  const likeBtn = event.target.closest(".game-card__likeBtn");
  if (!likeBtn) return;

  const card = likeBtn.closest(".game-card");
  const gameId = card.dataset.id;

  const savedFavorites = JSON.parse(localStorage.getItem("library")) || [];

  if (!savedFavorites.includes(gameId)) {
    const gameCard = await fetchGameById(gameId);
    savedFavorites.push(gameCard);
    localStorage.setItem("library", JSON.stringify(savedFavorites));
    likeBtn.classList.add("is-active");
  } else {
    const updatedFavorites = savedFavorites.filter((id) => id !== gameId);
    localStorage.setItem("library", JSON.stringify(updatedFavorites));
    likeBtn.classList.remove("is-active");
  }
});

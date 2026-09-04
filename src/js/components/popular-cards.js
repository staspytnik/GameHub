import { fetchGames } from '../api/games-api.js';
import { createGameCard } from './game-card.js'
import { refs } from '../refs.js'

const games = await fetchGames()
console.log(games)

const gameCards = games.map(game => {
    return createGameCard(game)
})

refs.main.innerHTML = gameCards.join('')
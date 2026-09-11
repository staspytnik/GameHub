export function initGameNavigation() {
    document.addEventListener("click", (event) => {
        if (event.target.closest(".game-card__likeBtn, .featured__button")) return;
        const card = event.target.closest("[data-id]");
        console.log(card);
    if (!card) return;

    window.location.href = `game.html?id=${card.dataset.id}`;
    })
}

export async function toggleFavorite(recipeId, heartElement) {
    const isFavorite = heartElement.src.includes('full-heart.png');
    const newSrc = isFavorite ? '/assets/empty-heart.png' : '/assets/full-heart.png';
    heartElement.src = newSrc;

    if (isFavorite) {
        await fetch(`/favorites/remove/${recipeId}`, { method: 'DELETE' });
    } else {
        await fetch(`/favorites/add/${recipeId}`, { method: 'POST' });
    }
}

export function initializeFavoriteButton(recipeId, heartElement) {
    heartElement.addEventListener('click', async (event) => {
        event.stopPropagation(); 
        await toggleFavorite(recipeId, heartElement);
    });
}
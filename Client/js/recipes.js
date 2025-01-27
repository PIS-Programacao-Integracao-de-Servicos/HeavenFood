import { checkSession, updateAuthContainer } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const sessionData = await checkSession();
        updateAuthContainer(sessionData);

        const userId = sessionData && sessionData.user ? sessionData.user.id : null;

        const response = await fetch('/recipes/api/all');
        const recipes = await response.json();

        let favoriteIds = [];
        if (userId) {
            const favoritesResponse = await fetch(`/favorites/${userId}`);
            const favorites = await favoritesResponse.json();
            favoriteIds = favorites.map(fav => fav.id);
        }

        const recipesGrid = document.querySelector('.recipes-grid');
        recipesGrid.innerHTML = ''; 

        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            
            card.addEventListener('click', () => {
                window.location.href = `/recipes/details/${recipe.id}`;
            });

            const isFavorite = favoriteIds.includes(recipe.id);
            const starImage = isFavorite ? '/assets/full-heart.png' : '/assets/empty-heart.png';

            card.innerHTML = `
                <img src="${recipe.image_url}" alt="${recipe.nome}" class="recipe-image" />
                <h3>${recipe.nome}</h3>
                <p><strong>Categoria:</strong> ${recipe.categoria || 'Sem categoria'}</p>
                ${userId ? `<img src="${starImage}" alt="Adicionar aos Favoritos" class="favorite-heart" data-id="${recipe.id}" />` : ''}
            `;
            recipesGrid.appendChild(card);
        });

        if (userId) {
            document.querySelectorAll('.favorite-heart').forEach(star => {
                star.addEventListener('click', async (event) => {
                    event.stopPropagation();
                    const recipeId = event.target.getAttribute('data-id');
                    const isFavorite = event.target.src.includes('full-heart.png');

                    try {
                        if (isFavorite) {
                            const response = await fetch('/favorites/remove', {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ utilizador_id: userId, receita_id: recipeId })
                            });

                            const result = await response.json();
                            if (response.ok) {
                                event.target.src = '/assets/empty-heart.png'; 
                            } else {
                                alert('Erro ao remover dos favoritos: ' + result.message);
                            }
                        } else {
                            const response = await fetch('/favorites/add', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ utilizador_id: userId, receita_id: recipeId })
                            });

                            const result = await response.json();
                            if (response.ok) {
                                event.target.src = '/assets/full-heart.png'; 
                            } else {
                                alert('Erro ao adicionar aos favoritos: ' + result.message);
                            }
                        }
                    } catch (error) {
                        console.error('Erro ao atualizar favoritos:', error);
                    }
                });
            });
        }
    } catch (error) {
        console.error('Erro ao carregar receitas:', error);
    }
});
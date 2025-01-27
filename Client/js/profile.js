import { checkSession, updateAuthContainer } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {

    try {
        const sessionData = await checkSession();
        updateAuthContainer(sessionData);

        console.log(sessionData);

        // Exibir informações do utilizador
        const profileInfo = document.querySelector('.profile-info');
        profileInfo.innerHTML = `
            <h2>Bem-vindo, ${sessionData.user.nome}!</h2>
            <p><strong>Email:</strong> ${sessionData.user.email}</p>
        `;

        // Exibir receitas favoritas
        let favoriteList = [];
        let userId = sessionData.user.id;
        if (userId) {
            const favoritesResponse = await fetch(`/favorites/${userId}`);
            favoriteList = await favoritesResponse.json();
        }

        const favoritesGrid = document.querySelector('.favorites-grid');
        favoritesGrid.innerHTML = ''; // Limpar a lista de favoritos antes de renderizar

        favoriteList.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card';

            card.addEventListener('click', () => {
                window.location.href = `/recipes/details/${recipe.id}`;
            });

            const isFavorite = favoriteList.some(fav => fav.id === recipe.id); // Verificar se a receita está nos favoritos
            const starImage = isFavorite ? '/assets/full-heart.png' : '/assets/empty-heart.png';

            card.innerHTML = `
                <img src="${recipe.image_url}" alt="${recipe.nome}" class="recipe-image" />
                <h3>${recipe.nome}</h3>
                <p><strong>Categoria:</strong> ${recipe.categoria || 'Sem categoria'}</p>
                ${userId ? `<img src="${starImage}" alt="Adicionar aos Favoritos" class="favorite-heart" data-id="${recipe.id}" />` : ''}
            `;

            favoritesGrid.appendChild(card);
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
                                const recipeCard = event.target.closest('.recipe-card');
                                recipeCard.remove(); // Remove o card da lista de favoritos
                            } else {
                                alert('Erro ao remover dos favoritos: ' + result.message);
                            }
                        } 
                    } catch (error) {
                        console.error('Erro ao atualizar favoritos:', error);
                    }
                });
            });
        }

    } catch (error) {
        console.error('Erro ao carregar informações do perfil:', error);
    }
});

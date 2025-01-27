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
    
    const response = await fetch('/recipes/api/categories');
    const categories = await response.json();
    console.log(categories);

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.nome;
        document.querySelector('.categories').appendChild(option);
    });

    document.querySelector('.categories').style.cursor = 'pointer';
    const allOption = document.createElement('option');
    allOption.value = 0;
    allOption.textContent = 'All';
    document.querySelector('.categories').appendChild(allOption);

    document.querySelector('.categories').addEventListener('click', async (event) => {
        const selectedCategory = categories.find(category => category.id === parseInt(event.target.value));
        if(selectedCategory === undefined) {
            window.location.reload();
        }
        console.log('Selected category:', selectedCategory);
        // You can now use the selectedCategory variable as needed

        try {
            const response = await fetch(`/recipes/api/categories/${selectedCategory.id}`);
            const recipes = await response.json();
            
            //ajustar a query para getrecipebycategoryid
    
            const recipesGrid = document.querySelector('.recipes-grid');
            recipesGrid.innerHTML = '';
    
            recipes.forEach(recipe => {
                const card = document.createElement('div');
                card.className = 'recipe-card';
    
                card.addEventListener('click', () => {
                    window.location.href = `/recipes/details/${recipe.id}`;
                });
    
                card.innerHTML = `
                    <img src="${recipe.image_url}" alt="${recipe.nome}" class="recipe-image" />
                    <h3>${recipe.nome}</h3>
                    <p><strong>Categoria:</strong> ${recipe.categoria || 'Sem categoria'}</p>
                `;
                recipesGrid.appendChild(card);
            });
        } catch (error) {
            console.error('Erro ao buscar receitas:', error);
        }

    });
    
        
});

document.querySelector('.search-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchInput = document.querySelector('.search-input');
    const searchValue = searchInput.value;
    if (searchValue === '') {
        window.location.reload();
    }

    try {
        const response = await fetch(`/recipes/api/search/${searchValue}`);
        console.log(response);
        const test = await response.json();
        const recipes = test[0];

        const recipesGrid = document.querySelector('.recipes-grid');
        recipesGrid.innerHTML = '';

        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card';

            card.addEventListener('click', () => {
                window.location.href = `/recipes/details/${recipe.id}`;
            });

            card.innerHTML = `
                <img src="${recipe.image_url}" alt="${recipe.nome}" class="recipe-image" />
                <h3>${recipe.nome}</h3>
                <p><strong>Categoria:</strong> ${recipe.categoria || 'Sem categoria'}</p>
            `;
            recipesGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao buscar receitas:', error);
    }

    
});



import { checkSession, updateAuthContainer } from './auth.js';


document.addEventListener('DOMContentLoaded', async () => {

    try {
        const sessionData = await checkSession();
        updateAuthContainer(sessionData);

        const response = await fetch('/recipes/api/all');
        const recipes = await response.json();

        const recipesGrid = document.querySelector('.recipes-grid');
        recipesGrid.innerHTML = ''; 

        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            
            console.log(recipe.image_url);

            // Adiciona um clique ao card para redirecionar para a página de detalhes
            card.addEventListener('click', () => {
                window.location.href = `/recipes/details/${recipe.id}`;  // Redireciona para a página de detalhes
            });

            card.innerHTML = `
                <img src="${recipe.image_url}" alt="${recipe.nome}" class="recipe-image" />
                <h3>${recipe.nome}</h3>
                <p><strong>Categoria:</strong> ${recipe.categoria || 'Sem categoria'}</p>
            `;
            recipesGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar receitas:', error);
    }
});


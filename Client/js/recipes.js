document.addEventListener('DOMContentLoaded', async () => {
    const recipesGrid = document.querySelector('.recipes-grid');

    try {
        const response = await fetch('/recipes/api/all');
        const recipes = await response.json();

        recipesGrid.innerHTML = ''; // Limpa o grid antes de adicionar receitas

        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            card.innerHTML = `
                <img src="${recipe.imagem_url || 'path/to/default-image.jpg'}" alt="${recipe.nome}" class="recipe-image" />
                <h3>${recipe.nome}</h3>
                <p><strong>Categoria:</strong> ${recipe.categoria || 'Sem categoria'}</p>
                <p>${recipe.descricao_preparacao}</p>
            `;
            
            // Adicionar evento de clique para redirecionar para a página de detalhes
            card.addEventListener('click', () => {
                window.location.href = `/recipes/details.html?id=${recipe.id}`;
            });

            recipesGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar receitas:', error);
    }
});

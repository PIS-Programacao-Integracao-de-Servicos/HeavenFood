document.addEventListener('DOMContentLoaded', async () => {
    const recipeDetailsContainer = document.getElementById('recipe-details');

    // Obter o ID da receita a partir do parâmetro da URL
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id');

    if (!recipeId) {
        recipeDetailsContainer.innerHTML = '<p>Receita não encontrada!</p>';
        return;
    }

    try {
        // Fazer a requisição à API para buscar os detalhes da receita
        const response = await fetch(`/recipes/api/details?id=${recipeId}`);
        const recipe = await response.json();

        if (!recipe) {
            recipeDetailsContainer.innerHTML = '<p>Receita não encontrada!</p>';
            return;
        }

        // Renderizar os detalhes da receita
        recipeDetailsContainer.innerHTML = `
            <h1>${recipe.nome}</h1>
            <img src="${recipe.imagem_url || 'path/to/default-image.jpg'}" alt="${recipe.nome}" class="recipe-image" />
            <p><strong>Categoria:</strong> ${recipe.categoria || 'Sem categoria'}</p>
            <h3>Descrição</h3>
            <p>${recipe.descricao_preparacao}</p>
            <h3>Ingredientes</h3>
            <ul>
                ${recipe.ingredientes.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        `;
    } catch (error) {
        console.error('Erro ao carregar os detalhes da receita:', error);
        recipeDetailsContainer.innerHTML = '<p>Erro ao carregar a receita!</p>';
    }
});

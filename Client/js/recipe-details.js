document.addEventListener('DOMContentLoaded', async () => {

    // Obter o ID diretamente da URL, usando pathname
    const path = window.location.pathname;
    const recipeId = path.split('/')[3]; // O ID estará na posição 3

    // Verifica se o ID foi encontrado na URL
    if (!recipeId) {
        alert('ID da receita não encontrado na URL!');
        return;
    }

    // Monta a URL da API para buscar os detalhes da receita
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
    console.log(apiUrl)
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Verifica se a resposta contém uma receita
        if (data.meals && data.meals.length > 0) {
            const recipe = data.meals[0];

            // Preenche os elementos da página com os dados da receita
            document.getElementById('recipe-name').textContent = recipe.strMeal;
            document.getElementById('recipe-category').textContent = `Categoria: ${recipe.strCategory}`;
            document.getElementById('recipe-area').textContent = `Área: ${recipe.strArea}`;
            document.getElementById('recipe-instructions').textContent = recipe.strInstructions;

            // Atualiza a imagem da receita
            document.getElementById('recipe-image').src = recipe.strMealThumb;

            // Preenche os ingredientes
            const ingredientsList = document.getElementById('recipe-ingredients');
            ingredientsList.innerHTML = ''; // Limpa a lista antes de preencher
            for (let i = 1; i <= 20; i++) {
                const ingredient = recipe[`strIngredient${i}`];
                const measure = recipe[`strMeasure${i}`];

                if (ingredient && ingredient !== "") {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${ingredient} - ${measure}`;
                    ingredientsList.appendChild(listItem);
                }
            }

            // Caso haja um link do YouTube
            if (recipe.strYoutube) {
                const youtubeLink = document.getElementById('recipe-video');
                youtubeLink.href = recipe.strYoutube;
                youtubeLink.textContent = 'Assista ao vídeo de preparo';
            }
        } else {
            alert('Receita não encontrada!');
        }
    } catch (error) {
        console.error('Erro ao carregar os detalhes da receita:', error);
        alert('Ocorreu um erro ao carregar os detalhes da receita. Tente novamente mais tarde.');
    }
});

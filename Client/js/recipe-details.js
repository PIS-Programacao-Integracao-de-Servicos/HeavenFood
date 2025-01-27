import { checkSession, updateAuthContainer } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
    
    const recipeId = window.location.pathname.split('/').pop();
            const sessionData = await checkSession();
            updateAuthContainer(sessionData);
    
            console.log(sessionData)
    if (!recipeId) {
        alert('ID da receita não fornecido.');
        return;
    }

    try {
        const response = await fetch(`/recipes/api/${recipeId}`);
        const recipe = await response.json();

        if (response.ok) {
            document.getElementById('recipe-name').textContent = recipe.nome;
            document.getElementById('recipe-image').src = recipe.image_url;
            document.getElementById('recipe-category').textContent = recipe.categoria;
            document.getElementById('recipe-description').textContent = recipe.descricao_preparacao;
            document.getElementById('recipe-localidade').textContent = recipe.localidade;

            const ingredientsList = document.getElementById('recipe-ingredients');
            if (recipe.ingredientes && recipe.ingredientes.length > 0) {
                recipe.ingredientes.forEach(ingredient => {
                    const listItem = document.createElement('li');
                    const img = document.createElement('img');  
                    img.src = ingredient.image_url;
                    img.alt = ingredient.ingrediente;
                    img.style.width = '50px';
                    img.style.height = '50px';
                    listItem.appendChild(img);
                    listItem.appendChild(document.createTextNode(` ${ingredient.ingrediente}: ${ingredient.medida}`));
                    ingredientsList.appendChild(listItem);
                });
            } else {
                ingredientsList.textContent = 'Nenhum ingrediente encontrado.';
            }

            if (recipe.youtube_link) {
                const youtubeLink = document.getElementById('recipe-youtube');
                youtubeLink.href = recipe.youtube_link;
                youtubeLink.textContent = 'Ver vídeo no YouTube';
                youtubeLink.style.display = 'block';
            }
        } else {
            alert('Erro ao buscar detalhes da receita: ' + recipe.message);
        }
    } catch (error) {
        console.error('Erro ao buscar detalhes da receita:', error);
        alert('Erro ao buscar detalhes da receita.');
    }
});
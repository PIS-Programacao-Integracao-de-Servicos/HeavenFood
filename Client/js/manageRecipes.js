document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/recipes/api/admin/WithAllDetails');
    const recipes = await response.json();

    const tableBody = document.getElementById('recipeTableBody');
    recipes.forEach((recipe, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${recipe.id || 'desconhecido'}</td>
            <td>${recipe.nome || 'desconhecido'}</td>
            <td>${recipe.descricao_preparacao || 'desconhecido'}</td>
            <td>${recipe.categoria_id || 'desconhecido'}</td>
            <td><img src="${recipe.image_url || 'desconhecido'}" alt="Imagem da Receita" style="width: 50px; height: 50px;"></td>
            <td>${recipe.autor || 'desconhecido'}</td>
            <td>${recipe.dificuldade || 'desconhecido'}</td>
            <td>${recipe.tempo || 'desconhecido'}</td>
            <td>${recipe.custo || 'desconhecido'}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="openModal(${recipe.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick ="deleteRecipe(${recipe.id})">Remover</button>
            </td>
            
        `;
        tableBody.appendChild(row);
    });
});

async function deleteRecipe(id) {
    console.log(id);
    try {
        const response = await fetch(`/recipes/api/delete/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Receita removida com sucesso.');
            window.location.reload();
        } else {
            alert('Erro ao remover receita: ' + response.statusText);
        }
    } catch (error) {
        console.error('Erro ao remover receita:', error);
        alert('Erro ao remover receita.');
    }
}
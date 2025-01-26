document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('Verificando sessão do utilizador...');
        const response = await fetch('/auth/session', { method: 'GET', credentials: 'include' });
        const data = await response.json();

        console.log('Resposta do servidor:', data);

        const authContainer = document.getElementById('auth-container');

        if (data.loggedIn) {
            console.log('Utilizador autenticado:', data.user.nome);
            let dropdownContent = `
                <li>
                    <a href="/">Perfil</a>
                </li>
            `;
        
            if (data.user.isAdmin) {
                console.log('Utilizador é admin.');
                dropdownContent += `
                    <li>
                        <a href="/admin/dashboard" class="test">Dashboard</a>
                    </li>
                `;
            }
        
            dropdownContent += `
                <li>
                    <a href="" id="logout-btn">Terminar sessão</a>
                </li>
            `;
            const userImage = data.user.isAdmin ? '../assets/logo/male-user-admin.png' : '../assets/logo/male-user.png';

            authContainer.innerHTML = `
                <li id="user-profile"><img src="${userImage}">
                    <ul class="dropdown">
                        ${dropdownContent}
                    </ul>
                </li>
            `;

            document.getElementById('logout-btn').addEventListener('click', async () => {
                try {
                    console.log('Encerrando sessão...');
                    const logoutResponse = await fetch('/auth/logout', { method: 'POST', credentials: 'include' });
                    if (logoutResponse.ok) {
                        console.log('Sessão encerrada. Recarregando...');
                        authContainer.innerHTML = `
                            <a href="/auth/login" class="btn">Entrar/Registar</a>
                        `;
                    } else {
                        console.error('Erro ao encerrar sessão:', await logoutResponse.text());
                    }
                } catch (error) {
                    console.error('Erro ao encerrar sessão:', error);
                }
            });
        } else {
            console.log('Utilizador não autenticado.');
            authContainer.innerHTML = `
                <a href="/auth/login" class="btn">Entrar/Registar</a>
            `;
        }
    } catch (error) {
        console.error('Erro ao verificar sessão:', error);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/recipes/api/highlight');
        const recipes = await response.json();

        const recipesGrid = document.querySelector('.recipes-grid');
        recipesGrid.innerHTML = ''; 

        recipes.forEach((recipe) => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            recipeCard.innerHTML = `
                <img src="${recipe.imagem_url || 'path/to/default-image.jpg'}" alt="${recipe.nome}" class="recipe-image" />
                <h3 class="title">${recipe.nome}</h3>
                <p><strong>Categoria:</strong> ${recipe.categoria}</p>
            `;
            recipesGrid.appendChild(recipeCard);
        });
    } catch (error) {
        console.error('Erro ao carregar receitas de destaque:', error);
    }
});
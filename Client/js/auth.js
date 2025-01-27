export async function checkSession() {
    try {
        console.log('Verificando sessão do utilizador...');
        const response = await fetch('/auth/session', { method: 'GET', credentials: 'include' });
        return await response.json();
    } catch (error) {
        console.error('Erro ao verificar sessão:', error);
        throw error;
    }
}

export function updateAuthContainer(data) {
    const authContainer = document.getElementById('auth-container');

    if (data.loggedIn) {
        console.log('Utilizador autenticado:', data.user.nome);
        let dropdownContent = `
            <li>
                <a href="/profile">Perfil</a>
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
        const userImage = data.user.isAdmin ? '/assets/male-user-admin.png' : '/assets/male-user.png';

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
}
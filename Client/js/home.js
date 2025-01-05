document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('Verificando sessão do utilizador...');
        const response = await fetch('/auth/session', { method: 'GET', credentials: 'include' });
        const data = await response.json();

        console.log('Resposta do servidor:', data);

        const authContainer = document.getElementById('auth-container');

        if (data.loggedIn) {
            console.log('Utilizador autenticado:', data.user.nome);
            authContainer.innerHTML = `
                <span>Bem-vindo, ${data.user.nome}!</span>
                <button id="logout-btn" class="btn">Sair</button>
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

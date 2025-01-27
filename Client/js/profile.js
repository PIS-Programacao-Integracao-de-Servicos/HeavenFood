import { checkSession, updateAuthContainer } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const sessionData = await checkSession();
        updateAuthContainer(sessionData);

        console.log(sessionData);

        // Exibir informações do usuário
        const profileInfo = document.querySelector('.profile-info');
        profileInfo.innerHTML = `
            <h2>Bem-vindo, ${sessionData.user.nome}!</h2>
            <p><strong>Email:</strong> ${sessionData.user.email}</p>
        `;
    } catch (error) {
        console.error('Erro ao carregar informações do perfil:', error);
    }
});

// Botão para ir do formulário de registo para o de login
const showLoginButton = document.getElementById('show-login');
if (showLoginButton) {
    showLoginButton.addEventListener('click', () => {
        window.location.href = '/auth/login'; // Redirecionar para a página de login
    });
}

document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    const nome = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const senha = document.getElementById('signup-password').value;

    try {
        const response = await fetch('/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });

        const data = await response.json();
        alert(data.message);

        if (response.ok) {
            // Redirecionar para o login se o registo for bem-sucedido
            window.location.href = '/auth/login';
        }
    } catch (error) {
        console.error('Erro ao registar:', error);
    }
});
const showLoginButton = document.getElementById('show-login');
if (showLoginButton) {
    showLoginButton.addEventListener('click', () => {
        window.location.href = '/auth/login';
    });
}

document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();

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
            window.location.href = '/auth/login';
        }
    } catch (error) {
        console.error('Erro ao registar:', error);
    }
});
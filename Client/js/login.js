// Botão para ir do formulário de login para o de registo
const showSignupButton = document.getElementById('show-signup');
if (showSignupButton) {
    showSignupButton.addEventListener('click', () => {
        window.location.href = '/auth/signup'; // Redirecionar para a página de registo
    });
}

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Impedir o envio padrão do formulário

    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-password').value;

    console.log('Dados enviados:', { email, senha }); // Para verificar no console

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        let data;
        try {
            data = await response.json();
        } catch (error) {
            console.error('Resposta não é JSON:', error);
            alert('Ocorreu um erro inesperado. Tente novamente.');
            return;
        }

        if (response.ok) {
            window.location.href = '/'; // Redirecionar para a página principal
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Erro ao iniciar sessão:', error);
    }
});
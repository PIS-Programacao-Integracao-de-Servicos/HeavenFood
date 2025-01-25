const showSignupButton = document.getElementById('show-signup');
if (showSignupButton) {
    showSignupButton.addEventListener('click', () => {
        window.location.href = '/auth/signup';
    });
}

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-password').value;

    console.log('Dados enviados:', { email, senha });

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
            window.location.href = '/';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Erro ao iniciar sessão:', error);
    }
});
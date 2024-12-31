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

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            window.location.href = '/'; // Redirecionar para a página principal
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Erro ao iniciar sessão:', error);
    }
});
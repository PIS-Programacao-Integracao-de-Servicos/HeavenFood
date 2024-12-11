// formulários de registo e início de sessão
const signupFormContainer = document.getElementById('signup-form-container');
const loginFormContainer = document.getElementById('login-form-container');

// Obtenha os formulários pelos seus IDs
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

// Exibir apenas o formulário de início de sessão inicialmente
signupFormContainer.style.display = 'none';
loginFormContainer.style.display = 'block';

// Função para alternar entre Registo e Início de Sessão
function showForm(form) {
    if (form === 'signup') {
        signupFormContainer.style.display = 'block';
        loginFormContainer.style.display = 'none';
    } else {
        signupFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';
    }
}

// Eventos para alternar entre os formulários
document.getElementById('show-signup').addEventListener('click', () => showForm('signup'));
document.getElementById('show-login').addEventListener('click', () => showForm('login'));

// Função para registar um novo utilizador
signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: name, email: email, senha: password })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Erro no registo');
        }

        alert(data.message);
        showForm('login'); // Após registo, alterna para o formulário de início de sessão
    } catch (error) {
        alert(`Erro: ${error.message}`);
    }
});

// Função para fazer início de sessão
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, senha: password })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Erro no início de sessão');
        }

        window.location.href = 'http://localhost:3000/index'; // Redireciona após início de sessão bem-sucedido
    } catch (error) {
        alert(`Erro: ${error.message}`);
    }
});
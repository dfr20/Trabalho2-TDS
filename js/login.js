document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.form-login');

    if (loginForm) {
        // Processa o envio do formulário de login
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Captura o nome de usuário digitado
            const username = document.querySelector('input[name="username"]').value;
            const button = loginForm.querySelector('button[type="submit"]');

            // Altera visual do botão para indicar sucesso
            button.style.backgroundColor = '#28a745';
            button.textContent = 'Logado com sucesso!';
            button.style.cursor = 'default';

            // Armazena estado de login no navegador
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);

            // Redireciona para página principal após 1 segundo
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }

    // Manipula clique no link de registro
    const registrarLink = document.querySelector('.register a');
    if (registrarLink) {
        registrarLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Redireciona para página principal
            window.location.href = 'index.html';
        });
    }
});
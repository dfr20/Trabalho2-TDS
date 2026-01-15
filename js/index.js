document.addEventListener('DOMContentLoaded', function() {
    // Função que retorna saudação baseada na hora do dia
    const obterSaudacao = function() {
        const hora = new Date().getHours();
        // Verifica o período do dia e retorna saudação apropriada
        if (hora < 12) {
            return 'Bom dia!';
        } else if (hora < 18) {
            return 'Boa tarde!';
        } else {
            return 'Boa noite!';
        }
    };

    // Verifica se o usuário está logado usando localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');
    const btnEntrar = document.querySelector('.btn-entrar');
    const saudacaoTexto = obterSaudacao();

    // Se usuário está logado, altera o botão de entrada para mostrar nome
    if (isLoggedIn === 'true' && btnEntrar) {
        btnEntrar.textContent = `Olá, ${username}`;
        btnEntrar.classList.remove('btn-primary');
        btnEntrar.classList.add('btn-success');

        // Adiciona funcionalidade de logout ao clicar no botão
        btnEntrar.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Deseja fazer logout?')) {
                // Remove dados do localStorage e recarrega a página
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                location.reload();
            }
        });
    }

    // Exibe mensagem de saudação personalizada no topo da página
    const content = document.querySelector('.content');
    if (content) {
        const div = document.createElement('div');
        // Personaliza a saudação de acordo com o estado de login
        if (isLoggedIn === 'true' && username) {
            div.textContent = saudacaoTexto + ' Bem-vindo(a), ' + username + '!';
        } else {
            div.textContent = saudacaoTexto + ' Bem-vindo(a) ao Portal de Notícias!';
        }
        div.style.fontWeight = 'bold';
        div.style.marginBottom = '16px';
        // Insere a saudação no início do conteúdo
        content.insertBefore(div, content.firstChild);
    }

    // Controla a visibilidade do botão "Voltar ao Topo" baseado no scroll
    const backToTopBtn = document.querySelector('.back-to-top');

    if (backToTopBtn) {
        backToTopBtn.style.display = 'none';

        // Monitora o scroll da página
        window.addEventListener('scroll', function() {
            // Mostra o botão quando usuário rolar mais de 300px
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'block';
                backToTopBtn.style.opacity = '0';
                // Aplica animação de fade-in
                setTimeout(() => {
                    backToTopBtn.style.transition = 'opacity 0.3s';
                    backToTopBtn.style.opacity = '1';
                }, 10);
            } else {
                // Oculta o botão com fade-out
                backToTopBtn.style.opacity = '0';
                setTimeout(() => {
                    backToTopBtn.style.display = 'none';
                }, 300);
            }
        });

        // Implementa scroll suave ao topo ao clicar no botão
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Adiciona efeito hover nos cards de notícias
    const newsCards = document.querySelectorAll('.card');

    newsCards.forEach(card => {
        // Eleva o card quando o mouse passa por cima
        card.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });

        // Retorna o card à posição original quando o mouse sai
        card.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Permite fechar alertas pressionando a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const errorMessage = document.querySelector('#contact-error-message');
            // Oculta a mensagem de erro se ela estiver visível
            if (errorMessage && !errorMessage.classList.contains('hidden')) {
                errorMessage.classList.add('hidden');
            }
        }
    });

    // Validação e envio do formulário de contato
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Obtém e limpa os valores dos campos
            const nome = document.querySelector('#nome').value.trim();
            const email = document.querySelector('#email').value.trim();
            const mensagem = document.querySelector('#mensagem').value.trim();
            const errorDiv = document.querySelector('#contact-error-message');

            // Valida se todos os campos obrigatórios foram preenchidos
            if (!nome || !email || !mensagem) {
                errorDiv.classList.remove('hidden');
                // Rola suavemente até a mensagem de erro
                errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                // Se válido, oculta erro e exibe mensagem de sucesso
                errorDiv.classList.add('hidden');
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
            }
        });
    }

    // Processa votação da enquete
    const enqueteForm = document.querySelector('.enquete-card form');

    if (enqueteForm) {
        enqueteForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Verifica qual opção foi selecionada
            const selectedOption = document.querySelector('input[name="tema"]:checked');

            if (selectedOption) {
                const tema = selectedOption.value;
                // Capitaliza a primeira letra e exibe confirmação
                alert(`Obrigado por votar! Você escolheu: ${tema.charAt(0).toUpperCase() + tema.slice(1)}`);
                enqueteForm.reset();
            } else {
                alert('Por favor, selecione uma opção antes de votar.');
            }
        });
    }
});
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

/**
 * Página Login - Página dedicada de login
 *
 * Props:
 * - onLogin: função para processar login (prop função)
 *
 * Requisitos atendidos:
 * - useState com objeto (loginForm)
 * - Eventos de formulário (onSubmit, onChange)
 * - Inputs: text, password, checkbox
 */
function Login({ onLogin }) {
  const navigate = useNavigate();

  // useState OBJETO - dados do formulário de login
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  // useState COMUM - lembrar usuário
  const [rememberMe, setRememberMe] = useState(false);

  // useState COMUM - mostrar erro
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Evento onChange - atualiza campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (showError) setShowError(false);
  };

  // Evento onSubmit - processa login
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loginForm.username || !loginForm.password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      setShowError(true);
      return;
    }

    // Valida credenciais (apenas admin/admin)
    if (loginForm.username !== 'admin' || loginForm.password !== 'admin') {
      setErrorMessage('Credenciais inválidas. Use admin/admin.');
      setShowError(true);
      return;
    }

    // Salva no localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', loginForm.username);

    // Chama função passada por prop
    onLogin(loginForm.username);

    // Redireciona para home
    navigate('/');
  };

  return (
    <main className={styles.content}>
      <section className={styles.loginSection}>
        <div className={styles.loginContainer}>
          <div className="card shadow-lg">
            <div className="card-body p-5">
              {/* Ícone e título */}
              <div className="text-center mb-4">
                <i className={`bi bi-person-circle ${styles.loginIcon}`}></i>
                <h2 className="mt-3 mb-1">Bem-vindo</h2>
                <p className="text-muted">Faça login para continuar</p>
              </div>

              {/* Mensagem de erro - Renderização condicional */}
              {showError && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}

              {/* Formulário de login */}
              <form className={styles.formLogin} onSubmit={handleSubmit}>
                {/* Input tipo TEXT */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    <i className="bi bi-person me-2"></i>Usuário
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    placeholder="Digite seu usuário"
                    value={loginForm.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Input tipo PASSWORD */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    <i className="bi bi-lock me-2"></i>Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Digite sua senha"
                    value={loginForm.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Input tipo CHECKBOX */}
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Lembrar-me
                  </label>
                </div>

                {/* Botão de submit */}
                <button type="submit" className="btn btn-primary w-100 py-2 mb-3">
                  <i className="bi bi-box-arrow-in-right me-2"></i>Entrar
                </button>

                {/* Link esqueceu senha */}
                <div className="text-center">
                  <a href="#" className="text-decoration-none small text-muted">
                    Esqueceu a senha?
                  </a>
                </div>

                <hr className="my-4" />

                {/* Link para registro */}
                <p className="text-center text-muted mb-0">
                  Não tem uma conta?{' '}
                  <a href="#" className="text-primary fw-semibold text-decoration-none">
                    Registrar-se
                  </a>
                </p>
              </form>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

export default Login;

import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import headerLogo from '../../assets/img/headerLogo.png';

/**
 * Componente Header - Navegação principal
 *
 * Props:
 * - titulo: string (prop comum)
 * - user: object { nome, logado } (prop state)
 * - onLogout: function (prop função)
 */
function Header({ titulo, user, onLogout }) {
  // Renderização condicional baseada no estado de login
  const renderAuthButton = () => {
    if (user.logado) {
      return (
        <button
          className={`btn btn-success ${styles.btnEntrar}`}
          onClick={onLogout}
        >
          <i className="bi bi-person-check me-2"></i>
          Olá, {user.nome}
        </button>
      );
    }
    return (
      <Link to="/login" className={`btn btn-primary ${styles.btnEntrar}`}>
        <i className="bi bi-box-arrow-in-right me-2"></i>
        Entrar
      </Link>
    );
  };

  return (
    <header className={`navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top ${styles.header}`}>
      <div className="container-fluid">
        {/* Logo - Importação de imagem */}
        <Link className="navbar-brand" to="/">
          <img
            src={headerLogo}
            alt="Logo do PTI"
            height="30"
            className="d-inline-block align-text-top"
          />
        </Link>

        {/* Centro - Título e Navegação */}
        <div className="d-flex flex-column align-items-center me-4">
          {/* Interpolação de variável comum (titulo) */}
          <h1 className="h5 mb-0 text-dark fw-bold">{titulo}</h1>
          <nav className="navbar-nav">
            <ul className="navbar-nav flex-row">
              <li className="nav-item">
                <a className="nav-link" href="#destaques">Destaques</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#ultimas">Últimas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contato">Contato</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Botão de autenticação - Renderização condicional */}
        {renderAuthButton()}
      </div>
    </header>
  );
}

export default Header;

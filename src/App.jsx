import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importação de componentes
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';

// Importação de páginas
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

// Importação de estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/global.css';

/**
 * Componente App - Componente principal da aplicação
 *
 * Requisitos atendidos:
 * - useState com 3 tipos: comum, array, objeto
 * - useEffect para eventos
 * - Interpolação de variáveis
 * - Renderização condicional
 * - Props dos 3 tipos
 * - Reuso de componentes via loop
 * - React Router para navegação entre páginas
 */
function App() {
  // ==========================================
  // useState com 3 TIPOS
  // ==========================================

  // 1. useState OBJETO - dados do usuário
  const [user, setUser] = useState({
    nome: '',
    logado: false
  });

  // 2. useState COMUM - saudação
  const [greeting, setGreeting] = useState('');

  // ==========================================
  // useEffect - Efeitos colaterais
  // ==========================================

  // Efeito para definir saudação baseada na hora
  useEffect(() => {
    const getGreeting = () => {
      const hora = new Date().getHours();
      if (hora < 12) return 'Bom dia';
      if (hora < 18) return 'Boa tarde';
      return 'Boa noite';
    };
    setGreeting(getGreeting());
  }, []);

  // Efeito para verificar login salvo no localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('username');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true' && savedUser) {
      setUser({
        nome: savedUser,
        logado: true
      });
    }
  }, []);

  // ==========================================
  // Funções de manipulação
  // ==========================================

  // Função para processar login (será passada como prop)
  const handleLogin = (username) => {
    setUser({
      nome: username,
      logado: true
    });
  };

  // Função para fazer logout (será passada como prop)
  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair?')) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      setUser({ nome: '', logado: false });
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <BrowserRouter>
      <div className="app">
        {/* Header com props dos 3 tipos:
            - titulo: variável comum
            - user: variável state (objeto)
            - onLogout: função
        */}
        <Header
          titulo="Portal de Notícias"
          user={user}
          onLogout={handleLogout}
        />

        {/* Rotas da aplicação */}
        <Routes>
          {/* Rota Home - passa user e greeting como props */}
          <Route
            path="/"
            element={<Home user={user} greeting={greeting} />}
          />
          {/* Rota Login - passa função onLogin como prop */}
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
        </Routes>

        {/* Footer com prop comum (ano) */}
        <Footer ano={2024} />

        {/* Botão Back to Top */}
        <BackToTop />
      </div>
    </BrowserRouter>
  );
}

export default App;

import { useState, useEffect } from 'react';

/**
 * Componente BackToTop - Botão de voltar ao topo
 *
 * Requisitos atendidos:
 * - useState comum (isVisible)
 * - useEffect para evento de scroll (evento de janela)
 * - Evento onClick
 */
function BackToTop() {
  // useState COMUM - visibilidade do botão
  const [isVisible, setIsVisible] = useState(false);

  // useEffect - evento de janela (scroll)
  useEffect(() => {
    // Função que verifica posição do scroll
    const handleScroll = () => {
      // Mostra botão quando scroll > 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Adiciona listener ao montar
    window.addEventListener('scroll', handleScroll);

    // Remove listener ao desmontar (cleanup)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Array vazio - executa apenas uma vez

  // Evento onClick - scroll suave para o topo
  const handleClick = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Estilos do botão
  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    cursor: 'pointer',
    border: 'none',
    transition: 'opacity 0.3s, transform 0.3s',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    pointerEvents: isVisible ? 'auto' : 'none'
  };

  return (
    <button
      onClick={handleClick}
      style={buttonStyle}
      title="Voltar ao Topo"
      aria-label="Voltar ao Topo"
    >
      <i className="bi bi-arrow-up-short"></i> Topo
    </button>
  );
}

export default BackToTop;

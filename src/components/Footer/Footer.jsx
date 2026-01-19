/**
 * Componente Footer - Rodapé do site
 *
 * Props:
 * - ano: number (variável comum)
 */
function Footer({ ano }) {
  return (
    <footer className="bg-dark text-white-50 text-center py-3 mt-5">
      {/* Interpolação de variável comum (ano) */}
      <p className="mb-0">© {ano} Noticias PTI</p>
    </footer>
  );
}

export default Footer;

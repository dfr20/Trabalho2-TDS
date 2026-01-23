// Importação de componentes
import NewsCard from '../../components/NewsCard/NewsCard';
import ContactForm from '../../components/ContactForm/ContactForm';
import PollForm from '../../components/PollForm/PollForm';
import ApiNewsList from '../../components/ApiNewsList/ApiNewsList';

// Custom hook para requisições HTTP
import useApi from '../../hooks/useApi';

// Importação de dados estáticos (para sidebar e loop de componentes)
import { ultimasNoticias, biodiversidade, avisosRapidos } from '../../data/noticias';

/**
 * Página Home - Página principal do portal (protegida - requer login)
 *
 * Props:
 * - user: objeto com dados do usuário (state)
 * - greeting: string com saudação (comum)
 *
 * Demonstra:
 * - Custom hook useApi para buscar notícias da API
 * - useEffect (dentro do hook) + Fetch API
 * - CSS Modules + CSS dinâmico (no ApiNewsList)
 */
function Home({ user, greeting }) {
  // Custom hook para buscar notícia de destaque da API
  const { data: destaqueData, loading: loadingDestaque } = useApi('/api/noticias/1');

  // Notícia de destaque vinda da API
  const noticiaDestaque = destaqueData?.data;

  return (
    <main className="container my-5">
      {/* Seção de boas-vindas com interpolação de variáveis */}
      <div className="alert alert-success shadow-sm mb-4">
        <h4>
          {/* Interpolação de variável COMUM (greeting) */}
          {greeting}!{' '}
          {/* Interpolação de OBJETO (user.nome) */}
          Bem-vindo(a), <strong>{user.nome}</strong>!
        </h4>
        <p className="mb-0 small">
          <i className="bi bi-shield-check me-1"></i>
          Sessão iniciada com sucesso. Agora tens acesso às notícias.
        </p>
      </div>

      {/* Seção Destaques - Notícia principal da API */}
      <section id="destaques">
        <h2 className="mb-4 text-primary">
          <i className="bi bi-star-fill me-2"></i>
          Destaque
        </h2>
        <div className="row g-4">
          {/* Card de destaque da API */}
          <div className="col-md-8">
            {loadingDestaque ? (
              <div className="card p-5 text-center">
                <div className="spinner-border text-primary mx-auto" role="status">
                  <span className="visually-hidden">A carregar...</span>
                </div>
                <p className="mt-3 text-muted">A carregar destaque...</p>
              </div>
            ) : noticiaDestaque ? (
              <NewsCard
                title={noticiaDestaque.title}
                category={noticiaDestaque.category}
                categoryColor={noticiaDestaque.categoryColor}
                description={noticiaDestaque.description}
                date={noticiaDestaque.date}
                image={noticiaDestaque.image}
                imageCaption={noticiaDestaque.imageCaption}
                fullText={noticiaDestaque.fullText}
                isDestaque={true}
              />
            ) : (
              <div className="alert alert-warning">
                Não foi possível carregar o destaque.
              </div>
            )}
          </div>

          {/* Sidebar com accordion e tabela */}
          <div className="col-md-4">
            {/* Accordion - Avisos Rápidos */}
            <div className="accordion" id="accordionAvisos">
              <h4 className="h5 mb-3 text-secondary">Avisos Rápidos</h4>
              {/* Loop pelo ARRAY de avisos */}
              {avisosRapidos.map((aviso, index) => (
                <div className="accordion-item" key={aviso.id}>
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${!aviso.expanded ? 'collapsed' : ''}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                    >
                      {/* Interpolação de propriedade do objeto */}
                      {aviso.title}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className={`accordion-collapse collapse ${aviso.expanded ? 'show' : ''}`}
                  >
                    <div className="accordion-body">
                      {aviso.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabela de Biodiversidade */}
            <div className="mt-4 p-3 bg-white rounded shadow-sm">
              <table className="table table-striped table-sm">
                <caption>Dados de Biodiversidade Local</caption>
                <thead>
                  <tr>
                    <th scope="col">Espécie</th>
                    <th scope="col">Status</th>
                    <th scope="col">Avistamentos</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Loop pelo ARRAY de biodiversidade */}
                  {biodiversidade.map((item) => (
                    <tr key={item.id}>
                      <td>{item.especie}</td>
                      <td>{item.status}</td>
                      <td>{item.avistamentos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <hr className="my-5" />

      {/* Seção Últimas Notícias - Reuso de componente (NewsCard) através de loop */}
      <section id="ultimas">
        <h2 className="mb-4 text-success">
          <i className="bi bi-newspaper me-2"></i>
          Últimas Notícias
        </h2>
        <div className="row g-4">
          {/* Reuso do componente NewsCard via .map() no array */}
          {ultimasNoticias.map((noticia) => (
            <div className="col-md-4" key={noticia.id}>
              <NewsCard
                title={noticia.title}
                category={noticia.category}
                categoryColor={noticia.categoryColor}
                description={noticia.description}
                date={noticia.date}
              />
            </div>
          ))}
        </div>
      </section>

      <hr className="my-5" />

      {/* Seção de Notícias da API - Demonstra Custom Hook, useEffect, Fetch API, CSS Modules e CSS Dinâmico */}
      <section id="api-noticias">
        <h2 className="mb-4 text-info">
          <i className="bi bi-cloud-download me-2"></i>
          Todas as Notícias (API)
        </h2>
        <p className="text-muted mb-4">
          As notícias abaixo são carregadas via requisição HTTP usando o custom hook <code>useApi</code>.
          Clique numa notícia para interagir e deixar comentários (POST).
        </p>
        <ApiNewsList />
      </section>

      <hr className="my-5" />

      {/* Seção de Contato e Enquete */}
      <div className="row g-4">
        <div className="col-lg-7">
          <ContactForm />
        </div>
        <div className="col-lg-5">
          <PollForm />
        </div>
      </div>
    </main>
  );
}

export default Home;

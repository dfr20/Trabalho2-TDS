import { useState, useEffect } from 'react';

// Importação de componentes
import NewsCard from '../../components/NewsCard/NewsCard';
import ContactForm from '../../components/ContactForm/ContactForm';
import PollForm from '../../components/PollForm/PollForm';

// Importação de dados (arrays e objetos)
import { noticiaDestaque, ultimasNoticias, biodiversidade, avisosRapidos } from '../../data/noticias';

/**
 * Página Home - Página principal do portal
 *
 * Props:
 * - user: objeto com dados do usuário (state)
 * - greeting: string com saudação (comum)
 */
function Home({ user, greeting }) {
  // useState ARRAY - lista de notícias
  const [noticias, setNoticias] = useState(ultimasNoticias);

  return (
    <main className="container my-5">
      {/* Seção de boas-vindas com interpolação de variáveis */}
      <div className="alert alert-light shadow-sm mb-4">
        <h4>
          {/* Interpolação de variável COMUM (greeting) */}
          {greeting}!{' '}
          {/* Renderização condicional + interpolação de OBJETO (user.nome) */}
          {user.logado
            ? `Bem-vindo(a), ${user.nome}!`
            : 'Bem-vindo(a) ao Portal!'
          }
        </h4>
      </div>

      {/* Seção Destaques */}
      <section id="destaques">
        <h2 className="mb-4 text-primary">Destaques</h2>
        <div className="row g-4">
          {/* Card de destaque */}
          <div className="col-md-8">
            <NewsCard {...noticiaDestaque} isDestaque={true} />
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

      {/* Seção Últimas Notícias */}
      <section id="ultimas">
        <h2 className="mb-4 text-secondary">Últimas Notícias</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {/* REUSO DE COMPONENTE VIA LOOP
              Renderiza NewsCard para cada notícia no array
          */}
          {noticias.map((noticia) => (
            <div className="col" key={noticia.id}>
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

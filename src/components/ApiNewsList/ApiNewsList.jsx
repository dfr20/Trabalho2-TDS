import { useState } from 'react';
import useApi from '../../hooks/useApi';
import styles from './ApiNewsList.module.css';

/**
 * Componente ApiNewsList
 *
 * Demonstra:
 * - Custom hook useApi para requisições GET/POST
 * - useEffect (dentro do hook) com Fetch API
 * - CSS Modules para estilos com escopo local
 * - Classes CSS dinâmicas baseadas em estado
 */
function ApiNewsList() {
  // Custom hook para GET das noAPI
  const { data, loading, error, postData, refetch } = useApi('/api/noticias');

  // Estados locais para interatividade
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [comment, setComment] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [posting, setPosting] = useState(false);

  // Handler para enviar comentário (POST)
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !selectedId) return;

    setPosting(true);
    try {
      // Usa postData do custom hook - agora não sobrescreve mais o data
      const result = await postData('/api/comentarios', {
        noticiaId: selectedId,
        texto: comment,
        autor: 'Usuário Anônimo'
      });
      console.log('✅ Comentário enviado com sucesso!', result);
      setComment('');
      setCommentSuccess(true);
      setTimeout(() => setCommentSuccess(false), 3000);
    } catch (err) {
      console.error('❌ Erro ao enviar comentário:', err);
    } finally {
      setPosting(false);
    }
  };

  // Função para gerar classes CSS dinâmicas
  const getItemClasses = (id) => {
    // Array de classes base
    const classes = [styles.newsItem];

    // Classe dinâmica para hover
    if (hoveredId === id) {
      classes.push(styles.newsItemHovered);
    }

    // Classe dinâmica para selecionado
    if (selectedId === id) {
      classes.push(styles.newsItemSelected);
    }

    return classes.join(' ');
  };

  // Estado de loading
  if (loading && !data) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>
          <i className="bi bi-cloud-download me-2"></i>
          Notícias da API
        </h3>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <span>A carregar notícias...</span>
        </div>
      </div>
    );
  }

  // Estado de erro
  if (error) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>
          <i className="bi bi-cloud-download me-2"></i>
          Notícias da API
        </h3>
        <div className={styles.error}>
          <p><i className="bi bi-exclamation-triangle me-2"></i>Erro: {error}</p>
          <button className={styles.retryButton} onClick={refetch}>
            <i className="bi bi-arrow-clockwise me-2"></i>Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const noticias = data?.data || [];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        <i className="bi bi-cloud-download me-2"></i>
        Notícias da API (Custom Hook)
      </h3>

      <p className="text-muted small mb-3">
        <i className="bi bi-info-circle me-1"></i>
        Clique numa notícia para selecioná-la e deixar um comentário
      </p>

      {/* Lista de notícias com CSS dinâmico */}
      <div className={styles.newsList}>
        {noticias.map((noticia) => (
          <div
            key={noticia.id}
            // Classes CSS dinâmicas baseadas em estado (hover + selected)
            className={getItemClasses(noticia.id)}
            onClick={() => setSelectedId(noticia.id === selectedId ? null : noticia.id)}
            onMouseEnter={() => setHoveredId(noticia.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <h4 className={styles.newsTitle}>{noticia.title}</h4>
            <p className={styles.newsDescription}>{noticia.description}</p>
            <div className={styles.newsMeta}>
              <span
                className={styles.category}
                style={{ backgroundColor: noticia.categoryColor }}
              >
                {noticia.category}
              </span>
              <span className={styles.date}>
                <i className="bi bi-calendar3 me-1"></i>
                {noticia.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Formulário de comentário (POST) - só aparece quando há notícia selecionada */}
      {selectedId && (
        <form className={styles.commentForm} onSubmit={handleSubmitComment}>
          <h5>
            <i className="bi bi-chat-dots me-2"></i>
            Deixar comentário na notícia selecionada
          </h5>
          <textarea
            className={styles.commentInput}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escreva o seu comentário..."
            rows={3}
          />
          <button
            type="submit"
            className={styles.submitButton}
            disabled={posting || !comment.trim()}
          >
            {posting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                A enviar...
              </>
            ) : (
              <>
                <i className="bi bi-send me-2"></i>
                Enviar Comentário (POST)
              </>
            )}
          </button>
        </form>
      )}

      {/* Mensagem de sucesso */}
      {commentSuccess && (
        <div className={styles.successMessage}>
          <i className="bi bi-check-circle me-2"></i>
          Comentário enviado com sucesso!
        </div>
      )}
    </div>
  );
}

export default ApiNewsList;

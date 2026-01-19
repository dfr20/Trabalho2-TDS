import { useState } from 'react';
import styles from './NewsCard.module.css';

/**
 * Componente NewsCard - Card reutilizável para notícias
 *
 * Props (variáveis comuns):
 * - id: number
 * - title: string
 * - category: string
 * - categoryColor: string
 * - description: string
 * - date: string
 * - image: string (opcional)
 * - imageCaption: string (opcional)
 * - fullText: string (opcional)
 * - isDestaque: boolean (opcional) - se é card de destaque
 */
function NewsCard({
  title,
  category,
  categoryColor,
  description,
  date,
  image,
  imageCaption,
  fullText,
  isDestaque = false
}) {
  // useState comum para controle de hover (CSS dinâmico)
  const [isHovered, setIsHovered] = useState(false);

  // Eventos de mouse - onMouseEnter e onMouseLeave
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <article
      // CSS dinâmico - classe condicional baseada no state
      className={`card h-100 shadow-sm ${styles.card} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Renderização condicional - mostra imagem se existir */}
      {image && (
        <figure className={styles.imageContainer}>
          <img
            src={image}
            className="card-img-top"
            alt={title}
            style={{
              width: '100%',
              height: isDestaque ? '300px' : '200px',
              objectFit: 'cover'
            }}
          />
          {imageCaption && (
            <figcaption className="p-2 text-muted fst-italic">
              {imageCaption}
            </figcaption>
          )}
        </figure>
      )}

      <div className="card-body">
        {/* Badge da categoria */}
        <span className={`badge bg-${categoryColor} mb-2`}>
          {category}
        </span>

        {/* Título - interpolação de variável comum */}
        <h3 className="card-title h5">{title}</h3>

        {/* Descrição com mark para destaque */}
        <p className="card-text">
          {isDestaque ? (
            <>
              {description.split('autoridades ambientais')[0]}
              <mark>autoridades ambientais</mark>
              {description.split('autoridades ambientais')[1]}
            </>
          ) : (
            description
          )}
        </p>

        {/* Renderização condicional - seção expandível se tiver texto completo */}
        {fullText && (
          <details className={styles.details}>
            <summary>Leia mais</summary>
            <p className="mt-2">{fullText}</p>
          </details>
        )}

        {/* Data - interpolação de variável comum */}
        <span className="text-muted small">{date}</span>
      </div>
    </article>
  );
}

export default NewsCard;

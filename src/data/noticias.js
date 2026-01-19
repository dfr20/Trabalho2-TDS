// Importação de imagem
import noticiaPrincipal from '../assets/img/noticiaPrincipal.jpg';

/**
 * Array de objetos - dados das notícias
 * Usado para interpolação de array e reuso de componentes via loop
 */
export const noticiaDestaque = {
  id: 0,
  title: 'Onça Pintada é vista andando no campus',
  category: 'Alerta',
  categoryColor: 'danger',
  description: 'Animal foi avistado por estudantes e servidores, e autoridades ambientais já investigam o caso.',
  date: '09/11/2025',
  image: noticiaPrincipal,
  imageCaption: 'Foto: Onça Pintada na natureza',
  fullText: 'A onça pintada, um dos maiores felinos das Américas, foi avistada recentemente caminhando pelo campus da universidade. O avistamento gerou grande comoção entre alunos e professores, que se mobilizaram para proteger o animal e garantir sua segurança.'
};

export const ultimasNoticias = [
  {
    id: 1,
    title: 'Robô aprende a fazer café perfeito',
    category: 'Tecnologia',
    categoryColor: 'info',
    description: 'Inteligência artificial desenvolvida por estudantes consegue preparar a bebida ideal para cada pessoa.',
    date: '08/11/2025'
  },
  {
    id: 2,
    title: 'Time de xadrez vence campeonato regional',
    category: 'Esportes',
    categoryColor: 'success',
    description: 'Estudantes conquistam primeiro lugar em torneio com 50 equipes participantes.',
    date: '07/11/2025'
  },
  {
    id: 3,
    title: 'Festival de música indie agita campus',
    category: 'Cultura',
    categoryColor: 'warning',
    description: 'Evento gratuito apresenta bandas locais e atrai mais de 2 mil pessoas.',
    date: '06/11/2025'
  }
];

// Array de objetos - dados da tabela de biodiversidade
export const biodiversidade = [
  { id: 1, especie: 'Onça Pintada', status: 'Vulnerável', avistamentos: 1 },
  { id: 2, especie: 'Capivara', status: 'Comum', avistamentos: 15 }
];

// Array de objetos - avisos rápidos (accordion)
export const avisosRapidos = [
  {
    id: 1,
    title: 'Segurança no Campus',
    content: 'Medidas de segurança foram reforçadas após o avistamento.',
    expanded: true
  },
  {
    id: 2,
    title: 'Próximos Eventos',
    content: 'Confira o calendário de palestras da semana.',
    expanded: false
  }
];

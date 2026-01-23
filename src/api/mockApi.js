// API Simulada - Mock de dados de notícias
// Simula um backend com delay para parecer uma requisição real

const mockNoticias = [
  {
    id: 1,
    title: "Descoberta Científica Revoluciona Energia Solar",
    category: "Tecnologia",
    categoryColor: "#007bff",
    description: "Cientistas desenvolvem novo material que aumenta em 40% a eficiência dos painéis solares.",
    date: "2024-01-15",
    image: "https://picsum.photos/seed/solar/400/200",
    imageCaption: "Novos painéis solares em teste",
    fullText: "Uma equipa de investigadores da Universidade de Lisboa anunciou hoje uma descoberta que pode revolucionar o setor de energia renovável. O novo material, baseado em perovskita, demonstrou uma eficiência de conversão de energia 40% superior aos painéis tradicionais de silício."
  },
  {
    id: 2,
    title: "Festival de Música Anuncia Edição Especial",
    category: "Entretenimento",
    categoryColor: "#dc3545",
    description: "Maior festival do país terá 3 dias de shows com artistas internacionais.",
    date: "2024-01-14",
    image: "https://picsum.photos/seed/festival/400/200",
    imageCaption: "Palco principal do festival",
    fullText: "O festival que já se tornou tradição no verão português anunciou sua programação completa para este ano. Com mais de 50 artistas confirmados, o evento promete ser o maior da história."
  },
  {
    id: 3,
    title: "Nova Espécie de Pássaro Descoberta no Alentejo",
    category: "Natureza",
    categoryColor: "#28a745",
    description: "Ornitólogos identificam nova espécie endémica da região sul de Portugal.",
    date: "2024-01-13",
    image: "https://picsum.photos/seed/bird/400/200",
    imageCaption: "A nova espécie em seu habitat natural",
    fullText: "Uma equipa de biólogos do Instituto de Conservação da Natureza confirmou a descoberta de uma nova espécie de pássaro nas planícies do Alentejo. A ave, ainda sem nome oficial, apresenta características únicas."
  },
  {
    id: 4,
    title: "Economia Portuguesa Cresce Acima das Expectativas",
    category: "Economia",
    categoryColor: "#ffc107",
    description: "PIB registra crescimento de 3,2% no último trimestre.",
    date: "2024-01-12",
    image: "https://picsum.photos/seed/economy/400/200",
    imageCaption: "Gráfico de crescimento económico",
    fullText: "O Instituto Nacional de Estatística divulgou os dados do PIB português, revelando um crescimento surpreendente de 3,2% no quarto trimestre. O setor de turismo foi o principal motor deste crescimento."
  }
];

const mockComentarios = [];

// Função para simular delay de rede
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock do fetch - substitui o fetch real quando a URL começa com /api
export const mockFetch = async (url, options = {}) => {
  await delay(800); // Simula latência de rede

  // GET /api/noticias - Lista todas as notícias
  if (url === '/api/noticias' && (!options.method || options.method === 'GET')) {
    return {
      ok: true,
      status: 200,
      json: async () => ({ success: true, data: mockNoticias })
    };
  }

  // GET /api/noticias/:id - Busca notícia por ID
  if (url.match(/\/api\/noticias\/\d+/) && (!options.method || options.method === 'GET')) {
    const id = parseInt(url.split('/').pop());
    const noticia = mockNoticias.find(n => n.id === id);

    if (noticia) {
      return {
        ok: true,
        status: 200,
        json: async () => ({ success: true, data: noticia })
      };
    }

    return {
      ok: false,
      status: 404,
      json: async () => ({ success: false, error: 'Notícia não encontrada' })
    };
  }

  // POST /api/comentarios - Adiciona um comentário
  if (url === '/api/comentarios' && options.method === 'POST') {
    const body = JSON.parse(options.body);
    const novoComentario = {
      id: mockComentarios.length + 1,
      ...body,
      createdAt: new Date().toISOString()
    };
    mockComentarios.push(novoComentario);

    return {
      ok: true,
      status: 201,
      json: async () => ({ success: true, data: novoComentario, message: 'Comentário adicionado com sucesso!' })
    };
  }

  // GET /api/comentarios - Lista comentários
  if (url === '/api/comentarios' && (!options.method || options.method === 'GET')) {
    return {
      ok: true,
      status: 200,
      json: async () => ({ success: true, data: mockComentarios })
    };
  }

  // Rota não encontrada
  return {
    ok: false,
    status: 404,
    json: async () => ({ success: false, error: 'Endpoint não encontrado' })
  };
};

export default mockFetch;

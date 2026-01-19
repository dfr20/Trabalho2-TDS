import { useState } from 'react';

/**
 * Componente ContactForm - Formulário de contato
 *
 * Requisitos atendidos:
 * - useState com objeto (formData)
 * - useState comum (showError)
 * - Eventos de formulário (onSubmit, onChange)
 * - 5+ tipos de input: text, email, date, select, textarea, datalist
 */
function ContactForm() {
  // useState com OBJETO - dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    interesse: '',
    data: '',
    assunto: '',
    mensagem: ''
  });

  // useState COMUM - controle de erro
  const [showError, setShowError] = useState(false);

  // useState COMUM - mensagem de sucesso
  const [showSuccess, setShowSuccess] = useState(false);

  // Array de opções para o datalist
  const interesseOptions = ['Tecnologia', 'Esportes', 'Política', 'Ciência'];

  // Array de opções para o select
  const assuntoOptions = ['Reportar Erro', 'Sugestão de Notícia', 'Parceria'];

  // Evento onChange - atualiza o state do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Atualiza objeto mantendo os outros campos
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    // Esconde erro ao digitar
    if (showError) setShowError(false);
  };

  // Evento onSubmit - validação e envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação - campos obrigatórios
    if (!formData.nome || !formData.email || !formData.mensagem) {
      setShowError(true);
      return;
    }

    // Sucesso
    setShowSuccess(true);
    setShowError(false);

    // Reset do formulário
    setFormData({
      nome: '',
      email: '',
      interesse: '',
      data: '',
      assunto: '',
      mensagem: ''
    });

    // Esconde mensagem de sucesso após 3 segundos
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Evento de teclado - ESC fecha mensagem de erro
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowError(false);
    }
  };

  return (
    <section id="contato" onKeyDown={handleKeyDown}>
      <h2 className="mb-4 text-primary">Contato</h2>

      {/* Renderização condicional - mensagem de erro */}
      {showError && (
        <div className="alert alert-danger" role="alert">
          <strong>Erro ao enviar:</strong> Por favor, verifique se todos os campos obrigatórios estão preenchidos.
        </div>
      )}

      {/* Renderização condicional - mensagem de sucesso */}
      {showSuccess && (
        <div className="alert alert-success" role="alert">
          <strong>Sucesso!</strong> Sua mensagem foi enviada com sucesso.
        </div>
      )}

      <div className="card p-4 shadow">
        <form onSubmit={handleSubmit} autoComplete="on">
          {/* Input tipo TEXT */}
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              className="form-control"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          {/* Input tipo EMAIL */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Input com DATALIST - usando array com map */}
          <div className="mb-3">
            <label htmlFor="interesse" className="form-label">Área de Interesse:</label>
            <input
              list="interesses"
              id="interesse"
              name="interesse"
              className="form-control"
              placeholder="Ex: Tecnologia"
              value={formData.interesse}
              onChange={handleChange}
            />
            <datalist id="interesses">
              {/* Loop pelo array de opções */}
              {interesseOptions.map((opcao, index) => (
                <option key={index} value={opcao} />
              ))}
            </datalist>
          </div>

          {/* Input tipo DATE */}
          <div className="mb-3">
            <label htmlFor="data" className="form-label">Melhor Data para Retorno:</label>
            <input
              type="date"
              id="data"
              name="data"
              className="form-control"
              value={formData.data}
              onChange={handleChange}
              required
            />
          </div>

          {/* Input tipo SELECT */}
          <div className="mb-3">
            <label htmlFor="assunto" className="form-label">Assunto:</label>
            <select
              id="assunto"
              name="assunto"
              className="form-select"
              value={formData.assunto}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Escolha um assunto...</option>
              {/* Loop pelo array de opções */}
              {assuntoOptions.map((opcao, index) => (
                <option key={index} value={opcao}>{opcao}</option>
              ))}
            </select>
          </div>

          {/* Input tipo TEXTAREA */}
          <div className="mb-3">
            <label htmlFor="mensagem" className="form-label">Mensagem:</label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows="3"
              className="form-control"
              value={formData.mensagem}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Botão de submit */}
          <button type="submit" className="btn btn-primary w-100">
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;

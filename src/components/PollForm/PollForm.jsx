import { useState } from 'react';

/**
 * Componente PollForm - Enquete com radio buttons
 *
 * Requisitos atendidos:
 * - useState comum (selectedTheme)
 * - useState com array (temas)
 * - Eventos de formulário (onChange, onSubmit)
 * - Input tipo RADIO
 * - Reuso via loop (map no array de temas)
 */
function PollForm() {
  // useState COMUM - tema selecionado
  const [selectedTheme, setSelectedTheme] = useState('');

  // useState com ARRAY - opções de temas
  const [temas] = useState([
    { id: 'tecnologia', label: 'Tecnologia' },
    { id: 'esportes', label: 'Esportes' },
    { id: 'politica', label: 'Política' }
  ]);

  // useState COMUM - mostra resultado
  const [showResult, setShowResult] = useState(false);

  // Evento onChange - atualiza tema selecionado
  const handleChange = (e) => {
    setSelectedTheme(e.target.value);
  };

  // Evento onSubmit - processa voto
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedTheme) {
      alert('Por favor, selecione uma opção!');
      return;
    }

    // Mostra resultado
    setShowResult(true);

    // Esconde após 3 segundos
    setTimeout(() => {
      setShowResult(false);
      setSelectedTheme('');
    }, 3000);
  };

  // Função para formatar o nome do tema
  const formatThemeName = (theme) => {
    return theme.charAt(0).toUpperCase() + theme.slice(1);
  };

  return (
    <aside className="card p-4 shadow mt-5">
      <h3>Enquete</h3>

      {/* Renderização condicional - resultado da enquete */}
      {showResult && (
        <div className="alert alert-info mt-3">
          <strong>Obrigado!</strong> Você votou em: {formatThemeName(selectedTheme)}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <fieldset className="mb-3 p-3 border rounded">
          <legend className="float-none w-auto px-2 fs-6">
            Qual tema você mais gosta?
          </legend>

          {/* Reuso de componente via LOOP - renderiza radio buttons */}
          {temas.map((tema) => (
            <div className="form-check" key={tema.id}>
              <input
                className="form-check-input"
                type="radio"
                id={tema.id}
                name="tema"
                value={tema.id}
                checked={selectedTheme === tema.id}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor={tema.id}>
                {/* Interpolação de variável do objeto */}
                {tema.label}
              </label>
            </div>
          ))}
        </fieldset>

        <button type="submit" className="btn btn-secondary w-100">
          Votar
        </button>
      </form>
    </aside>
  );
}

export default PollForm;

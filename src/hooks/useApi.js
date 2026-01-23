import { useState, useEffect } from 'react';
import mockFetch from '../api/mockApi';

// Usa mockFetch para URLs internas (/api/*) e fetch real para URLs externas
const apiFetch = (url, options) => {
  if (url.startsWith('/api')) {
    return mockFetch(url, options);
  }
  return fetch(url, options);
};

/**
 * Custom hook para realizar requisições HTTP (GET/POST)
 * Usa Fetch API com useEffect para gerenciar o ciclo de vida
 * @param {string} url - URL da API
 * @param {object} options - Opções da requisição (method, body, etc.)
 */
function useApi(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para fazer requisição GET automaticamente quando o componente monta
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiFetch(url, {
          method: options.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          body: options.body ? JSON.stringify(options.body) : undefined,
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url, options.method, options.body]);

  // Função para fazer POST manualmente
  const postData = async (postUrl, body) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch(postUrl || url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função para refetch dos dados (GET)
  const refetch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData, refetch };
}

export default useApi;

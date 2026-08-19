import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

function respostaFilmes(filmes = []) {
  return {
    ok: true,
    json: async () => ({ results: filmes, page: 1, total_pages: 1 }),
  };
}

const espera = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respostaFilmes()));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('busca filmes populares assim que monta', async () => {
    render(<App />);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch.mock.calls[0][0]).toContain('/movie/popular');
  });

  it('espera o debounce antes de buscar pelo termo digitado', async () => {
    render(<App />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    fireEvent.change(screen.getByPlaceholderText('Busque por um filme...'), {
      target: { value: 'matrix' },
    });

    // Ainda dentro da janela de debounce (500ms): nenhuma nova requisição
    await espera(200);
    expect(fetch).toHaveBeenCalledTimes(1);

    // Passou dos 500ms: a busca dispara
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2), { timeout: 1000 });
    expect(fetch.mock.calls[1][0]).toContain('query=matrix');
  }, 10000);

  it('submeter o form busca na hora, sem esperar o debounce', async () => {
    render(<App />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    fireEvent.change(screen.getByPlaceholderText('Busque por um filme...'), {
      target: { value: 'matrix' },
    });
    fireEvent.click(screen.getByText('Pesquisar'));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    expect(fetch.mock.calls[1][0]).toContain('query=matrix');
  });
});

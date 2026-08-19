import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('chama aoMudar a cada tecla digitada', () => {
    const aoMudar = vi.fn();
    render(<SearchBar valor="" aoMudar={aoMudar} aoPesquisar={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText('Busque por um filme...'), {
      target: { value: 'matrix' },
    });

    expect(aoMudar).toHaveBeenCalledWith('matrix');
  });

  it('chama aoPesquisar ao submeter o form', () => {
    const aoPesquisar = vi.fn((e) => e.preventDefault());
    render(<SearchBar valor="matrix" aoMudar={() => {}} aoPesquisar={aoPesquisar} />);

    fireEvent.click(screen.getByText('Pesquisar'));

    expect(aoPesquisar).toHaveBeenCalledTimes(1);
  });
});

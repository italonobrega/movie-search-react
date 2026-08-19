import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MovieCard from './MovieCard';

const filme = {
  id: 1,
  title: 'Matrix',
  vote_average: 8.456,
  poster_path: '/poster.jpg',
};

describe('MovieCard', () => {
  it('mostra título e nota arredondada para uma casa decimal', () => {
    render(<MovieCard filme={filme} aoSelecionar={() => {}} />);

    expect(screen.getByText('Matrix')).toBeInTheDocument();
    expect(screen.getByText('⭐ 8.5')).toBeInTheDocument();
  });

  it('chama aoSelecionar com o filme ao clicar no card', () => {
    const aoSelecionar = vi.fn();
    render(<MovieCard filme={filme} aoSelecionar={aoSelecionar} />);

    fireEvent.click(screen.getByText('Matrix'));

    expect(aoSelecionar).toHaveBeenCalledWith(filme);
  });
});

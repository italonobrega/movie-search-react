import MovieCard from './MovieCard';

// Apenas renderiza a lista de filmes em grid, delegando cada card ao MovieCard
function MovieGrid({ filmes, aoSelecionarFilme, ehFavorito, aoAlternarFavorito }) {
  return (
    <div className="grid-filmes">
      {filmes.map((filme) => (
        <MovieCard
          key={filme.id}
          filme={filme}
          aoSelecionar={aoSelecionarFilme}
          favorito={ehFavorito(filme.id)}
          aoAlternarFavorito={aoAlternarFavorito}
        />
      ))}
    </div>
  );
}

export default MovieGrid;

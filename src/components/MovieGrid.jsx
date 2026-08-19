import MovieCard from './MovieCard';

// Apenas renderiza a lista de filmes em grid, delegando cada card ao MovieCard
function MovieGrid({ filmes, aoSelecionarFilme }) {
  return (
    <div className="grid-filmes">
      {filmes.map((filme) => (
        <MovieCard key={filme.id} filme={filme} aoSelecionar={aoSelecionarFilme} />
      ))}
    </div>
  );
}

export default MovieGrid;

// Um card individual do grid. Ao clicar, avisa o App qual filme foi selecionado.
function MovieCard({ filme, aoSelecionar, favorito, aoAlternarFavorito }) {
  // O botão de favorito fica em cima do card; sem isso, o clique nele também abriria o modal
  const aoClicarFavorito = (e) => {
    e.stopPropagation();
    aoAlternarFavorito(filme);
  };

  return (
    <div className="cartao-filme" onClick={() => aoSelecionar(filme)}>
      <button
        className={`botao-favorito${favorito ? ' botao-favorito--ativo' : ''}`}
        onClick={aoClicarFavorito}
        aria-label={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        aria-pressed={favorito}
      >
        {favorito ? '❤' : '🤍'}
      </button>

      <img
        src={
          filme.poster_path
            ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
            : 'https://via.placeholder.com/500x750?text=Sem+Capa'
        }
        alt={`Cartaz de ${filme.title}`}
      />
      <div className="info-filme">
        <h3>{filme.title}</h3>
        <p>⭐ {filme.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
}

export default MovieCard;

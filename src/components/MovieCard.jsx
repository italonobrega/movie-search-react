// Um card individual do grid. Ao clicar, avisa o App qual filme foi selecionado.
function MovieCard({ filme, aoSelecionar }) {
  return (
    <div className="cartao-filme" onClick={() => aoSelecionar(filme)}>
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

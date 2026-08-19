// Modal de detalhes. Usa os dados que já vieram na busca (sem precisar de outra chamada à API).
function MovieModal({ filme, aoFechar }) {
  // Clicar fora do card (no fundo escurecido) também fecha o modal
  const aoClicarFundo = (e) => {
    if (e.target === e.currentTarget) aoFechar();
  };

  return (
    <div className="modal-fundo" onClick={aoClicarFundo}>
      <div className="modal-conteudo">
        <button className="modal-fechar" onClick={aoFechar} aria-label="Fechar">
          ✕
        </button>

        <img
          src={
            filme.poster_path
              ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
              : 'https://via.placeholder.com/500x750?text=Sem+Capa'
          }
          alt={`Cartaz de ${filme.title}`}
        />

        <div className="modal-info">
          <h2>{filme.title}</h2>
          <p className="modal-meta">
            ⭐ {filme.vote_average.toFixed(1)} · {filme.release_date?.slice(0, 4) || 'Sem data'}
          </p>
          <p className="modal-sinopse">
            {filme.overview || 'Sinopse não disponível.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;

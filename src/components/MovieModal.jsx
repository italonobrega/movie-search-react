import { useEffect, useRef } from 'react';

// Modal de detalhes. Usa os dados que já vieram na busca (sem precisar de outra chamada à API).
function MovieModal({ filme, aoFechar, favorito, aoAlternarFavorito }) {
  const botaoFecharRef = useRef(null);

  // Fecha com a tecla Esc e já leva o foco pro botão de fechar ao abrir,
  // do jeito que um <dialog> nativo se comportaria.
  useEffect(() => {
    botaoFecharRef.current?.focus();

    const aoPressionarTecla = (e) => {
      if (e.key === 'Escape') aoFechar();
    };

    document.addEventListener('keydown', aoPressionarTecla);
    return () => document.removeEventListener('keydown', aoPressionarTecla);
  }, [aoFechar]);

  // Clicar fora do card (no fundo escurecido) também fecha o modal
  const aoClicarFundo = (e) => {
    if (e.target === e.currentTarget) aoFechar();
  };

  return (
    <div className="modal-fundo" onClick={aoClicarFundo}>
      <div
        className="modal-conteudo"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo-filme"
      >
        <button
          ref={botaoFecharRef}
          className="modal-fechar"
          onClick={aoFechar}
          aria-label="Fechar"
        >
          ✕
        </button>

        <button
          className={`botao-favorito${favorito ? ' botao-favorito--ativo' : ''} botao-favorito--modal`}
          onClick={aoAlternarFavorito}
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

        <div className="modal-info">
          <h2 id="modal-titulo-filme">{filme.title}</h2>
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

import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [filmes, setFilmes] = useState([]);
  const [busca, setBusca] = useState(''); // Novo estado para guardar o texto da busca

  // Função original para carregar os filmes populares ao abrir o site
  useEffect(() => {
    const buscarFilmesPopulares = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;

        const resposta = await fetch(url);
        const dados = await resposta.json();
        setFilmes(dados.results);
      } catch (erro) {
        console.error("Erro ao buscar filmes:", erro);
      }
    };

    buscarFilmesPopulares();
  }, []);

  // Nova função acionada pelo botão de pesquisar
  const pesquisarFilmes = async (evento) => {
    evento.preventDefault(); // Evita que a página recarregue ao enviar o formulário
    
    if (!busca) return; // Se o campo estiver vazio, não faz nada

    try {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      // Note que o link aqui é diferente, ele usa o /search/ e passa o que digitamos na variável ${busca}
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${busca}&page=1`;

      const resposta = await fetch(url);
      const dados = await resposta.json();
      setFilmes(dados.results); // Atualiza o grid com os novos resultados
    } catch (erro) {
      console.error("Erro ao pesquisar filmes:", erro);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>🎬 Movie Search</h1>
        
        {/* Formulário de Busca */}
        <form onSubmit={pesquisarFilmes} className="form-busca">
          <input 
            type="text" 
            placeholder="Busque por um filme..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)} // Atualiza o estado a cada letra digitada
          />
          <button type="submit">Pesquisar</button>
        </form>
      </header>

      <main>
        {/* O título muda dinamicamente dependendo de ter uma busca ativa ou não */}
        <h2 className="titulo-secao">
          {busca ? `Resultados para: ${busca}` : "Filmes Populares"}
        </h2>
        
        <div className="grid-filmes">
          {filmes.map((filme) => (
            <div className="cartao-filme" key={filme.id}>
              {/* Tratamento de erro: se o filme não tiver capa, mostra uma imagem genérica */}
              <img 
                src={filme.poster_path ? `https://image.tmdb.org/t/p/w500${filme.poster_path}` : 'https://via.placeholder.com/500x750?text=Sem+Capa'} 
                alt={`Cartaz de ${filme.title}`} 
              />
              <div className="info-filme">
                <h3>{filme.title}</h3>
                <p>⭐ {filme.vote_average.toFixed(1)}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
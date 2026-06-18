import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    // A função fica declarada apenas aqui dentro
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
  }, []); // O array vazio garante que rode apenas uma vez

  return (
    <div className="container">
      <header>
        <h1>🎬 Movie Search</h1>
      </header>

      <main>
        <h2 className="titulo-secao">Filmes Populares</h2>
        
        {/* Container do Grid */}
        <div className="grid-filmes">
          {filmes.map((filme) => (
            <div className="cartao-filme" key={filme.id}>
              {/* O TMDB exige este link base antes do 'poster_path' */}
              <img 
                src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`} 
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
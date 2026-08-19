import { useState, useEffect } from 'react';
import './index.css';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieModal from './components/MovieModal';
import Spinner from './components/Spinner';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function App() {
  const [filmes, setFilmes] = useState([]);
  const [busca, setBusca] = useState(''); // valor atual do input
  const [termoBuscado, setTermoBuscado] = useState(''); // termo da última busca confirmada (para paginar)

  // Começa "true" pois a primeira busca (filmes populares) já dispara ao montar o componente
  const [carregando, setCarregando] = useState(true); // primeira página (spinner central)
  const [carregandoMais, setCarregandoMais] = useState(false); // páginas seguintes (botão)
  const [erro, setErro] = useState(null);

  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const [filmeSelecionado, setFilmeSelecionado] = useState(null);

  // Monta a URL certa: busca por texto ou lista de populares
  const montarUrl = (termo, paginaAlvo) => {
    if (termo) {
      return `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${termo}&page=${paginaAlvo}`;
    }
    return `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${paginaAlvo}`;
  };

  // Função única que busca uma página (seja populares, seja resultado de pesquisa).
  // Quem chama já deixa "carregando"/"carregandoMais" true antes de chamar esta função;
  // aqui só resolvemos a requisição e desligamos os dois no final.
  const buscarFilmes = async (termo, paginaAlvo) => {
    const primeiraPagina = paginaAlvo === 1;

    try {
      const resposta = await fetch(montarUrl(termo, paginaAlvo));
      if (!resposta.ok) throw new Error('Falha na requisição');

      const dados = await resposta.json();
      setFilmes((atuais) => (primeiraPagina ? dados.results : [...atuais, ...dados.results]));
      setPagina(dados.page);
      setTotalPaginas(dados.total_pages);
    } catch (erro) {
      console.error('Erro ao buscar filmes:', erro);
      setErro('Não foi possível carregar os filmes. Tente novamente em instantes.');
    } finally {
      setCarregando(false);
      setCarregandoMais(false);
    }
  };

  // Carrega os filmes populares assim que o site abre.
  // Só deve rodar uma vez ao montar; buscarFilmes fica fora do efeito porque
  // também é reaproveitada pela busca e pelo "carregar mais".
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    buscarFilmes('', 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pesquisarFilmes = (evento) => {
    evento.preventDefault();
    if (!busca) return;
    setTermoBuscado(busca);
    setErro(null);
    setCarregando(true);
    buscarFilmes(busca, 1);
  };

  const carregarMais = () => {
    setErro(null);
    setCarregandoMais(true);
    buscarFilmes(termoBuscado, pagina + 1);
  };

  const temMaisPaginas = pagina < totalPaginas;

  return (
    <div className="container">
      <header>
        <h1>🎬 Movie Search</h1>
        <SearchBar valor={busca} aoMudar={setBusca} aoPesquisar={pesquisarFilmes} />
      </header>

      <main>
        <h2 className="titulo-secao">
          {termoBuscado ? `Resultados para: ${termoBuscado}` : 'Filmes Populares'}
        </h2>

        {erro && <p className="mensagem-erro">{erro}</p>}

        {carregando && <Spinner />}

        {!carregando && !erro && filmes.length === 0 && (
          <p className="mensagem-vazia">
            Nenhum filme encontrado para "{termoBuscado}". Tente outro termo.
          </p>
        )}

        {!carregando && filmes.length > 0 && (
          <>
            <MovieGrid filmes={filmes} aoSelecionarFilme={setFilmeSelecionado} />

            {temMaisPaginas && (
              <div className="area-carregar-mais">
                <button
                  className="botao-carregar-mais"
                  onClick={carregarMais}
                  disabled={carregandoMais}
                >
                  {carregandoMais ? 'Carregando...' : 'Carregar mais'}
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {filmeSelecionado && (
        <MovieModal filme={filmeSelecionado} aoFechar={() => setFilmeSelecionado(null)} />
      )}
    </div>
  );
}

export default App;

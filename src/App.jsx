import { useState, useEffect, useRef } from 'react';
import './index.css';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieModal from './components/MovieModal';
import Spinner from './components/Spinner';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const CHAVE_FAVORITOS = 'favoritos';

// Lê os favoritos salvos no localStorage (roda só uma vez, no valor inicial do state)
const lerFavoritosSalvos = () => {
  try {
    const salvos = localStorage.getItem(CHAVE_FAVORITOS);
    return salvos ? JSON.parse(salvos) : [];
  } catch {
    return [];
  }
};

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

  const [favoritos, setFavoritos] = useState(lerFavoritosSalvos);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);

  const primeiraRenderizacao = useRef(true); // evita que o efeito de debounce dispare uma busca ao montar
  const timerDebounceRef = useRef(null);

  // Mantém o localStorage sincronizado sempre que a lista de favoritos muda
  useEffect(() => {
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos));
  }, [favoritos]);

  const ehFavorito = (id) => favoritos.some((filme) => filme.id === id);

  const alternarFavorito = (filme) => {
    setFavoritos((atuais) =>
      ehFavorito(filme.id)
        ? atuais.filter((favorito) => favorito.id !== filme.id)
        : [...atuais, filme]
    );
  };

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

  // Dispara a busca de fato (usada tanto pelo debounce quanto pelo submit do form)
  const executarBusca = (termo) => {
    setTermoBuscado(termo);
    setErro(null);
    setCarregando(true);
    buscarFilmes(termo, 1);
  };

  // Busca automaticamente enquanto o usuário digita, com debounce de 500ms
  // pra não disparar uma requisição a cada tecla pressionada.
  useEffect(() => {
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false;
      return;
    }

    timerDebounceRef.current = setTimeout(() => executarBusca(busca), 500);
    return () => clearTimeout(timerDebounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busca]);

  // Enter ou clique em "Pesquisar": cancela o debounce pendente e busca na hora
  const pesquisarFilmes = (evento) => {
    evento.preventDefault();
    clearTimeout(timerDebounceRef.current);
    executarBusca(busca);
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
        <button
          className="botao-favoritos"
          onClick={() => setMostrarFavoritos((atual) => !atual)}
        >
          {mostrarFavoritos ? '← Voltar' : `❤ Favoritos (${favoritos.length})`}
        </button>
      </header>

      <main>
        {mostrarFavoritos ? (
          <>
            <h2 className="titulo-secao">Meus Favoritos</h2>

            {favoritos.length === 0 ? (
              <p className="mensagem-vazia">
                Você ainda não favoritou nenhum filme. Clique no ❤ de um filme pra
                salvá-lo aqui.
              </p>
            ) : (
              <MovieGrid
                filmes={favoritos}
                aoSelecionarFilme={setFilmeSelecionado}
                ehFavorito={ehFavorito}
                aoAlternarFavorito={alternarFavorito}
              />
            )}
          </>
        ) : (
          <>
            <h2 className="titulo-secao">
              {termoBuscado ? `Resultados para: ${termoBuscado}` : 'Filmes Populares'}
            </h2>

            {erro && filmes.length === 0 && <p className="mensagem-erro">{erro}</p>}

            {carregando && <Spinner />}

            {!carregando && !erro && filmes.length === 0 && (
              <p className="mensagem-vazia">
                Nenhum filme encontrado para "{termoBuscado}". Tente outro termo.
              </p>
            )}

            {!carregando && filmes.length > 0 && (
              <>
                <MovieGrid
                  filmes={filmes}
                  aoSelecionarFilme={setFilmeSelecionado}
                  ehFavorito={ehFavorito}
                  aoAlternarFavorito={alternarFavorito}
                />

                {erro && (
                  <p className="mensagem-erro mensagem-erro--paginacao">{erro}</p>
                )}

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
          </>
        )}
      </main>

      {filmeSelecionado && (
        <MovieModal
          filme={filmeSelecionado}
          aoFechar={() => setFilmeSelecionado(null)}
          favorito={ehFavorito(filmeSelecionado.id)}
          aoAlternarFavorito={() => alternarFavorito(filmeSelecionado)}
        />
      )}
    </div>
  );
}

export default App;

// Barra de busca: input controlado + botão de pesquisar
function SearchBar({ valor, aoMudar, aoPesquisar }) {
  return (
    <form onSubmit={aoPesquisar} className="form-busca">
      <input
        type="text"
        placeholder="Busque por um filme..."
        value={valor}
        onChange={(e) => aoMudar(e.target.value)}
      />
      <button type="submit">Pesquisar</button>
    </form>
  );
}

export default SearchBar;

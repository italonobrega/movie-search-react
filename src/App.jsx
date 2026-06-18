function App() {
  // Testando a leitura da chave (você pode apagar esta linha depois de confirmar no F12)
  console.log("Minha chave da API:", import.meta.env.VITE_TMDB_API_KEY);

  return (
    <div>
      <h1>Movie Search</h1>
      <p>Projeto React configurado e pronto.</p>
    </div>
  )
}

export default App
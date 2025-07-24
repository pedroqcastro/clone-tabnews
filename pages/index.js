function Home() {
  const estiloGamer = {
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
    padding: "20px",
    backgroundColor: "#f0f0f0",
    lineHeight: 1.6,
    fontSize: "1.1em",
    color: "#333",
  };

  const estiloTitulo = {
    fontSize: "2em",
    marginBottom: "0.5em",
  };

  return (
    <div style={estiloGamer}>
      <h1 style={estiloTitulo}>Seja bem-vindo ao 🕹️ gamedevnews 🎮!</h1>
      <p>
        Aqui, você encontrará um ambiente colaborativo, cheio de ideias e
        conteúdo sobre as mais diferentes facetas do{" "}
        <strong>game development</strong>, como música, gráfico, narrativa,
        trilha sonora, programação, matemática, física e game design.
      </p>
      <p>Ainda em construção... 🏗️</p>
    </div>
  );
}

export default Home;

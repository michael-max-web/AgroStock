import "./PaginaInicial.css";
import { useNavigate } from "react-router-dom";

function PaginaInicial() {
  const navigate = useNavigate();

  return (
    <div className="pagina-inicial">

      <div className="pagina-inicial__card">
        <div className="pagina-inicial__conteudo">

          <header className="cabecalho__root">
            <img src="/logo.png" height="32" alt="Logo" />
          </header>

          <h1>
            Controle inteligente do estoque de sementes.
          </h1>

          <div className="pagina-inicial__botoes">

            <button
              className="botao-home primario"
              onClick={() => navigate("/lista-produtos")}
            >
              Lista de Produtos
            </button>

            <button
              className="botao-home secundario"
              onClick={() => navigate("/cadastro-produtos")}
            >
              Cadastro de Produtos
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}

export default PaginaInicial;
import "./PaginaInicial.css";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../../componentes/Cabecalho/Cabecalho";
import Rodape from "../../componentes/Rodape/Rodape";

function PaginaInicial() {
  const navigate = useNavigate();

  return (
    <div className="pagina-inicial">
      <div className="pagina-inicial__card">
        <Cabecalho noCard />
        <h1>Controle inteligente do estoque de sementes.</h1>
        <div className="pagina-inicial__botoes">
          <button className="botao-home primario" onClick={() => navigate("/lista-produtos")}>
            Lista de Produtos
          </button>
          <button className="botao-home secundario" onClick={() => navigate("/cadastro-produtos")}>
            Cadastro de Produtos
          </button>
        </div>
      </div>
    </div>
  );

}

export default PaginaInicial;
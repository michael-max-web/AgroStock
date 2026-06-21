import { Link } from "react-router-dom";

import { useAppContext } from "../../contexto/AppContext";
import Avatar from "../Avatar/Avatar";
import "./Cabecalho.css";

function Cabecalho({ noCard }) {
  const { usuarioLogado } = useAppContext();

  return (
    <header className={noCard ? "cabecalho--no-card" : "cabecalho--topo"}>
      <Link to="/">
        <img src="/logo.png" alt="AgroStock Logo" />
      </Link>

      {!noCard && usuarioLogado && (
        <Link to="/meu-perfil">
          <Avatar nome={usuarioLogado.nome} imagem={usuarioLogado.foto} />
        </Link>
      )}
    </header>
  );
}

export default Cabecalho;
import { useAppContext } from "../../contexto/AppContext";
import Avatar from "../Avatar/Avatar";
import "./Cabecalho.css";

function Cabecalho({ noCard }) {
  const { usuarioLogado } = useAppContext();

  return (
    <header className={noCard ? "cabecalho--no-card" : "cabecalho--topo"}>
      <a href="/">
        <img src="/logo.png" alt="AgroStock Logo" />
      </a>

      {!noCard && usuarioLogado && (
        <a href="/meu-perfil">
          <Avatar nome={usuarioLogado.nome} imagem={usuarioLogado.foto} />
        </a>
      )}
    </header>
  );
}

export default Cabecalho;
import Avatar from "../Avatar/Avatar";
import "./Cabecalho.css";

function Cabecalho({ noCard }) {
  return (
    <header className={noCard ? "cabecalho--no-card" : "cabecalho--topo"}>
      <img src="/logo.png" alt="AgroStock Logo" />
      {!noCard && <Avatar nome="Agro Stock" />}
    </header>
  );
}

export default Cabecalho;
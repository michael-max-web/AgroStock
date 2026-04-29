import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import "./PaginaInicial.css";

import { useNavigate } from "react-router-dom";

function PaginaInicial() {
    const navigate = useNavigate();

  return (
  <Principal>
    <p>Bem-vindo ao AgroStock 🌱</p>

    <BotaoCustomizado
      tipo="primario" 
      aoClicar={() => navigate("/lista-produtos")}>
      Lista de Produtos
    </BotaoCustomizado>
  </Principal>
);
}

export default PaginaInicial;
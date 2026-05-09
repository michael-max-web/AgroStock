import "./Principal.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Principal({ voltarPara, titulo, children }) {
  const navigate = useNavigate();

  return (
    <main className="container-principal">
      <div className="topo-pagina">
        {voltarPara && (
          <button className="btn-voltar" onClick={() => navigate(voltarPara)}>
            <IoIosArrowBack size={26} />
          </button>
        )}
        <h1>{titulo}</h1>
      </div>
      <div className="conteudo-pagina">
        {children}
      </div>
    </main>
  );
}

export default Principal;
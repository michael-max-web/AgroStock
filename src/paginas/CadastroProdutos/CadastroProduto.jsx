import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Principal from "../../componentes/Principal/Principal";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import "./CadastroProduto.css"; // Certifique-se de importar o CSS

function CadastroProduto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [form, setForm] = useState({
    lote: "",
    descricaoProduto: "",
    quantidadePorPalete: "",
    dataValidade: "",
    posicao: ""
  });

  const queryParams = new URLSearchParams(location.search);
  const veioDaLista = queryParams.get("origem") === "lista";

  useEffect(() => {
    if (id) {
      const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
      const produtoParaEditar = produtos.find(p => p.id === id);
      if (produtoParaEditar) setForm(produtoParaEditar);
    }
  }, [id]);

  const validarLote = (lote) => {
    const regexLote = /^[A-Z]{3}\d{7}$/;
    return regexLote.test(lote);
  };

  const salvar = (e) => {
    e.preventDefault();
    
    if (!form.lote || !form.descricaoProduto || !form.quantidadePorPalete || !form.dataValidade || !form.posicao) {
      return toast.warning("Todos os campos devem ser preenchidos!");
    }

    if (!validarLote(form.lote)) {
      return toast.error("Lote inválido!");
    }

    const dataHoje = new Date();
    dataHoje.setHours(0, 0, 0, 0);
    const dataInserida = new Date(form.dataValidade);
    dataInserida.setHours(24, 0, 0, 0);

    if (dataInserida < dataHoje) {
      return toast.error("Data de validade vencida!");
    }

    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const posicaoOcupada = produtos.find(p => 
      p.posicao.trim().toUpperCase() === form.posicao.trim().toUpperCase() && p.id !== id
    );

    if (posicaoOcupada) {
      return toast.error(`A posição ${form.posicao} já está ocupada!`);
    }

    if (id) {
      const listaAtualizada = produtos.map(p => p.id === id ? { ...form } : p);
      localStorage.setItem("produtos", JSON.stringify(listaAtualizada));
      toast.success("Atualizado com sucesso!");
    } else {
      const novo = { ...form, id: crypto.randomUUID() };
      produtos.push(novo);
      localStorage.setItem("produtos", JSON.stringify(produtos));
      toast.success("Palete alocado com sucesso!");
    }

    navigate("/lista-produtos");
  };

  const destinoVoltar = (id || veioDaLista) ? "/lista-produtos" : "/";

  return (
    <Principal 
      titulo={id ? "Editar Localização" : "Cadastro de Palete"} 
      voltarPara={destinoVoltar}
    >
      <form className="formulario-container" onSubmit={salvar}>
        
        <CampoCustomizado 
          label="Lote" 
          placeholder="SOJ2026001"
          value={form.lote} 
          onChange={e => setForm({...form, lote: e.target.value.toUpperCase().trim()})} 
        />

        <CampoCustomizado 
          label="Endereço (Posição)" 
          placeholder="1A-01-01"
          value={form.posicao} 
          onChange={e => setForm({...form, posicao: e.target.value.toUpperCase().trim()})} 
        />

        {/* Div com classe especial para ocupar a linha toda */}
        <div className="campo-descricao">
          <CampoCustomizado 
            label="Descrição do Produto" 
            value={form.descricaoProduto} 
            onChange={e => setForm({...form, descricaoProduto: e.target.value})} 
          />
        </div>

        <CampoCustomizado 
          label="Quantidade (Sacas)" 
          type="number" 
          value={form.quantidadePorPalete} 
          onChange={e => setForm({...form, quantidadePorPalete: e.target.value})} 
        />

        <CampoCustomizado 
          label="Data de Validade" 
          type="date" 
          value={form.dataValidade} 
          onChange={e => setForm({...form, dataValidade: e.target.value})} 
        />
        
        <button type="submit" className="btn-finalizar">
          {id ? "Salvar Alterações" : "Confirmar Alocação"}
        </button>
      </form>
    </Principal>
  );
}

export default CadastroProduto;
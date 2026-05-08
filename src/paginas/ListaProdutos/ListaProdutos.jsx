import { useEffect, useState } from "react";
import "./ListaProdutos.css";
import Principal from "../../componentes/Principal/Principal";
import { toast } from "react-toastify";
import { MdAddCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function ListaProdutos() {
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState([]);
  const [buscaLote, setBuscaLote] = useState("");
  const [buscaQuantidade, setBuscaQuantidade] = useState("");

  useEffect(() => {
    carregarProdutos();
  }, []);

  function carregarProdutos() {
    const dados = JSON.parse(localStorage.getItem("produtos")) || [];
    setProdutos(dados);
  }

  function excluir(id) {
    if (confirm("Tem certeza que deseja excluir este palete?")) {
      const novos = produtos.filter((p) => p.id !== id);
      localStorage.setItem("produtos", JSON.stringify(novos));
      setProdutos(novos);
      toast.success("Palete excluído!");
    }
  }

  function atualizarQuantidade(id, novaQuantidade) {
    if (novaQuantidade < 0) return;

    const novos = produtos.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          quantidadePorPalete: Number(novaQuantidade),
        };
      }
      return p;
    });

    localStorage.setItem("produtos", JSON.stringify(novos));
    setProdutos(novos);
  }

  const produtosFiltrados = produtos.filter((p) => {
    const matchLote = p.lote
      .toLowerCase()
      .includes(buscaLote.toLowerCase());

    const matchQuantidade = buscaQuantidade
      ? p.quantidadePorPalete === Number(buscaQuantidade)
      : true;

    return matchLote && matchQuantidade;
  });

  return (
    <Principal voltarPara="/" titulo="Controle de Paletes">

      {/* 🔍 BUSCAS */}
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Buscar por lote..."
          className="input-busca"
          value={buscaLote}
          onChange={(e) => setBuscaLote(e.target.value)}
        />

        <input
          type="number"
          placeholder="Buscar por quantidade..."
          className="input-busca"
          value={buscaQuantidade}
          onChange={(e) => setBuscaQuantidade(e.target.value)}
        />
      </div>

 <div className="container-tabela">
  <table className="tabela">
    <thead>
      <tr>
        <th>Lote</th>
        <th>Descrição</th>
        <th>Qtd</th>
        <th>Validade</th>
        <th>Posição</th>
        <th>Ações</th>
      </tr>
    </thead>

    <tbody>
      {produtosFiltrados.map((p) => (
        <tr key={p.id}>
          <td>{p.lote}</td>
          <td>{p.descricaoProduto}</td>
          <td>
            <input
              type="number"
              value={p.quantidadePorPalete}
              onChange={(e) =>
                atualizarQuantidade(p.id, e.target.value)
              }
              className="input-qtd"
            />
          </td>
          <td>{p.dataValidade || "-"}</td>
          <td>{p.posicao}</td>
          <td>
            <button
              className="btn-excluir"
              onClick={() => excluir(p.id)}
            >
              Excluir
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* 📱 CARDS MOBILE */}
<div className="lista-cards">
  {produtosFiltrados.map((p) => (
    <div className="card" key={p.id}>
      <div className="card-header">
        <strong>{p.lote}</strong>
      </div>

      <div className="card-body">
        <p><b>Produto:</b> {p.descricaoProduto}</p>

        <p>
          <b>Qtd:</b>
          <input
            type="number"
            value={p.quantidadePorPalete}
            onChange={(e) =>
              atualizarQuantidade(p.id, e.target.value)
            }
            className="input-qtd"
          />
        </p>

        <p><b>Validade:</b> {p.dataValidade || "-"}</p>
        <p><b>Posição:</b> {p.posicao}</p>
      </div>

      <div className="card-footer">
        <button
          className="btn-excluir"
          onClick={() => excluir(p.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  ))}
</div>

      {/* ➕ BOTÃO ADICIONAR */}
      <MdAddCircle
        className="botao-adicionar"
        size={64}
        color="#22c55e"
        onClick={() => navigate("/cadastro-produtos")}
        title="Cadastrar novo palete"
      />

    </Principal>
  );
}

export default ListaProdutos;
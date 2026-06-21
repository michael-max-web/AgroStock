import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  MdAddCircle,
  MdEdit,
  MdDelete,
  MdSearch,
  MdFilterList,
  MdWarehouse,
} from "react-icons/md";

import Principal from "../../componentes/Principal/Principal";

import { useAppContext } from "../../contexto/AppContext";
import { setores } from "../../servicos/setores";

import "./ListaProdutos.css";

function ListaProdutos() {
  const navigate = useNavigate();
  const { usuarioLogado } = useAppContext();

  const [produtos, setProdutos] = useState([]);
  const [buscaLote, setBuscaLote] = useState("");
  const [buscaQtd, setBuscaQtd] = useState("");
  const [buscaSetor, setBuscaSetor] = useState("");

  const usuarioAdministrador = usuarioLogado?.perfil === "administrador";

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("produtos")) || [];
    setProdutos(dados);
  }, []);

  const salvarNoStorage = (novaLista) => {
    localStorage.setItem("produtos", JSON.stringify(novaLista));
    setProdutos(novaLista);
  };

  const mudarQtd = (id, valor) => {
    const atualizados = produtos.map((p) =>
      p.id === id
        ? {
          ...p,
          quantidadePorPalete: valor,
        }
        : p
    );

    salvarNoStorage(atualizados);
  };

  const excluir = (id) => {
    if (window.confirm("Deseja realmente remover este item?")) {
      const filtrados = produtos.filter((p) => p.id !== id);

      salvarNoStorage(filtrados);

      toast.success("Removido com sucesso!");
    }
  };

  const produtosPermitidos = usuarioAdministrador
    ? produtos
    : produtos.filter((p) => p.setor === usuarioLogado?.setor);

  const produtosFiltrados = produtosPermitidos
    .filter((p) => {
      const termoLote = buscaLote.toUpperCase().trim();
      const termoQtd = buscaQtd.trim();

      const matchLote =
        termoLote === "" ||
        p.lote.toUpperCase().includes(termoLote);

      const matchQtd =
        termoQtd === "" ||
        p.quantidadePorPalete.toString().startsWith(termoQtd);

      const matchSetor =
        !usuarioAdministrador || buscaSetor === "" || p.setor === buscaSetor;

      return matchLote && matchQtd && matchSetor;
    })
    .sort((a, b) => {
      const regex = /^(\d+)([A-Z])-(\d+)-(\d+)$/;

      const matchA = a.posicao.match(regex);
      const matchB = b.posicao.match(regex);

      if (!matchA || !matchB) {
        return a.posicao.localeCompare(b.posicao);
      }

      const [, armazemA, ruaA, posicaoA, nivelA] = matchA;
      const [, armazemB, ruaB, posicaoB, nivelB] = matchB;

      if (Number(armazemA) !== Number(armazemB)) {
        return Number(armazemA) - Number(armazemB);
      }

      if (ruaA !== ruaB) {
        return ruaA.localeCompare(ruaB);
      }

      if (Number(posicaoA) !== Number(posicaoB)) {
        return Number(posicaoA) - Number(posicaoB);
      }

      return Number(nivelA) - Number(nivelB);
    });

  const formatarData = (data) => {
    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;
  };

  return (
    <Principal voltarPara="/" titulo="Inventário Atual">
      <div className="secao-filtros">
        <div className="input-busca-wrapper">
          <MdSearch size={20} className="icone-busca" />

          <input
            type="text"
            placeholder="Filtrar por Lote..."
            value={buscaLote}
            onChange={(e) => setBuscaLote(e.target.value)}
          />
        </div>

        <div className="input-busca-wrapper">
          <MdFilterList size={20} className="icone-busca" />

          <input
            type="number"
            placeholder="Quantidade..."
            value={buscaQtd}
            onChange={(e) => setBuscaQtd(e.target.value)}
          />
        </div>

        {usuarioAdministrador && (
          <div className="input-busca-wrapper">
            <MdWarehouse size={20} className="icone-busca" />

            <select
              value={buscaSetor}
              onChange={(e) => setBuscaSetor(e.target.value)}
            >
              <option value="">Todos os setores</option>

              {setores.map((setor) => (
                <option key={setor} value={setor}>
                  {setor}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="grid-produtos">
        {produtosFiltrados.length === 0 && (
          <p className="msg-vazio">
            Nenhum palete corresponde aos filtros aplicados.
          </p>
        )}

        {produtosFiltrados.map((p) => (
          <div className="card-item-agro" key={p.id}>
            <div className="card-header">
              <span className="lote-tag">{p.lote}</span>

              <span className="posicao-tag">{p.posicao}</span>
            </div>

            {usuarioAdministrador && (
              <span className="setor-tag">{p.setor || "Sem setor"}</span>
            )}

            <h3>{p.descricaoProduto}</h3>

            <p className="validade">
              Vence em: {formatarData(p.dataValidade)}
            </p>

            <div className="card-acoes">
              <div className="campo-qtd-direta">
                <span>Qtd:</span>

                <input
                  type="number"
                  value={p.quantidadePorPalete}
                  onChange={(e) => mudarQtd(p.id, e.target.value)}
                />
              </div>

              <div className="botoes-grupo">
                <button
                  className="btn-edit"
                  onClick={() => navigate(`/cadastro-produtos/${p.id}`)}
                >
                  <MdEdit size={20} />
                </button>

                <button className="btn-del" onClick={() => excluir(p.id)}>
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="btn-flutuante"
        onClick={() => navigate("/cadastro-produtos?origem=lista")}
      >
        <MdAddCircle size={60} />
      </button>
    </Principal>
  );
}

export default ListaProdutos;
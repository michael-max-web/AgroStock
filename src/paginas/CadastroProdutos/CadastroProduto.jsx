import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import Principal from "../../componentes/Principal/Principal";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";

import { useAppContext } from "../../contexto/AppContext";
import { setores } from "../../servicos/setores";

import validarPosicao from "../../utils/validarPosicao";

import "./CadastroProduto.css";

function CadastroProduto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const { usuarioLogado } = useAppContext();

  const [form, setForm] = useState({
    lote: "",
    descricaoProduto: "",
    quantidadePorPalete: "",
    dataValidade: "",
    posicao: "",
    setor: "",
  });

  const queryParams = new URLSearchParams(location.search);
  const veioDaLista = queryParams.get("origem") === "lista";

  const usuarioAdministrador = usuarioLogado?.perfil === "administrador";

  useEffect(() => {
    if (id) {
      const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
      const produtoParaEditar = produtos.find((p) => p.id === id);

      if (!produtoParaEditar) {
        toast.error("Produto não encontrado!");
        navigate("/lista-produtos");
        return;
      }

      if (
        usuarioLogado?.perfil !== "administrador" &&
        produtoParaEditar.setor !== usuarioLogado?.setor
      ) {
        toast.error("Você não tem permissão para editar este produto.");
        navigate("/lista-produtos");
        return;
      }

      setForm(produtoParaEditar);
    }
  }, [id, navigate, usuarioLogado]);

  const validarLote = (lote) => {
    const regexLote = /^[A-Z]{3}\d{7}$/;
    return regexLote.test(lote);
  };

  const salvar = (e) => {
    e.preventDefault();

    const setorProduto = usuarioAdministrador ? form.setor : usuarioLogado?.setor;

    if (
      !form.lote ||
      !form.descricaoProduto ||
      !form.quantidadePorPalete ||
      !form.dataValidade ||
      !form.posicao
    ) {
      return toast.warning("Todos os campos devem ser preenchidos!");
    }

    if (usuarioAdministrador && !form.setor) {
      return toast.warning("Selecione o setor/fazenda do produto!");
    }

    if (!validarLote(form.lote)) {
      return toast.error("Lote inválido!");
    }

    if (!validarPosicao(form.posicao)) {
      return toast.error("Posição inválida!");
    }

    const dataHoje = new Date();
    dataHoje.setHours(0, 0, 0, 0);

    const dataInserida = new Date(form.dataValidade);
    dataInserida.setHours(24, 0, 0, 0);

    if (dataInserida < dataHoje) {
      return toast.error("Data de validade vencida!");
    }

    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    const posicaoOcupada = produtos.find(
      (p) =>
        p.posicao.trim().toUpperCase() === form.posicao.trim().toUpperCase() &&
        p.setor === setorProduto &&
        p.id !== id
    );

    if (posicaoOcupada) {
      return toast.error(
        `A posição ${form.posicao} já está ocupada em ${setorProduto}!`
      );
    }

    if (id) {
      const listaAtualizada = produtos.map((p) =>
        p.id === id
          ? {
              ...form,
              setor: setorProduto,
              usuarioId: form.usuarioId || usuarioLogado.id,
            }
          : p
      );

      localStorage.setItem("produtos", JSON.stringify(listaAtualizada));
      toast.success("Atualizado com sucesso!");
    } else {
      const novo = {
        ...form,
        id: crypto.randomUUID(),
        usuarioId: usuarioLogado.id,
        setor: setorProduto,
      };

      produtos.push(novo);

      localStorage.setItem("produtos", JSON.stringify(produtos));
      toast.success("Palete alocado com sucesso!");
    }

    navigate("/lista-produtos");
  };

  const destinoVoltar = id || veioDaLista ? "/lista-produtos" : "/";

  return (
    <Principal
      titulo={id ? "Editar Informações" : "Cadastro de Palete"}
      voltarPara={destinoVoltar}
    >
      <form className="formulario-container" onSubmit={salvar}>
        {usuarioAdministrador && (
          <div className="cadastro-produto__grupo-select">
            <label>Setor/Fazenda</label>

            <div className="cadastro-produto__select-wrapper">
              <select
                className="cadastro-produto__select"
                value={form.setor}
                onChange={(e) =>
                  setForm({
                    ...form,
                    setor: e.target.value,
                  })
                }
              >
                <option value="">Selecione um setor</option>

                {setores.map((setor) => (
                  <option key={setor} value={setor}>
                    {setor}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <CampoCustomizado
          label="Lote"
          placeholder="Ex.: SOJ0000000"
          value={form.lote}
          onChange={(e) =>
            setForm({
              ...form,
              lote: e.target.value.toUpperCase().trim(),
            })
          }
        />

        <CampoCustomizado
          label="Endereço (Posição)"
          placeholder="Ex.: 1A-01-01"
          value={form.posicao}
          onChange={(e) =>
            setForm({
              ...form,
              posicao: e.target.value.toUpperCase().trim(),
            })
          }
        />

        <div className="campo-descricao">
          <CampoCustomizado
            label="Descrição do Produto"
            placeholder="Ex.: Soja Transgênica Tipo A"
            value={form.descricaoProduto}
            onChange={(e) =>
              setForm({
                ...form,
                descricaoProduto: e.target.value,
              })
            }
          />
        </div>

        <CampoCustomizado
          label="Quantidade (Sacas)"
          placeholder="Ex.: 50"
          type="number"
          value={form.quantidadePorPalete}
          onChange={(e) =>
            setForm({
              ...form,
              quantidadePorPalete: e.target.value,
            })
          }
        />

        <CampoCustomizado
          label="Data de Validade"
          type="date"
          value={form.dataValidade}
          onChange={(e) =>
            setForm({
              ...form,
              dataValidade: e.target.value,
            })
          }
        />

        <button type="submit" className="btn-finalizar">
          {id ? "Salvar Alterações" : "Confirmar Alocação"}
        </button>
      </form>
    </Principal>
  );
}

export default CadastroProduto;
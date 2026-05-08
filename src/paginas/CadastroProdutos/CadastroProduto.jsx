import { useState } from "react";
import { toast } from "react-toastify";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import { useNavigate } from "react-router-dom";
import "./CadastroProduto.css";

function CadastroProduto() {
  const navigate = useNavigate();

  const [produto, setProduto] = useState({
    lote: "",
    descricaoProduto: "",
    quantidadePorPalete: "",
    dataValidade: "",
    posicao: "",
  });

  // 🔍 Validação de lote
  function validarLote(lote) {
    const regex = /^[A-Z]{3}\d{7}$/;
    return regex.test(lote);
  }

  // 🔍 Validação de posição
  function validarPosicao(posicao) {
    const regex = /^\d+[A-Z]-\d{2}-\d{2}$/;
    return regex.test(posicao);
  }

  const salvar = () => {
    // ✅ LOTE
    if (!produto.lote.trim()) {
      toast.error("Lote é obrigatório!");
      return;
    }

    if (!validarLote(produto.lote)) {
      toast.error("Formato de lote inválido! Ex: SOJ2026001");
      return;
    }

    // ✅ DESCRIÇÃO
    if (!produto.descricaoProduto.trim()) {
      toast.error("Descrição é obrigatória!");
      return;
    }

    // ✅ QUANTIDADE
    if (
      !produto.quantidadePorPalete ||
      produto.quantidadePorPalete <= 0
    ) {
      toast.error(
        "Quantidade por palete deve ser maior que zero!"
      );
      return;
    }

    // ✅ DATA OBRIGATÓRIA
    if (!produto.dataValidade) {
      toast.error("Data de validade é obrigatória!");
      return;
    }

    // ✅ PRODUTO VENCIDO
    const hoje = new Date();
    const validade = new Date(produto.dataValidade);

    hoje.setHours(0, 0, 0, 0);
    validade.setHours(0, 0, 0, 0);

    if (validade < hoje) {
      toast.error("Esse produto está vencido!");
      return;
    }

    // ✅ POSIÇÃO
    if (!produto.posicao.trim()) {
      toast.error("Posição é obrigatória!");
      return;
    }

    if (!validarPosicao(produto.posicao)) {
      toast.error("Posição inválida! Ex: 1A-02-10");
      return;
    }

    const produtos =
      JSON.parse(localStorage.getItem("produtos")) || [];

    // 🚨 POSIÇÃO NÃO PODE REPETIR
    const posicaoJaExiste = produtos.some(
      (p) => p.posicao === produto.posicao
    );

    if (posicaoJaExiste) {
      toast.error("Essa posição já está ocupada!");
      return;
    }

    const novoProduto = {
      id: crypto.randomUUID(),
      ...produto,
      quantidadePorPalete: Number(
        produto.quantidadePorPalete
      ),
    };

    produtos.push(novoProduto);

    localStorage.setItem(
      "produtos",
      JSON.stringify(produtos)
    );

    toast.success("Palete cadastrado com sucesso!");

    navigate("/lista-produtos");
  };

  return (
    <Principal titulo="Cadastro de Palete" voltarPara="/">
      <div className="formulario">

        <CampoCustomizado
          label="Lote"
          obrigatorio
          value={produto.lote}
          onChange={(e) =>
            setProduto({
              ...produto,
              lote: e.target.value.toUpperCase(),
            })
          }
          onBlur={(e) => {
            if (
              e.target.value.trim() &&
              !validarLote(e.target.value)
            ) {
              toast.error(
                "Formato de lote inválido! Ex: SOJ2026001"
              );
            }
          }}
        />

        <CampoCustomizado
          label="Descrição do Produto"
          obrigatorio
          value={produto.descricaoProduto}
          onChange={(e) =>
            setProduto({
              ...produto,
              descricaoProduto: e.target.value,
            })
          }
        />

        <CampoCustomizado
          type="number"
          label="Quantidade (sacas por palete)"
          obrigatorio
          value={produto.quantidadePorPalete}
          onChange={(e) =>
            setProduto({
              ...produto,
              quantidadePorPalete: e.target.value,
            })
          }
        />

        <CampoCustomizado
          type="date"
          label="Data de Validade"
          obrigatorio
          value={produto.dataValidade}
          onChange={(e) =>
            setProduto({
              ...produto,
              dataValidade: e.target.value,
            })
          }
        />

        <CampoCustomizado
          label="Posição (Ex: 1A-02-10)"
          obrigatorio
          value={produto.posicao}
          onChange={(e) =>
            setProduto({
              ...produto,
              posicao: e.target.value.toUpperCase(),
            })
          }
          onBlur={(e) => {
            if (
              e.target.value.trim() &&
              !validarPosicao(e.target.value)
            ) {
              toast.error(
                "Posição inválida! Ex: 1A-02-10"
              );
            }
          }}
        />

        <BotaoCustomizado
          tipo="primario"
          aoClicar={salvar}
        >
          Salvar
        </BotaoCustomizado>

      </div>
    </Principal>
  );
}

export default CadastroProduto;
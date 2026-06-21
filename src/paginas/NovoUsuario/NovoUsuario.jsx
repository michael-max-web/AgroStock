import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Principal from "../../componentes/Principal/Principal";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import { setores } from "../../servicos/setores";
import "../../paginas/PaginaInicial/PaginaInicial.css";

import "./NovoUsuario.css";

function NovoUsuario() {
    const navigate = useNavigate();

    const [usuarioForm, setUsuarioForm] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmacaoSenha: "",
        perfil: "usuario",
        setor: "",
        foto: "",
    });

    const salvar = () => {
        if (
            !usuarioForm.nome.trim() ||
            !usuarioForm.email.trim() ||
            !usuarioForm.senha.trim() ||
            !usuarioForm.confirmacaoSenha.trim()
        ) {
            toast.error("Todos os campos são obrigatórios.");
            return;
        }

        if (usuarioForm.perfil === "usuario" && !usuarioForm.setor) {
            toast.error("Selecione uma Fazenda/Setor.");
            return;
        }

        if (usuarioForm.senha.length < 4) {
            toast.error("A senha deve conter no mínimo 4 caracteres.");
            return;
        }

        if (usuarioForm.senha !== usuarioForm.confirmacaoSenha) {
            toast.error("As senhas não coincidem.");
            return;
        }

        const usuariosDoLocalStorage =
            JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuarioJaCadastrado = usuariosDoLocalStorage.find(
            (usuario) => usuario.email === usuarioForm.email
        );

        if (usuarioJaCadastrado) {
            toast.error("Este email já está cadastrado.");
            return;
        }

        const novoUsuario = {
            id: crypto.randomUUID(),
            nome: usuarioForm.nome,
            email: usuarioForm.email,
            senha: usuarioForm.senha,
            perfil: usuarioForm.perfil,
            setor: usuarioForm.perfil === "administrador" ? "" : usuarioForm.setor,
            foto: "",
        };

        usuariosDoLocalStorage.push(novoUsuario);

        localStorage.setItem("usuarios", JSON.stringify(usuariosDoLocalStorage));

        toast.success("Usuário cadastrado com sucesso!");
        navigate("/login");
    };

    return (
        <Principal titulo="Novo Usuário" voltarPara="/login">
            <div className="novo-usuario__container">
                <CampoCustomizado
                    label="Nome"
                    value={usuarioForm.nome}
                    onChange={(e) =>
                        setUsuarioForm({ ...usuarioForm, nome: e.target.value })
                    }
                />

                <CampoCustomizado
                    label="Email"
                    type="email"
                    value={usuarioForm.email}
                    onChange={(e) =>
                        setUsuarioForm({ ...usuarioForm, email: e.target.value })
                    }
                />

                <CampoCustomizado
                    label="Senha"
                    type="password"
                    value={usuarioForm.senha}
                    onChange={(e) =>
                        setUsuarioForm({ ...usuarioForm, senha: e.target.value })
                    }
                />

                <CampoCustomizado
                    label="Confirmação da Senha"
                    type="password"
                    value={usuarioForm.confirmacaoSenha}
                    onChange={(e) =>
                        setUsuarioForm({
                            ...usuarioForm,
                            confirmacaoSenha: e.target.value,
                        })
                    }
                />

                <div className="novo-usuario__grupo-select">
                    <label>Perfil</label>

                    <div className="novo-usuario__select-wrapper">
                        <select
                            className="novo-usuario__select"
                            value={usuarioForm.perfil}
                            onChange={(e) =>
                                setUsuarioForm({
                                    ...usuarioForm,
                                    perfil: e.target.value,
                                    setor:
                                        e.target.value === "administrador"
                                            ? ""
                                            : usuarioForm.setor,
                                })
                            }
                        >
                            <option value="usuario">Usuário Comum</option>
                            <option value="administrador">Gestor</option>
                        </select>
                    </div>
                </div>

                {usuarioForm.perfil === "usuario" && (
                    <div className="novo-usuario__grupo-select">
                        <label>Setor/Fazenda</label>

                        <div className="novo-usuario__select-wrapper">
                            <select
                                className="novo-usuario__select"
                                value={usuarioForm.setor}
                                onChange={(e) =>
                                    setUsuarioForm({ ...usuarioForm, setor: e.target.value })
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

                <button className="botao-home primario" onClick={salvar}>
                    Salvar
                </button>
            </div>
        </Principal>
    );
}

export default NovoUsuario;
import "./Login.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Principal from "../../componentes/Principal/Principal";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import "../../paginas/PaginaInicial/PaginaInicial.css";

function Login() {
    const [loginForm, setLoginForm] = useState({
        email: "",
        senha: "",
    });

    const entrar = () => {
        if (!loginForm.email.trim() || !loginForm.senha.trim()) {
            toast.error("Preencha todos os campos para entrar!");
            return;
        }

        const usuariosDoLocalStorage =
            JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuarioEncontrado = usuariosDoLocalStorage.find(
            (usuario) =>
                usuario.email === loginForm.email && usuario.senha === loginForm.senha
        );

        if (!usuarioEncontrado) {
            toast.error("Email ou senha incorretos!");
            return;
        }

        localStorage.setItem("usuarioLogado", usuarioEncontrado.id);
        window.location.href = "/";
    };

    return (
        <Principal>
            <div className="login__form">
                <h2 className="login__titulo">Seja bem-vindo ao AgroStock!</h2>

                <CampoCustomizado
                    label="E-mail"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={loginForm.email}
                    onChange={(e) =>
                        setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    onKeyDown={(e) => e.key === "Enter" && entrar()}
                />

                <CampoCustomizado
                    type="password"
                    label="Senha"
                    value={loginForm.senha}
                    onChange={(e) =>
                        setLoginForm({ ...loginForm, senha: e.target.value })
                    }
                    onKeyDown={(e) => e.key === "Enter" && entrar()}
                />

                <button className="botao-home primario" onClick={entrar}>
                    Entrar
                </button>

                <Link to="/novo-usuario" className="login__link-cadastro">
                    Não tem uma conta? Cadastre-se!
                </Link>
            </div>
        </Principal>
    );
}

export default Login;
import { toast } from "react-toastify";

import Avatar from "../../componentes/Avatar/Avatar";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import { useAppContext } from "../../contexto/AppContext";
import { salvarUsuario } from "../../servicos/usuarios";
import "../../paginas/PaginaInicial/PaginaInicial.css";

import "./PerfilUsuario.css";

function PerfilUsuario() {
    const { usuarioLogado, setUsuarioLogado } = useAppContext();

    const salvar = () => {
        salvarUsuario(usuarioLogado);
        toast.success("Perfil atualizado com sucesso!");
    };

    const sair = () => {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "/";
    };

    return (
        <Principal titulo="Meu Perfil" voltarPara="/">
            {usuarioLogado && (
                <div className="perfil-usuario__container">
                    <label htmlFor="imageUpload" className="perfil-usuario__avatar">
                        <Avatar nome={usuarioLogado.nome} imagem={usuarioLogado.foto} />

                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => {
                                const imagem = e.target.files[0];

                                if (imagem) {
                                    const reader = new FileReader();

                                    reader.onload = (event) => {
                                        setUsuarioLogado({
                                            ...usuarioLogado,
                                            foto: event.target.result,
                                        });
                                    };

                                    reader.readAsDataURL(imagem);
                                }
                            }}
                        />

                        <span className="perfil-usuario__avatar-text">
                            Clique para alterar a foto
                        </span>
                    </label>

                    <CampoCustomizado label="Email" value={usuarioLogado.email} disabled />

                    <CampoCustomizado
                        label="Nome"
                        value={usuarioLogado.nome}
                        onChange={(e) =>
                            setUsuarioLogado({ ...usuarioLogado, nome: e.target.value })
                        }
                    />

                    {usuarioLogado.perfil === "usuario" && (
                        <CampoCustomizado
                            label="Setor/Fazenda"
                            value={usuarioLogado.setor}
                            disabled
                        />
                    )}

                    <CampoCustomizado
                        label="Perfil"
                        value={
                            usuarioLogado.perfil === "administrador"
                                ? "Gestor"
                                : "Usuário Comum"
                        }
                        disabled
                    />

                    <div className="perfil-usuario__acoes">
                        <button className="botao-home primario" onClick={salvar}>
                            Salvar
                        </button>

                        <button className="botao-home secundario" onClick={sair}>
                            Sair
                        </button>
                    </div>
                </div>
            )}
        </Principal>
    );
}

export default PerfilUsuario;
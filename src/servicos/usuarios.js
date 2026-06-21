export const buscarUsuarios = () => {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
};

export const buscarUsuarioLogado = () => {
  const idUsuarioLogado = localStorage.getItem("usuarioLogado");

  if (!idUsuarioLogado) {
    return null;
  }

  const usuariosDoLocalStorage = buscarUsuarios();

  return usuariosDoLocalStorage.find((u) => u.id === idUsuarioLogado) || null;
};

export const salvarUsuario = (usuarioAtualizado) => {
  const usuariosDoLocalStorage = buscarUsuarios();

  const usuariosAtualizados = usuariosDoLocalStorage.map((usuario) =>
    usuario.id === usuarioAtualizado.id ? usuarioAtualizado : usuario
  );

  localStorage.setItem("usuarios", JSON.stringify(usuariosAtualizados));
};
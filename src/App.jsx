import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import AppContextProvider from "./contexto/AppContext";

import PaginaInicial from "./paginas/PaginaInicial/PaginaInicial";
import ListaProdutos from "./paginas/ListaProdutos/ListaProdutos";
import CadastroProduto from "./paginas/CadastroProdutos/CadastroProduto";
import Login from "./paginas/Login/Login";
import NovoUsuario from "./paginas/NovoUsuario/NovoUsuario";
import PerfilUsuario from "./paginas/PerfilUsuario/PerfilUsuario";

import Cabecalho from "./componentes/Cabecalho/Cabecalho";
import ValidarAutenticacao from "./componentes/ValidarAutenticacao/ValidarAutenticacao";

const roteador = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "novo-usuario",
    element: <NovoUsuario />,
  },
  {
    path: "",
    element: <ValidarAutenticacao />,
    children: [
      {
        path: "",
        element: <PaginaInicial />,
      },
      {
        path: "meu-perfil",
        element: <PerfilUsuario />,
      },
      {
        path: "lista-produtos",
        element: <ListaProdutos />,
      },
      {
        path: "cadastro-produtos",
        element: <CadastroProduto />,
      },
      {
        path: "cadastro-produtos/:id",
        element: <CadastroProduto />,
      },
    ],
  },
  {
    path: "*",
    element: <h3>Página não encontrada!</h3>,
  },
]);

function App() {
  return (
    <AppContextProvider>
      <div className="app-layout">
        <Cabecalho />

        <div className="app-conteudo">
          <RouterProvider router={roteador} />
        </div>

        <ToastContainer position="top-center" autoClose={2000} theme="colored" />
      </div>
    </AppContextProvider>
  );
}

export default App;
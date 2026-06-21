import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import Cabecalho from "./componentes/Cabecalho/Cabecalho";
import ValidarAutenticacao from "./componentes/ValidarAutenticacao/ValidarAutenticacao";
import AppContextProvider from "./contexto/AppContext";

import PaginaInicial from "./paginas/PaginaInicial/PaginaInicial";
import ListaProdutos from "./paginas/ListaProdutos/ListaProdutos";
import CadastroProduto from "./paginas/CadastroProdutos/CadastroProduto";
import Login from "./paginas/Login/Login";
import NovoUsuario from "./paginas/NovoUsuario/NovoUsuario";
import PerfilUsuario from "./paginas/PerfilUsuario/PerfilUsuario";

function Layout() {
  return (
    <div className="app-layout">
      <Cabecalho />

      <main className="app-conteudo">
        <Outlet />
      </main>

      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </div>
  );
}

const roteador = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "novo-usuario",
        element: <NovoUsuario />,
      },
      {
        element: <ValidarAutenticacao />,
        children: [
          {
            index: true,
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
    ],
  },
]);

function App() {
  return (
    <AppContextProvider>
      <RouterProvider router={roteador} />
    </AppContextProvider>
  );
}

export default App;
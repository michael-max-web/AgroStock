import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import PaginaInicial from "./paginas/PaginaInicial/PaginaInicial";
import ListaProdutos from "./paginas/ListaProdutos/ListaProdutos";
import CadastroProduto from "./paginas/CadastroProdutos/CadastroProduto";

import Cabecalho from "./componentes/Cabecalho/Cabecalho";

const roteador = createBrowserRouter([
  {
    path: "",
    element: <PaginaInicial />,
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
]);

function App() {
  return (
    <div className="app-layout">
      <Cabecalho />
      <div className="app-conteudo">
        <RouterProvider router={roteador} />
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
      />
    </div>
  );
}

export default App;
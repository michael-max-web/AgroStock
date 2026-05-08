import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import PaginaInicial from "./paginas/PaginaInicial/PaginaInicial";
import ListaProdutos from "./paginas/ListaProdutos/ListaProdutos";
import Rodape from "./componentes/Rodape/Rodape";
import CadastroProduto from "./paginas/CadastroProdutos/CadastroProduto";
import Cabecalho from "./componentes/Cabecalho/Cabecalho";



const roteador = createBrowserRouter([
    { 
    path: "",
    element: <PaginaInicial />,
  },
   {
    path: "lista-produtos",
    element: <ListaProdutos />
  },
  {
    path: "cadastro-produtos",
    element: <CadastroProduto />
  },

]);

function App() {
  return (
    <>
      <Cabecalho />
      <RouterProvider router={roteador} />
      <ToastContainer />
      <Rodape />
    </>
  );
}

export default App;
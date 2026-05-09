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
{
  path: "cadastro-produtos/:id", // ROTA PARA EDIÇÃO
  element: <CadastroProduto />
},
]);

// App.jsx - Mantenha como está, ele é o seu "Layout Fixo"
function App() {
  return (
    <>
      <Cabecalho /> {/* Este é o único cabeçalho do topo */}
      <RouterProvider router={roteador} />
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
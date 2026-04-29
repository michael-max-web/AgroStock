import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Cabecalho from "./componentes/Cabecalho/Cabecalho";
import PaginaInicial from "./paginas/PaginaInicial/PaginaInicial";
import ListaProdutos from "./paginas/ListaProdutos/ListaProdutos";


const roteador = createBrowserRouter([
    { 
    path: "",
    element: <PaginaInicial />,
  },
   {
    path: "lista-produtos",
    element: <ListaProdutos />,
  },

]);

function App() {
  return (
    <>
      <Cabecalho />
      <RouterProvider router={roteador} />
      <ToastContainer />
    </>
  );
}

export default App;
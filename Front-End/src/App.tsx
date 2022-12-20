import { Routes, Route } from 'react-router-dom';
import PaginaPadrao from './paginas/Administracao/PaginaPadrao';
import AdministracaoPratos from './paginas/Administracao/Pratos';
import FormularioPratos from './paginas/Administracao/Pratos/FormularioPrato';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurante';
import FormularioRestaurante from './paginas/Administracao/Restaurante/FormularioRestaurante';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path='/admin' element={<PaginaPadrao />}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/novo" element={<FormularioPratos />} />
        <Route path="pratos/:id" element={<FormularioPratos />} />
      </Route>
    </Routes>
  );
}

export default App;

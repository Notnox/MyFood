import { Routes, Route } from 'react-router-dom';
import PaginaPadrao from './paginas/Administracao/PaginaPadrao';
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
      </Route>
    </Routes>
  );
}

export default App;

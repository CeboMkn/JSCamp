import Header from './components/globales/Header.jsx'
import MainEstrecho from './components/empleos/MainEstrecho.jsx';
import Hero from './components/empleos/Hero.jsx'
import { FormGrande } from './components/empleos/FormGrande.jsx';
import Filters from './components/empleos/FiltersJob.jsx'
import { ResultadosBusqueda } from './components/empleos/ContResultBusqueda.jsx'
import Paginacion from './components/globales/Paginacion.jsx';
import Footer from './components/globales/Footer.jsx'

function App() {
  return (
    <>
      <Header />

      <MainEstrecho>
        <Hero />
        <FormGrande />
        <Filters />
        <ResultadosBusqueda />
        <Paginacion />
      </MainEstrecho>

      <Footer />
    </>
  );
}

export default App;


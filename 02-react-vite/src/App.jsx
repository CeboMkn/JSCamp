import Header from './components/globales/Header'
import MainEstrecho from './components/empleos/MainEstrecho';
import Hero from './components/empleos/Hero'
import FormGrande from './components/empleos/FormGrande';
import Filters from './components/empleos/FiltersJob'
import ResultadosBusqueda from './components/empleos/ContResultBusqueda'
import Paginacion from './components/globales/Paginacion';
import Footer from './components/globales/Footer'

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


import { useState } from 'react';
import jobsData from './data/data.json'

import { Header } from './components/globales/Header.jsx'
import { MainEstrecho } from './components/empleos/MainEstrecho.jsx';
import { Hero } from './components/empleos/Hero.jsx'
import { FormGrande } from './components/empleos/FormGrande.jsx';
import { ResultadosBusqueda } from './components/empleos/ContResultBusqueda.jsx'
import { Paginacion } from './components/globales/Paginacion.jsx';
import { Footer } from './components/globales/Footer.jsx'

function App() {

  // useState(1) devuelve un array [valorActual, funcionParaActualizar]
  // currentPage es el valor actual (inicia en 1, que es el valor de useState(1))
  // setCurrentPage es la función que actualiza ese valor
  const [currentPage, setCurrentPage] = useState(1)
  // const totalPages = 5

  // Funcion que recibe la pagina a la que hay que cambiar, y llama a la funcion que cambia el estado de currentPage pasandole (page)
  const onPageChange = (page) => {
    setCurrentPage(page)
  }


  const [filters, setFilter] = useState({
    search: '',
    tecnologia: '',
    ubicacion: '',
    tipo: '',
    nivel: ''
  })
  console.log(filters)

  const jobsFiltrados = jobsData.filter(job => {
    const { search, tecnologia, ubicacion, tipo, nivel } = filters;

    // si no hay ningún filtro activo, devuelve todos directamente
    if (![search, tecnologia, ubicacion, tipo, nivel].some(Boolean)) return true;

    const data = job.data;

    // Utilidad para comparar texto ignorando mayúsculas
    const equals = (a, b) => a?.toLowerCase() === b?.toLowerCase();
    const includes = (a, b) => a?.toLowerCase().includes(b?.toLowerCase());

    return (
      (!search || includes(job.titulo, search)) &&
      (!tecnologia ||
        (Array.isArray(data.tecnologia)
          ? data.tecnologia.some(t => equals(t, tecnologia))
          : equals(data.tecnologia, tecnologia))) &&
      (!ubicacion || equals(data.ubicacion, ubicacion)) &&
      (!tipo || equals(data.tipo, tipo)) &&
      (!nivel || equals(data.nivel, nivel))
    );
  });

  const applyFilters = (newFilters) => {
    setFilter(newFilters)
    setCurrentPage(1)
  }

  const RESULTS_PER_PAGE = 4
  const empzMostrar = (currentPage - 1) * RESULTS_PER_PAGE
  const termMostrar = currentPage * RESULTS_PER_PAGE
  const totalPages = Math.ceil(jobsFiltrados.length / RESULTS_PER_PAGE)
  const resultsView = jobsFiltrados.slice(empzMostrar, termMostrar)

  return (
    <>
      <Header />

      <MainEstrecho>
        <Hero />
        <FormGrande applyFilters={applyFilters} />
        <ResultadosBusqueda jobs={resultsView} />
        <Paginacion currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </MainEstrecho>

      <Footer />
    </>
  );
}

export default App;


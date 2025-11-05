import { useState } from 'react';

import { Header } from './components/globales/Header.jsx'
import { MainEstrecho } from './components/empleos/MainEstrecho.jsx';
import { Hero } from './components/empleos/Hero.jsx'
import { FormGrande } from './components/empleos/FormGrande.jsx';
import { Filters } from './components/empleos/FiltersJob.jsx'
import { ResultadosBusqueda } from './components/empleos/ContResultBusqueda.jsx'
import { Paginacion } from './components/globales/Paginacion.jsx';
import { Footer } from './components/globales/Footer.jsx'

function App() {

  // useState(1) devuelve un array [valorActual, funcionParaActualizar]
  // currentPage es el valor actual (inicia en 1, que es el valor de useState(1))
  // setCurrentPage es la función que actualiza ese valor
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5

  // Funcion que recibe la pagina a la que hay que cambiar, y llama a la funcion que cambia el estado de currentPage pasandole (page)
  const onPageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <Header />

      <MainEstrecho>
        <Hero />
        <FormGrande />
        <Filters />
        <ResultadosBusqueda />
        <Paginacion currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </MainEstrecho>

      <Footer />
    </>
  );
}

export default App;


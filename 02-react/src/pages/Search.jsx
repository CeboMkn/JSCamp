import { useState } from 'react';

import jobsData from '../assets/data.json'

import '../App.css'
import { JobListing } from '../../components/JobListing.jsx';
import { Pagination } from '../../components/Pagination.jsx';
import { SerarchFormSection } from '../../components/SerarchFormSection.jsx';
import { MostrandoNumRresults } from '../../components/MostrandoNumResults.jsx';


export function SearchPage() {

  const RESULTS_PER_PAGE = 4

  const [filters, setToFilters] = useState({
    search: '',
    tecnologia: '',
    ubicacion: '',
    tipo: '',
    nivel: ''
  })
  const [currentPage, setCurrentPage] = useState(1)

  const jobsFilter = jobsData.filter(job => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true
      if (key === 'search') {
        return job.titulo.toLowerCase().includes(value.toLowerCase()) ||
          job.empresa.toLowerCase().includes(value.toLowerCase()) ||
          job.descripcion.toLowerCase().includes(value.toLowerCase())
      }
      if (key === 'tecnologia') {
        return job.data.tecnologia.includes(value)
      }
      if (key === 'ubicacion') {
        return job.data.ubicacion.toLowerCase().includes(value.toLowerCase())
      }
      if (key === 'nivel') {
        return job.data.nivel.toLowerCase().includes(value.toLowerCase())
      }
      if (key === 'tipo') {
        return job.data.tipo.toLowerCase().includes(value.toLowerCase())
      }
    })
  })

  const totalPages = Math.ceil(jobsFilter.length / RESULTS_PER_PAGE)
  const pagedResults = jobsFilter.slice((currentPage - 1) * RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE)

  const handleFilters = (filtersAdd) => {
    setToFilters(filtersAdd)
  }

  return (
      <main className="main_estrecho">
        <div>

          <SerarchFormSection onFilters={handleFilters} filters={filters} />

          <JobListing jobsData={pagedResults} />

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          <MostrandoNumRresults currentPage={currentPage} results={RESULTS_PER_PAGE} jobs={jobsFilter} />

        </div>
      </main>
  );
}

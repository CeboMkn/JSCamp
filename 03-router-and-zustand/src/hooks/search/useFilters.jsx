import { useState } from 'react';
import { useFetchJobs } from './useFetchJobs';

export const useFilters = (RESULTS_PER_PAGE) => {


    const [jobs, setJobs] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    /* COGER PARÁMETROS DE URL O LOCALSTORAGE SEGUN "PARAMS" */
    const readfilters = (params) => ({
        search: params.get('text') || '',
        tecnologia: params.get('technology') || '',
        ubicacion: params.get('type') || '',
        nivel: params.get('level') || ''
    })

    const [filters, setToFilters] = useState(() => {
        const defaultFilters = {
            search: '',
            tecnologia: '',
            ubicacion: '',
            nivel: ''
        }
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.size > 0) {
            return readfilters(urlParams)
        }

        const saved = localStorage.getItem('jobsFilters')
        if (saved) {
            return readfilters(new URLSearchParams(saved))
        }

        return defaultFilters
    })

    const totalPages = Math.ceil(total / RESULTS_PER_PAGE)

    useFetchJobs(setJobs, setTotal, setLoading, currentPage, filters, RESULTS_PER_PAGE)

    const handleFilters = (filtersAdd) => {
        setToFilters(filtersAdd)
        setCurrentPage(1)
    }

    return {
        loading,
        filters,
        currentPage,
        setCurrentPage,
        jobs,
        total,
        totalPages,
        handleFilters
    }
}
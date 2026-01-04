import { useEffect, useState } from 'react';

export const useFilters = (RESULTS_PER_PAGE) => {


    const [jobs, setJobs] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const [filters, setToFilters] = useState({
        search: '',
        tecnologia: '',
        ubicacion: '',
        tipo: '',
        nivel: ''
    })

    const totalPages = Math.ceil(total / RESULTS_PER_PAGE)

    useEffect(() => {
        async function fetchJobs() {
            try {

                const params = new URLSearchParams()
                if (filters.search) params.append('text', filters.search)
                if (filters.tecnologia) params.append('technology', filters.tecnologia)
                if (filters.ubicacion) params.append('ubicacion', filters.ubicacion)
                if (filters.nivel) params.append('nivel', filters.nivel)

                const offset = (currentPage - 1) * RESULTS_PER_PAGE
                params.append('limit', RESULTS_PER_PAGE)
                params.append('offset', offset)

                const queryParams = params.toString()

                setLoading(true)
                const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
                const json = await response.json()

                setJobs(json.data)
                setTotal(json.total)

            } catch (error) {

                console.error('Error fetching jobs:', error)

            } finally {

                setLoading(false)

            }
        }
        fetchJobs()
    }, [filters, currentPage])

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
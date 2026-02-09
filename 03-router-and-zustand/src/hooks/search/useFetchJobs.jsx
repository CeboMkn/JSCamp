import { useEffect } from "react";
import { saveFilters } from "./saveFiltersLocalStorage.jsx"

export function useFetchJobs(setJobs, setTotal, setLoading, currentPage, filters, RESULTS_PER_PAGE) {

    useEffect(() => {
        async function fetchJobs() {
            /* const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms)) */
            try {
                setLoading(true)
                /* await sleep(5000000) */
                const params = new URLSearchParams()
                const pagination = `limit=${RESULTS_PER_PAGE}&offset=${(currentPage - 1) * RESULTS_PER_PAGE}`

                if (filters.search) params.append('text', filters.search)
                if (filters.tecnologia) params.append('technology', filters.tecnologia)
                if (filters.ubicacion) params.append('type', filters.ubicacion)
                if (filters.nivel) params.append('level', filters.nivel)

                const queryParams = params.toString()

                window.history.pushState({}, '', queryParams
                    ? `${window.location.pathname}?${queryParams}`
                    : window.location.pathname)
                queryParams && saveFilters('jobsFilters', queryParams)

                const response = await fetch(
                    `https://jscamp-api.vercel.app/api/jobs?${pagination}${queryParams ? `&${queryParams}` : ''}`
                )

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`)
                }

                const json = await response.json()

                setJobs(json.data)
                setTotal(json.total)

            } catch (error) {

                console.log('Error al pedir los trabajos', error)

            } finally {

                setLoading(false)

            }
        }
        fetchJobs()
    }, [filters, currentPage])
}
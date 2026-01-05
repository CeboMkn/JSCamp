import { useState } from 'react';
import { useFetchJobs } from './useFetchJobs';

export const useFilters = (RESULTS_PER_PAGE) => {


    const [jobs, setJobs] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [filters, setToFilters] = useState({})

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
export const useInfoFilters = ({ onFilters }) => {
    const handleInfoForm = (e) => {

        const { name, value } = e.target

        onFilters(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDellFilters = () => {
        const filtersAdd = {
            search: '',
            tecnologia: '',
            ubicacion: '',
            tipo: '',
            nivel: ''
        }
        onFilters(filtersAdd)
    }

    return { handleInfoForm, handleDellFilters }
}
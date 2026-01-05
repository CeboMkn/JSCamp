export const useInfoFilters = ({ idText, idTecno, idUbi, idTipo, idNivel, onFilters }) => {
    const handleInfoForm = (e) => {

        const formData = new FormData(e.currentTarget)

        const filtersAdd = {
            search: formData.get(idText),
            tecnologia: formData.get(idTecno),
            ubicacion: formData.get(idUbi),
            tipo: formData.get(idTipo),
            nivel: formData.get(idNivel)
        }

        onFilters(filtersAdd)
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
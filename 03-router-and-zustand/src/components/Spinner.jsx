import styles from "../css_module/Spinner.module.css"

export function Spinner({ position }) {

    return (
        <div className={position ? styles.env_spinnerP : styles.env_spinner}>
            <div className={styles.spinner}>
                
            </div>
            <p>Cargando...</p>
        </div>)
}
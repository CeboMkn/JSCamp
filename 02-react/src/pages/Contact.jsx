import styles from "../css_module/Contact.module.css"

export function ContactPage() {

    const handleSendForm = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const dataForm = {
            name: formData.get("name"),
            subname: formData.get("subName"),
            email: formData.get("email"),
            text: formData.get("textArea")
        }
        const test = testData(dataForm.email)
        test ? onSendForm(dataForm) : errorData(dataForm)
    }

    const testData = (dataEmail) => {
        console.log('Testeo de datos', dataEmail)
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dataEmail.trim())
    }

    const onSendForm = (data) => {
        console.log('Los datos se envían', data)
        /* Petición para mandar datos */
    }

    const errorData = (data) => {
        console.log('Error en los datos', data)
        /* Logica de error en datos */
    }

    return (
        <main className="main_estrecho">
            <div className={styles.contactCenter}>
                <div className={styles.textPrincipal}>
                    <h1>¿Tienes alguna pregunta?</h1>
                    <h3>Ponte en contacto con nosotros</h3>
                </div>
                <section className={styles.formContact}>
                    <form onSubmit={handleSendForm}>

                        <section className={styles.formLabels}>
                            <div className={styles.inputFormContact}>
                                <input required name="name" placeholder="Nombre" type="text" />
                            </div>
                            <div className={styles.inputFormContact}>
                                <input required name="subName" placeholder="Apellidos" type="text" />
                            </div>
                            <div className={styles.inputFormContact}>
                                <input required name="email" placeholder="Correo electrónico" type="text" />
                            </div>

                        </section>
                        <section>
                            <div className={`${styles.inputFormContact} ${styles.textAreaFormContact}`}>
                                <textarea required name="textArea" placeholder="Cuentanos tus dudas" type="text" />
                            </div>
                        </section>
                        <section>
                            <div className={styles.btnEnviar}>
                                <button className="btn_info">Enviar</button>
                            </div>
                        </section>
                    </form>
                </section>
            </div>
        </main>
    )
}
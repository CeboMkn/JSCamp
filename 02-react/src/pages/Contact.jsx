import { useState } from "react"
import styles from "../css_module/Contact.module.css"

export function ContactPage() {

    const emailRegexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);

    const [values, setValues] = useState({
        email: '',
        name: '',
        subname: '',
        dudas: ''
    })

    const [errors, setError] = useState({
        email: false,
        name: false,
        subname: false,
        dudas: false
    })

    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)

        const newErrors = {
            name: values.name.trim() === '',
            subname: values.subname.trim() === '',
            dudas: values.dudas.trim() === '',
            email:
                values.email.trim() === '' ||
                !emailRegexp.test(values.email)
        }

        setError(newErrors)

        const hasErrors = Object.values(newErrors).some(Boolean)
        if (hasErrors) return
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setValues(prev => ({
            ...prev,
            [name]: value
        }))

        if (!submitted) return

        setError(prev => ({
            ...prev,
            [name]:
                name === 'email'
                    ? value.trim() === '' || !emailRegexp.test(value)
                    : value.trim() === ''
        }))
    }

    return (
        <main className="main_estrecho">
            <div className={styles.contactCenter}>
                <div className={styles.textPrincipal}>
                    <h1>¿Tienes alguna pregunta?</h1>
                    <h3>Ponte en contacto con nosotros</h3>
                </div>
                <section className={styles.formContact}>
                    <form onSubmit={handleSubmit}>

                        <section className={styles.formLabels}>
                            <div>
                                <div
                                    className={`
                        ${styles.inputFormContact}
                        ${submitted && errors.name ? styles.errorContainer : ''}
                        ${submitted && !errors.name && values.name.trim() !== '' ? styles.successContainer : ''}
                    `}
                                >
                                    <input
                                        name="name"
                                        placeholder="Nombre"
                                        type="text"
                                        value={values.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                {submitted && errors.name && (
                                    <div className={styles.errorMessage}>
                                        <p>Campo obligatorio</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <div
                                    className={`
                        ${styles.inputFormContact}
                        ${submitted && errors.subname ? styles.errorContainer : ''}
                        ${submitted && !errors.subname && values.subname.trim() !== '' ? styles.successContainer : ''}
                    `}
                                >
                                    <input
                                        name="subname"
                                        placeholder="Apellidos"
                                        type="text"
                                        value={values.subname}
                                        onChange={handleChange}
                                    />
                                </div>

                                {submitted && errors.subname && (
                                    <div className={styles.errorMessage}>
                                        <p>Campo obligatorio</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <div
                                    className={`
                        ${styles.inputFormContact}
                        ${submitted && errors.email ? styles.errorContainer : ''}
                        ${submitted && !errors.email && values.email.trim() !== '' ? styles.successContainer : ''}
                    `}
                                >
                                    <input
                                        name="email"
                                        placeholder="Correo electrónico"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                {submitted && errors.email && (
                                    <div className={styles.errorMessage}>
                                        <p>Campo vacío o email inválido</p>
                                    </div>
                                )}
                            </div>

                        </section>
                        <section>
                            <div className={styles.sectionTextArea}>
                                <div
                                    className={`
                        ${styles.inputFormContact}
                        ${styles.textAreaFormContact}
                        ${submitted && errors.dudas ? styles.errorContainer : ''}
                        ${submitted && !errors.dudas && values.dudas.trim() !== '' ? styles.successContainer : ''}
                    `}
                                >
                                    <textarea
                                        name="dudas"
                                        placeholder="Cuéntanos tus dudas"
                                        value={values.dudas}
                                        onChange={handleChange}
                                    />
                                </div>

                                {submitted && errors.dudas && (
                                    <div className={styles.errorMessage}>
                                        <p>Campo obligatorio</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section>
                            <div className={styles.btnEnviar}>
                                <button type="submit" className="btn_info">
                                    Enviar
                                </button>
                            </div>
                        </section>

                    </form>
                </section>

            </div>
        </main>
    )
}
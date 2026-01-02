import styles from "../css_module/Contact.module.css"

export function ContactPage() {

    const handleSendForm = (e) => {

        e.preventDefault()
        const form = e.target
        const elements = form.elements

        const data = {}

        for (const d of elements) {
            if (!d.name) continue

            data[d.name] = {
                value: d.value,
                type: d.type,
                required: d.dataset.validar === 'true',
                validate: null,
                error: null
            }
        }
        const [esValido, dataValidada] = validateData(data)
        esValido
            ? onSendForm(dataValidada)
            : errorData(form, dataValidada)
    }

    function validateData(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        for (const key in data) {
            const campo = data[key]
            campo.error = null

            if (!campo.required) {
                campo.validate = true
                continue
            }

            if (campo.value.trim() === '') {
                campo.validate = false
                campo.error = 'required'
                continue
            }

            if (campo.type === 'email') {
                if (!emailRegex.test(campo.value.trim())) {
                    campo.validate = false
                    campo.error = 'email'
                    continue
                }
            }

            campo.validate = true
        }

        const esValido = Object.values(data).every(campo => campo.validate === true)
        return [esValido, data]
    }

    const onSendForm = (data) => {
        console.log('Datos Enviados = ', data)
    }

    const errorData = (form, data) => {

        form.querySelectorAll('.errorText').forEach(e => e.remove())
        form.querySelectorAll('input, textarea').forEach(el => {
            el.classList.remove('inputError', 'inputSuccess')
        })

        for (const key in data) {
            const campo = data[key]
            const input = form.elements[key]
            if (!input) continue

            const container = input.parentElement


            if (campo.validate) {
                container.classList.add('inputSuccess')
                continue
            }

            container.classList.add('inputError')

            const error = document.createElement('span')
            error.className = 'errorText'
            error.textContent = getErrorMessage(campo)

            container.appendChild(error)
        }
    }
    const getErrorMessage = (campo) => {
        switch (campo.error) {
            case 'required':
                return 'Este campo es obligatorio'
            case 'email':
                return 'El correo electrónico no es válido'
            default:
                return ''
        }
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
                                <input name="name" placeholder="Nombre" type="text" data-validar="true" />
                            </div>
                            <div className={styles.inputFormContact}>
                                <input name="subname" placeholder="Apellidos" type="text" data-validar="true" />
                            </div>
                            <div className={styles.inputFormContact}>
                                <input name="email" placeholder="Correo electrónico" type="email" data-validar="true" />
                            </div>

                        </section>
                        <section>
                            <div className={`${styles.inputFormContact} ${styles.textAreaFormContact}`}>
                                <textarea name="dudas" placeholder="Cuentanos tus dudas" data-validar="true" />
                            </div>
                        </section>
                        <section>
                            <p>{ }</p>
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
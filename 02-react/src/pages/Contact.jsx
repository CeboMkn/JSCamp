/* import { useState } from "react" */
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
                required: d.required
            }
        }
        console.log(data)

    }

    /* const testMail = (email) => {
        const text = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        const validate = text ? true : false
        return validate
    }

    const testText = (name, subname, text) => {

    }

    const onSendForm = (data) => {

    }

    const errorData = () => {

    } */




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
                                <input required name="email" placeholder="Correo electrónico" type="email" />
                            </div>

                        </section>
                        <section>
                            <div className={`${styles.inputFormContact} ${styles.textAreaFormContact}`}>
                                <textarea required name="textArea" placeholder="Cuentanos tus dudas" type="text" />
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
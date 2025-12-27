export function ContactPage() {
    return (
        <main className="main_estrecho">
            <div className="contactCenter">
                <div className="text_principal">
                    <h1>¿Tienes alguna pregunta?</h1>
                    <h3>Ponte en contacto con nosotros</h3>
                </div>
                <section className="formContact">
                    <form action="">

                        <section className="formLabels">
                            <div className="inputFormContact">
                                <input placeholder="Nombre" type="text" />
                            </div>
                            <div className="inputFormContact">
                                <input placeholder="Apellidos" type="text" />
                            </div>
                            <div className="inputFormContact">
                                <input placeholder="Correo electrónico" type="text" />
                            </div>

                        </section>
                        <section>
                            <div className="inputFormContact textAreaFormContact">
                                <textarea placeholder="Cuentanos tus dudas" type="text" />
                            </div>
                        </section>
                        <section>
                            <div className="btnAncho">
                                <button className="btn_info">Enviar</button>
                            </div>
                        </section>
                    </form>
                </section>
            </div>
        </main>
    )
}
import { useParams } from "react-router"
import styles from "../css_module/DetailJob.module.css"
import { Link } from "../hooks/router/Link"
import { Spinner } from "../components/Spinner"
import { useEffect, useState } from "react"

export function DetailJob() {

    const { jobId } = useParams()

    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        console.log('haciendo peticion')
        setLoading(true)

        const timeoutId = setTimeout(() => {
            fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`)
                .then((res) => {
                    if (!res.ok) throw new Error('Job not found')
                    return res.json()
                })
                .then(json => {
                    setJob(json)
                })
                .catch(err => {
                    setError(err.message)
                })
                .finally(() => {
                    setLoading(false)
                })
        }, 100000) // ⏱️ espera de 2 segundos

        return () => clearTimeout(timeoutId)
    }, [jobId])

    if (loading) {
        return <Spinner />
    }

    if (!job) {
        return <p>No hay trabajo</p>
    }

    return (
        <>
            <section className={styles.route}>
                <div>
                    <Link href="/search">Empleos</Link>
                    <span className="separator">/</span>
                    <span>{job.titulo}</span>
                </div>
            </section>

            <main className="main_estrecho">
                <div className={styles.contain_title_oferta}>
                    <section>
                        <h1>Ingeniero de Software Senior</h1>
                        <p>Tech Solutions Inc. • Remoto</p>
                    </section>
                    <div>
                        <button type="button" className="btn_info btn_active">
                            Aplicar ahora
                        </button>
                    </div>
                </div>

                <div className={styles.container_des_puesto}>
                    <article>
                        <h2>Descripción del puesto</h2>
                        <p>
                            Tech Solutions Inc. está buscando un Ingeniero de Software Senior altamente motivado y experimentado
                            para unirse a nuestro equipo remoto. El candidato ideal tendrá una sólida formación en desarrollo de
                            software, con experiencia en el diseño, desarrollo e implementación de soluciones de software
                            escalables y de alto rendimiento. Como Ingeniero de Software Senior, usted será responsable de
                            liderar proyectos de desarrollo, mentorizar a ingenieros junior y colaborar con equipos
                            multifuncionales para entregar productos de software de alta calidad.
                        </p>
                    </article>

                    <section>
                        <h2>Responsabilidades</h2>

                        {[
                            'Diseñar, desarrollar y mantener aplicaciones web utilizando tecnologías modernas.',
                            'Colaborar con equipos de producto y diseño para definir y entregar nuevas características.',
                            'Escribir código limpio.',
                            'Realizar revisiones de código y proporcionar retroalimentación constructiva al equipo.'
                        ].map((text, index) => (
                            <div key={index}>
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#09f"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="icon icon-tabler icons-tabler-outline icon-tabler-circle-check"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                        <path d="M9 12l2 2l4 -4" />
                                    </svg>
                                </div>
                                <p>{text}</p>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h2>Requisitos</h2>

                        {[
                            'Licenciatura en informática o campo relacionado.',
                            'Mínimo de 5 años de experiencia en desarrollo de software.',
                            'Experiencia con frameworks JavaScript (React, Angular, Vue.js).',
                            'Familiaridad con metodologías ágiles y control de versiones (Git).'
                        ].map((text, index) => (
                            <div key={index}>
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#09f"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="icon icon-tabler icons-tabler-outline icon-tabler-circle-check"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                        <path d="M9 12l2 2l4 -4" />
                                    </svg>
                                </div>
                                <p>{text}</p>
                            </div>
                        ))}
                    </section>

                    <article className="description_text">
                        <h2>Acerca de la empresa</h2>
                        <p>
                            Tech Solutions Inc. es una empresa de tecnología innovadora que se centra en la creación de
                            soluciones de software de vanguardia para diversas industrias. Estamos comprometidos con un
                            entorno de trabajo colaborativo e inclusivo donde cada empleado pueda prosperar y crecer
                            profesionalmente.
                        </p>
                    </article>
                </div>

                <footer className={styles.btn_footer}>
                    <button type="button" className="btn_info btn_active">
                        Aplicar ahora
                    </button>
                </footer>
            </main>
        </>
    )
}
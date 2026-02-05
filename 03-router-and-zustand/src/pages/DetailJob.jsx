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

        return () => clearTimeout(timeoutId)
    }, [jobId])

    if (loading) {
        return <Spinner position />
    }

    if (!job) {
        return (
            <div className="containerNotFound">
                <h2>No se ha encontrado el trabajo</h2>
            </div>
        )
    }

    const responsibilities = job.content.responsibilities
        .split('\n')
        .map(item => item.replace(/^- /, '').trim())
        .filter(Boolean)

    const requirements = job.content.requirements
        .split('\n')
        .map(item => item.replace(/^- /, '').trim())
        .filter(Boolean)



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
                        <h1>{job.titulo}</h1>
                        <p>{job.empresa} • {job.ubicacion}</p>
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
                            {job.descripcion}
                        </p>
                    </article>

                    <section>
                        <h2>Responsabilidades</h2>

                        {responsibilities.map((text, index) => (
                            <div key={index} className="responsibility-item">
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

                        {requirements.map((text, index) => (
                            <div key={index} className="responsibility-item">
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
                            {job.content.about}
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
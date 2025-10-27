function Header() {
    return (
        <header className="header">
            <div>
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Capa_1"
                        x="0px"
                        y="0px"
                        width="25"
                        height="25"
                        viewBox="0 0 16.479 16.479"
                        style={{ enableBackground: "new 0 0 16.479 16.479" }}
                        xmlSpace="preserve"
                        fill="#09f"
                    >
                        <g>
                            <path d="M13.484,8.239l2.994,1.728l-2.621,4.544l-2.995-1.729v3.458H5.617v-3.458l-2.995,1.729L0,9.967l2.995-1.728L0,6.509   l2.622-4.54l2.995,1.729V0.239h5.245v3.458l2.995-1.729l2.621,4.54L13.484,8.239z" />
                        </g>
                    </svg>

                    <h2>DevJobs</h2>

                    <nav className="nav">
                        <a href="./index.html">Inicio</a>
                        <a href="./empleos.html">Empleos</a>
                        <a href="Empresas">Empresas</a>
                        <a href="Salarios">Salarios</a>
                    </nav>
                </div>
            </div>

            <div>
                <a className="a_head" href="#">
                    Subir CV
                </a>
                {/* Si tienes un componente Web, React lo aceptará, pero aquí lo comento */}
                {/* <devjobs-avatar service="github" username="mdo" size="40"></devjobs-avatar> */}
            </div>
        </header>
    )
}

export default Header;
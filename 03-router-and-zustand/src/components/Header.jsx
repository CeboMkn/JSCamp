import { Link } from "../hooks/router/Link.jsx";
import imgPerfil from '../assets/img/luffy_profile.jpg'
import { useAuthstore } from "./store/Authstore.js";

export function Header() {
  const { isLoggedIn, login, logout } = useAuthstore()

  return (
    <header className="header">

      <div className="logo_header">
        <Link href="/">
          <h2>
            <svg
              width="25"
              height="25"
              viewBox="0 0 16.479 16.479"
              fill="#09f"
            >
              <g>
                <path d="M13.484,8.239l2.994,1.728l-2.621,4.544l-2.995-1.729v3.458H5.617v-3.458l-2.995,1.729L0,9.967l2.995-1.728L0,6.509l2.622-4.54l2.995,1.729V0.239h5.245v3.458l2.995-1.729l2.621,4.54L13.484,8.239z" />
              </g>
            </svg>DevJobs</h2>
        </Link>
        <nav className="nav">
          <Link href="/">Inicio</Link>
          <Link href="/search">Empleos</Link>
          <Link href="/contact">Contacto</Link>
        </nav>
      </div>

      <div>
        {
          isLoggedIn
            ? <button className="btn_info" onClick={logout}>Cerrar Sesión</button>
            : <button className="btn_info" onClick={login}>Iniciar Sesión</button>
        }
        {isLoggedIn &&
          <img
            src={imgPerfil}
            alt="Avatar del usuario"
            width="50"
            height="50"
          />}

      </div>
    </header>
  )
}
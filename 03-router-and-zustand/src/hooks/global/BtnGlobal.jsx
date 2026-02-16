import stl from './BtnGlobal.module.css'
import { Link } from '../router/Link.jsx';

export const BtnGlobal = ({
    children,
    onClick,
    disabled = false,
    type = "button",
    to, // Nueva prop para enlaces
    className = ""
}) => {
    const classes = `${stl.btnInfo} ${className}`;

    // Si tiene la prop 'to', renderizamos un Link de React Router
    if (to && !disabled) {
        return (
            <Link to={to} className={classes} onClick={onClick}>
                {children}
            </Link>
        );
    }

    // Si no tiene 'to' (o está deshabilitado), renderizamos un botón normal
    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
import stl from './BtnGlobal.module.css'

export const BtnGlobal = ({
    children,
    onClick,
    disabled = false,
    type = "button",
    className = ""
}) => {
    return (
        <button
            type={type}
            className={`${stl.btnInfo} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
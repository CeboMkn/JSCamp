import { useAuthstore } from "../../components/store/Authstore"

export function AplyBytton() {
    const { isLoggedIn } = useAuthstore()
    return (
        <button disabled={!isLoggedIn} className="btn_info" type="button">
            Aplicar
        </button>
    )
}
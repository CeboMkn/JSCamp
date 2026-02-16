import { useAuthstore } from "../../components/store/Authstore"
import { BtnGlobal } from "../../components/BtnGlobal"

export function AplyBytton() {
    const { isLoggedIn } = useAuthstore()
    return (
        <BtnGlobal disabled={!isLoggedIn}>
            Aplicar
        </BtnGlobal>
    )
}
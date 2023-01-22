import { MainLayout } from "../layouts/MainLayout"
import {useSelector} from "react-redux";

export const Profile = () => {

    const { user } = useSelector((state: any) => state.auth);

    return (
        <MainLayout>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 100 }}>
                <img src={ user.profilePicture } alt="Foto de perfil" width={170} style={{ borderRadius: 100, marginRight: 50 }}/>
                <div>
                    <h1 style={{ textAlign: 'center' }}>{ user.fullName }</h1>
                    <p style={{ textAlign: 'center' }}> { user.role }: { user.business.businessName }</p>
                </div>
            </div>
        </MainLayout>
    );
}

import { useSelector } from "react-redux";

export const Private = () => {

    const { user } = useSelector((state: any) => state.auth);

    return (
        <div>Welcome to Private - { user.name }</div>
    )
}

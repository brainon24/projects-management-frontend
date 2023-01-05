import { useDispatch } from "react-redux";
import { openSidemenu } from "../store/ui/uiSlice";

export const Navbar = () => {

    const dispatch = useDispatch();

    return (
        <div>
            Navbar

            <button onClick={ () => dispatch( openSidemenu() ) }>Menú</button>
        </div>
    );
}

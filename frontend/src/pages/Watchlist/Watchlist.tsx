/**
 * @author  Sowa Takayanagi
 * @since   12/28/2021 1:40 AM
 * @version 1.0.0
 */
import {FC, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/reducers/root-reducer";
import {useLocation} from "react-router";
import {useNavigate} from "react-router-dom";

export const Watchlist: FC = () => {
    const isLoggedIn = useSelector((state: AppStateType) => state.user.isLoggedIn);

    const location = useLocation();
    const history = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            history("/login");
            return;
        }
    },[isLoggedIn]);

    return (
        <div>
            <h1>test</h1>
        </div>
    );
};
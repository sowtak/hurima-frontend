/**
 * @author  Sowa Takayanagi
 * @since   12/23/2021 1:55 AM
 * @version 1.0.0
 */
import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/reducers/root-reducer";

import logo from '../../images/icons/logo.png';

export const NavBar: FC = () => {
    const dispatch = useDispatch();
    const isLoggedIn: boolean = useSelector((state: AppStateType) => state.user.isLoggedIn);

    return(
        <div>
            <div id="haader" className="container-fluid header-top d-none d-md-block pb-5 pt-5">
                <img src={logo} className="rounded mx-auto d-block"/>
            </div>
        </div>
    )
}
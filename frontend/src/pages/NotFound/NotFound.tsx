/**
 * @author  Sowa Takayanagi
 * @since   12/26/2021 9:28 PM
 * @version 1.0.0
 */

import logo from '../../images/icons/logo.png';
import {FC} from "react";
import {Link} from "react-router-dom";

export const NotFound: FC = () => {
    return (
        <div>
            <h1>404 - Page not found...</h1>
            <img src={logo} alt='logo'/>
            <Link to="/">トップへ戻る</Link>
        </div>
    )
};
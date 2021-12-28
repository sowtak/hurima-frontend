/**
 * @author  Sowa Takayanagi
 * @since   12/28/2021 1:40 AM
 * @version 1.0.0
 */
import {FC, PropsWithChildren, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/reducers/root-reducer";

export const Watchlist: FC = (props: PropsWithChildren<any>) => {
    const isLoggedIn = useSelector((state: AppStateType) => state.user.isLoggedIn);

    const redirect = props.location.pathname + props.location.search;

    useEffect(() => {
        if (!isLoggedIn) {
            props.history.push(`/login?redirect=${redirect}`);
            return;
        }
    })

    return (
        <div>
            <h1>test</h1>
        </div>
    );
};
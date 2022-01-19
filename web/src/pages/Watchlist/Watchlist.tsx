/**
 * @author v Sowa Takayanagi
 * @since   12/28/2021 1:40 AM
 * @version 1.0.0
 */
import {FC} from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {AppState} from "../../store/rootReducer";

export const Watchlist: FC = () => {
  return (
    <>
      <div>
        <h1>Watch List</h1>
      </div>
    </>
  );
};
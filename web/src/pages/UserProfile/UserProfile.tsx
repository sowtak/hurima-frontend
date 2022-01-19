/**
 * @author  Sowa Takayanagi
 * @since   1/2/2022 6:58 PM
 * @version 1.0.0
 */
import {FC, useEffect} from "react";
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";

export const User: FC = () => {
  const dispatch = useDispatch();


  return (
    <div className='account-container container'>
      <div className='row mt-5'>
        <div className='col-md-2'>
          <h4>My Account</h4>
          <NavLink to='/account/user/info'
                   className={({isActive}) => 'nav-link' + (isActive ? ' is-active' : '')}>
            Profile</NavLink>
          {(localStorage.getItem("userRole") === "ADMIN") ?
            <>
              <NavLink to='/account/admin/users'
                       className={({isActive}) => 'nav-link' + (isActive ? ' is-active' : '')}>
                List of all users</NavLink>
            </> :
            <>
              <NavLink to='/account/user/edit'
                       className='nav-link'>
              Edit</NavLink>
              <NavLink to='/account/'
                       className='nav-link'>

              </NavLink>
            </>
            
          }
        </div>
      </div>
    </div>
  );
};
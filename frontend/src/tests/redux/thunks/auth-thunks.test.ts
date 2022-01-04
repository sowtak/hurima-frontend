/**
 * @author  Sowa Takayanagi
 * @since   1/4/2022 9:20 AM
 * @version 1.0.0
 */

import configureMockStore from 'redux-mock-store';
import thunk, {ThunkDispatch} from "redux-thunk";
import {InitialStateType} from "../../../redux/reducers/auth-reducer";
import {Action} from "redux";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import fn = jest.fn;

const mockStore = configureMockStore<InitialStateType, ThunkDispatch<InitialStateType, void, Action>>([thunk]);
const mock = new MockAdapter(axios);
const store = mockStore();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
    useNavigate: () => ({
      push: jest.fn()
  })
}));
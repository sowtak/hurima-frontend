/**
 * @author  Sowa Takayanagi
 * @since   12/23/2021 2:00 AM
 * @version 1.0.0
 */
import {Item} from "../entity/Item";


export type UserData = {
    email: string
    password: string
};



export type AppProps = {
    loading: boolean
    data: Array<Item> | any
    searchByData: Array<{ label: string, value: string}> | any
    setFilteredData: (value: (((previousState: Array<Item>) => Array<Item>) | Array<Item>))=> void
    setSearching: (value: (((previousState: boolean | any) => boolean | any) | boolean | any)) => void
};

export enum LoadingStatus {
    LOADING = "LOADING",
    LOADED = "LOADED",
    ERROR = "ERROR",
    NEVER = "NEVER",
    SUCCESS = "SUCCESS"
}
/**
 * @author  Sowa Takayanagi
 * @since   12/23/2021 2:00 AM
 * @version 1.0.0
 */

export type User = {
    id: number
    username: string
    email: string
    activationCode: string | null
    passwordResetCode: string | null
    active: boolean
    roles: Array<string>
};


export type UserData = {
    email: string
    password: string
};


export type Item = {
    id: number
    name: string
    seller: User
    sellerEmailDomain: string
    condition: string
    description: string
    price: string
}

export type AppProps = {
    loading: boolean
    data: Array<Item> | any
    searchByData: Array<{ label: string, value: string}> | any
    setFilteredData: (value: (((previousState: Array<Item>) => Array<Item>) | Array<Item>))=> void
    setSearching: (value: (((previousState: boolean | any) => boolean | any) | boolean | any)) => void
};

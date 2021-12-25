/**
 * @author  Sowa Takayanagi
 * @since   12/23/2021 2:00 AM
 * @version 1.0.0
 */

export type User = {
    id: number
    email: string
    activationCode: string | null
    passwordResetCode: string | null
    active: boolean
    roles: Array<string>
};

export type AuthErrors = {
    emailError: string
    passwordError: string
    password2Error: string
}

export type UserData = {
    email: string
    password: string
};

export type UserRegistration = {
    email: string
    firstName: string
    lastName: string
    password: string
    password2: string
    captcha: string | null
};

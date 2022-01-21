/**
 * @author  Sowa Takayanagi
 * @since   1/21/2022 3:50 PM
 * @version 1.0.0
 */

export const validateEmail = (email: string | undefined): string => {
    return (email === undefined || !email.match(/^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/))
        ? "Email is invalid"
        : "";
};

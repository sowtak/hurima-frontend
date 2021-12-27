/**
 * @author  Sowa Takayanagi
 * @since   12/27/2021 4:12 AM
 * @version 1.0.0
 */
import {Alert} from "react-bootstrap";

export const Message = (children: {children:string, variant: string}, variant: string ) => {
    return(
        <div>
            <Alert variant={variant}>{children}</Alert>
        </div>
    );
};
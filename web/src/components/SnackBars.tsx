///**
// * @author  Sowa Takayanagi
// * @since   1/21/2022 7:39 PM
// * @version 1.0.0
// */
//import {styled} from "@mui/material/styles";
//import {Alert, Slide, Snackbar} from "@mui/material";
//import {FC, useState} from "react";
//
//export const SuccessSnackbar: FC = (props) => {
//    const [isOpen, setIsOpen] = useState(false)
//
//    return (
//        <Snackbar
//            anchorOrigin={{
//                vertical: 'bottom',
//                horizontal: 'right',
//            }}
//            open={isOpen}
//            autoHideDuration={60000}
//            onClose={() => setIsOpen(false)}
//            >
//            <Alert severity={'success'}>
//                {props}
//            </Alert>
//        </Snackbar>
//    )
//}
//
//export const FailureSnackbar: FC = (props) => {
//    const [isOpen, setIsOpen] = useState(false)
//
//    return (
//        <Snackbar
//            anchorOrigin={{
//                vertical: 'bottom',
//                horizontal: 'right',
//            }}
//            open={isOpen}
//            autoHideDuration={60000}
//            onClose={() => setIsOpen(false)}
//        >
//            <Alert severity={'error'}>
//                {props}
//            </Alert>
//        </Snackbar>
//    )
//}

import {FC} from "react";

export const a: FC = () => {
    return(
        <></>
    )
}
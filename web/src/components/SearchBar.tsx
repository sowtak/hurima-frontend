/**
 * @author  Sowa Takayanagi
 * @since   12/28/2021 2:51 AM
 * @version 1.0.0
 */
import {ChangeEvent, ElementType, FC, FormEvent, useEffect, useState} from "react";
import {Grid, IconButton, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {styled} from "@mui/system";
import {useNavigate} from "react-router-dom";


export const Searchbar: ElementType = styled(TextField)`
  borderRadius: 30px;
  display: flex;
  width: 100%;
`

export const SearchBar: FC = (props) => {
    const [value, setValue] = useState('')

    const navigate = useNavigate()

    const handleClickSearch = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        navigate('/search', {state: {value: encodeURIComponent(value)}})
    }


    return (
        <Grid sx={{paddingLeft: "24px", paddingRight: "64px", maxWidth: '1000px', flexGrow: '1'}}>
            <form onSubmit={handleClickSearch}>
                <Searchbar
                    variant='outlined'
                    label='Search items'
                    value={value}
                    fullWidth
                    onChange={(ev: ChangeEvent<HTMLFormElement>) => setValue(ev.currentTarget.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='start'>
                                <IconButton>
                                    <SearchIcon/>
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </form>
        </Grid>
    )
}

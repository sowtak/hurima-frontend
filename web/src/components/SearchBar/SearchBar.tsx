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
    const [value, setValue] = useState([])

    const navigate = useNavigate()

    const handleClickSearch = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        //navigate({pathname: '/search', state: {value: encodeURIComponent(value)}})
    }

    useEffect(() => {
        fetch("https://swapi-demo.azurewebsites.net/api/starships")
            .then((response) => response.json())
            .then((data) => setValue(data))
    })


    return (
        <form onSubmit={handleClickSearch}>
            <Grid container alignItems='center' sx={{paddingLeft: "24px", paddingRight: "64px", maxWidth: '1000px'}}>
                <Searchbar
                    variant='outlined'
                    label='Search items'
                    value={value}
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
            </Grid>
        </form>
    )
}

/**
 * @author  Sowa Takayanagi
 * @since   12/28/2021 2:51 AM
 * @version 1.0.0
 */
import {ChangeEvent, ElementType, FC, FormEvent, useEffect, useState} from "react";
import {Autocomplete, Grid, IconButton, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {styled} from "@mui/system";


export const Searchbar: ElementType = styled(TextField)`
  borderRadius: 10;
  display: flex;
  width: 100%;
`;

export const SearchBar: FC = (props) => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    fetch("https://swapi-demo.azurewebsites.net/api/starships")
      .then((response) => response.json())
      .then((data) => setValue(data))
  });



  return (
    <Grid container alignItems='center' sx={{paddingLeft: "24px", paddingRight: "64px", maxWidth: '1000px'}}>
      <Searchbar
        label='search'
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
  );
}

/**
 * @author  Sowa Takayanagi
 * @since   12/28/2021 2:51 AM
 * @version 1.0.0
 */
import {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import {Grid, TextField} from "@mui/material";
import {Autocomplete} from "@mui/lab";


export const SearchBar: FC = (props) => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    fetch("https://swapi-demo.azurewebsites.net/api/starships")
      .then((response) => response.json())
      .then((data) => setValue(data))
  });

  return (
    <Grid container alignItems='center'>
      <Autocomplete
        id='search-bar'
        value={value}
        autoComplete={true}
        autoHighlight={true}

        renderInput={(params) => (
          <TextField {...params} label="keyword" variant='outlined' />
        )}

        options={value}
        clearOnBlur
      />
    </Grid>
  );
}

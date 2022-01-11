/**
 * @author  Sowa Takayanagi
 * @since   12/28/2021 2:51 AM
 * @version 1.0.0
 */
import {ChangeEvent, FC, FormEvent, useState} from "react";
import {Grid} from "@mui/material";
import {Autocomplete} from "@mui/lab";
import {connect, useSelector} from "react-redux";


export const SearchBar: FC = (props) => {
  const [value, setValue] = useState<string | null | never>('');
  const searchSuggestions = useSelector(state => state.searchKey);
  let selectedValue = null;

  const getSearchKeyword = () => {
    return document.querySelector('input[id="search-bar"]')?.nodeValue
  }

  const handleInputChange = (event: ChangeEvent, newValue: string) => {
    selectedValue = newValue;
    props.getSearchSuggestions(newValue);
  }
  return (
    <Grid container alignItems='center'>
      <Autocomplete
        id='search-bar'
        value={value}
        autoComplete={true}
        autoHighlight={true}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue({
              keyword: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              keyword: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
        }}
        onInputChange={}

        renderInput={(params) => {

        }
        }
        options={}
        clearOnBlur
      />
    </Grid>
  );
}

export default connect(null, {getSearchSuggestions})(SearchBar);

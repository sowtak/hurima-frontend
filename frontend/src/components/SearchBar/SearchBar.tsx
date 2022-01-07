/**
 * @author  Sowa Takayanagi
 * @since   12/28/2021 2:51 AM
 * @version 1.0.0
 */
import {ChangeEvent, FC, FormEvent, useState} from "react";
import {Button, Col, Form, FormControl, FormSelect, Row} from "react-bootstrap";
import {AppPropsType} from "../../types/types";


export const SearchBar: FC<AppPropsType> = ({data, searchByData, setFilteredData, setSearching}) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [searchFor, setSearchFor] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (searchQuery.trim() !== '') {
      setSearching(true);
      const filteredData = [...data].filter((userEmailDomain: any) => {
        let searchKey: string = '';
        if (searchByData && searchByData.length > 0) {
          searchKey = searchBy;
        }
        return userEmailDomain[searchKey].toLowerCase().includes(searchQuery.trim().toLowerCase());
      });
      setFilteredData(filteredData);
    } else {
      setFilteredData(data);
    }
    setSearchFor(searchQuery);
  };

  return (
    <div>
      <Row>
        {searchByData && searchByData.length > 0 &&
          <>
            <Col>
              <FormSelect className='form-control'
                          value={searchBy}
                          onChange={(event: ChangeEvent<HTMLSelectElement>) => setSearchBy(event.target.value)}
              >
                {searchByData.map((data, index) => (
                  <option key={index} value={data.value}>{data.label}</option>
                ))}
              </FormSelect>
            </Col>
            <Col>
              <Form onSubmit={handleSubmit}>
                <FormControl type='search'
                             value={searchQuery}
                             placeholder='search'
                             onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value)}
                             className='search-bar'
                />
                <span>
                <Button variant='outline-secondary'>
                  <i className='fas fa-search'/>
                </Button>
              </span>
              </Form>
            </Col>
          </>
        }
      </Row>
    </div>
  );
}
/**
 * @author  Sowa Takayanagi
 * @since   12/28/2021 4:27 PM
 * @version 1.0.0
 */
import {ChangeEvent, FC, FormEvent, useState} from "react";
import {Form} from "react-bootstrap";

export const Hoge:FC = () => {

    const [hoge, setHoge] = useState('');

    const handleHoge = (event: FormEvent<HTMLFormElement>) => {
        window.alert("SUCCESS");
    }

    return(
        <div id='container' className='container mt-5'>
            <div className='row'>
                <div className='col-md-6'>
                    <form onSubmit={handleHoge}>
                        <div className='form-group row'>
                            <label className='col-sm-4 col-form-label'>hoge</label>
                            <div className='col-sm-7'>
                                <input className='form-control'
                                       type='hoge'
                                       name='hoge'
                                       value='hoge'
                                       onChange={(e) => setHoge(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
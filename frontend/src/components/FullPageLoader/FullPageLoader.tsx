/**
 * @author  Sowa Takayanagi
 * @since   12/27/2021 4:27 PM
 * @version 1.0.0
 */

export const FullPageLoader = () => {
    return (
        <div className='fp-container'>
            <div className='spinner-grow text-success fp-loader' role='status'>
                <span className='sr-only'/>
            </div>
        </div>
    );
};
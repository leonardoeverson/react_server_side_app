import React from 'react';
import {Pagination} from 'react-bootstrap';

export default ({activePage, handleClick}) => {
    let active = activePage;
    let items = [];
    // for (let number = 1; number <= 7; number++) {
    //     items.push(
    //         <Pagination.Item key={number} active={number === active} onClick={handleClick}>
    //             {number}
    //         </Pagination.Item>,
    //     );
    // }

    const paginationBasic = (
        <div>
            <Pagination style={{ marginTop: '5px' }}>
                <Pagination.Prev onClick={()=>{handleClick(1)}}>Anterior</Pagination.Prev>
                <Pagination.Next  onClick={()=>{handleClick(2)}}>Próxima</Pagination.Next>
            </Pagination>
        </div>
    );

    return (
        paginationBasic
    )
}
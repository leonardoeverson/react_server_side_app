import React from 'react';
import {Pagination} from 'react-bootstrap';

export default ({activePage, handleClick}) => {
    let active = activePage;
    let items = [];
    for (let number = 1; number <= 7; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={handleClick}>
                {number}
            </Pagination.Item>,
        );
    }

    const paginationBasic = (
        <div>
            <Pagination style={{ marginTop: '5px' }}>{items}</Pagination>
        </div>
    );

    return (
        paginationBasic
    )
}
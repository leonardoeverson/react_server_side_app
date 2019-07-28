import React, {useState} from 'react';
import {Pagination} from 'react-bootstrap';

export default ({handleClick, activePrev, activeNext}) => {
    //let active = activePage;
    let items = [];

    const paginationBasic = (
        <div>
            <Pagination style={{ marginTop: '5px' }}>
                <Pagination.Item disabled={activePrev} onClick={()=>{handleClick(1)}}>Anterior</Pagination.Item>
                <Pagination.Item disabled={activeNext}  onClick={()=>{handleClick(2)}}>Próxima</Pagination.Item>
            </Pagination>
        </div>
    );

    return (
        paginationBasic
    )
}
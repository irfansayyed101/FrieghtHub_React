import React from 'react';

/* Sort by Id and Name Component  */
const SortTable = props => {
    return(
        <div>
            <button className="addMargin" onClick={props.sortById}>Sort By Id</button>
            <button onClick={props.sortByName}>Sort By Name</button>
        </div>
    );
}; 

export default SortTable;

import React from 'react';
import '../components/css/table.css';

 /* Pagination compnent */
 const PaginationComp = props => {
    const pageNumbers = [];
    if (props.pagination.total !== null) {
      for (let i = 1; i <= Math.ceil(props.pagination.total / props.pagination.per_page); i++) {
        pageNumbers.push(i);
      }
    }
    const renderPageNumbers = pageNumbers.map(number => {
          let classes = props.pagination.current_page === number ? 'active' : '';
  
          return (
            <span key={number} className={classes} onClick={() => props.makeHttpRequestWithPage(number)}>{number}</span>
          );
        });
      
    return (
      <div>
        <div className="pagination">
         {renderPageNumbers}
        </div>
      </div>
    );
  }
  
  export default PaginationComp;

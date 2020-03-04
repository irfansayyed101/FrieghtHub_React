import React, { useState,useEffect } from 'react';
import '../components/css/table.css';
import history from '../common/history';
import PaginationComp from '../components/PaginationComp';
import SearchShipment from '../components/SearchnameComp';
import SortTable from '../components/SortTable';

/* This is the main functional component which gets exported */
const TableComponent = (props) => {
  const [shipments, setShipments] = useState([]);
  const initialFormState = { total: null,
                              per_page: null,
                              current_page: null,
                              limit:10
                            };
  const [pagination, setPagination] = useState(initialFormState);
  const url = 'http://localhost:5000/shipments';

        /* Function to fetch the data */
  async function fetchUrl(url,bflag=false) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      if(!bflag)
        setShipments(json);
      else
        setShipments([json]); 
    } catch(error){
      console.log('Error');
    }
  }
  
  const makeHttpRequestWithPage = async (pageNumber) => {
    let limit = pagination.limit
    let paginatedUrl = url+`?_page=${pageNumber}&_limit=${limit}`;
    const response = await fetch(paginatedUrl);
    const json = await response.json();
    setShipments(json);
    
    for (var pair of response.headers.entries()) { 
      if (pair[0] === 'x-total-count') { 
        setPagination({...pagination,total:pair[1],per_page:limit,current_page:pageNumber});
      }
    }
  }

  useEffect(() => {
    makeHttpRequestWithPage(1)
  }, []);

          /* Search shipment by ID */
  const searchShipmentById = shipmentId => {
   let searchUrl = url+'/'+shipmentId;
   if(shipmentId === ''){ // Here if the text input is blank we need to fetch all the data.
      searchUrl = url +`?_page=${pagination.current_page}&_limit=${pagination.limit}`;
      fetchUrl(searchUrl,false);
   } else{
    fetchUrl(searchUrl,true);
    }
  };

      /* Sort By Id */
  const sortById = () => {
    let searchUrl = url+`?_sort=id&_order=asc&_limit=${pagination.limit}&_page=${pagination.current_page}`;
    fetchUrl(searchUrl,false);
  }
  
      /* Sort By Name */
  const sortByName = () => {
    let searchUrl = url+`?_sort=name&_order=asc&_limit=${pagination.limit}&_page=${pagination.current_page}`;
    fetchUrl(searchUrl,false);
  }

  const editRow = shipment => {
    history.push('/Details/'+shipment.id);
   }
 
  return(
    <div className='tableComponent'>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 sortTable" >
          <SortTable sortById={sortById} sortByName={sortByName}/>
          </div>
          <div className="col-sm-6 searchTable" >
          <SearchShipment searchShipmentById={searchShipmentById} shipmement={shipments}/>
          </div>
        </div>
        <div className="row">
          <div className="col">
          <ShipmentTable shipmement={shipments} editRow={editRow}/>
          </div>
        </div>
        <div className="row">
        <div className="col-sm-10" >
        </div>
          <div className="col-sm-2" >
          <PaginationComp makeHttpRequestWithPage={makeHttpRequestWithPage}
          pagination={pagination}/>
          </div>
        </div>
      </div>
    </div>
    )
  }
       
    /*  Shipment Table component */ 
  const ShipmentTable = props => (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Mode</th>
          <th>Type</th>
          <th>Destination</th>
          <th>Origin</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {props.shipmement.length > 0 ? (
          props.shipmement.map((ship,key) => (
            <tr key={key} onClick={() => {
              props.editRow(ship)
          }}>
              <td>{ship.name}</td>
              <td>{ship.mode}</td>
              <td>{ship.type}</td>
              <td>{ship.destination}</td>
              <td>{ship.origin}</td>
              <td>{ship.total}</td>
              <td>{ship.status}</td>
              
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6}>No shipmement data available </td>
          </tr>
        )}
      </tbody>
    </table>
  )

export default TableComponent; // Exposes the component to other modules.

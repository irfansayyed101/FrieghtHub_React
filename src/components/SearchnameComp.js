import React,{useState} from 'react';
import '../components/css/table.css';

/* Search Shipment by ID Compnent  */
const SearchShipment = props => {
    const [ship, setShip] = useState({id:0});
  
    const handleInputChange = event => {
      setShip({id:event.target.value});
      props.searchShipmentById(event.target.value);
    }
  
      return(
        <form
          onSubmit={event => {
          event.preventDefault();
          props.searchShipmentById(ship.id);
        }}
      >
        <label className="addMargin1">Shipment Id</label>
        <input type="text" name="id" onChange={handleInputChange}/>
      </form>
      );
   } ;  

   export default SearchShipment;

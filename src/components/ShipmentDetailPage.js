import React, { useState,useEffect } from 'react';
import './css/shippingDetails.css';
import history from '../common/history';

const EditShipment = (props) => {
    const [shipments, setShipments] = useState({name:''});
    const url = 'http://localhost:5000/shipments/' + props.match.params.id;

    async function fetchUrl(url,options={},bflag=false) {
      try {
        const response = await fetch(url,options);
        const json = await response.json();
        setShipments(json); 
        if(bflag){
            alert('Successfully updated shipment name ');
        }
      }catch(error){
        console.log('Error');
      }
    }
  
    useEffect(() => {
      fetchUrl(url);
    }, []);
    
    const updateName = currentObj => {
        let options = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentObj)
          }
      if(currentObj.name === ''){
          alert('Please enter the shipment name ');
          return;
      }    
      fetchUrl(url,options,true);
    }
  
    return(
       <FormComponent shipmentDetail={shipments} updateName={updateName}/>
    );
};

const FormComponent = props => {
    const [shipment, setShipment] = useState(props.shipmentDetail);
    const handleInputChange = event => {
       const { name, value } = event.target
       setShipment({ ...shipment, [name]: value })
      }

      useEffect(() => {
        setShipment(props.shipmentDetail)
      }, [props]);

return(
    <div className="container containerSty">
    <form 
	 onSubmit={event => {
                event.preventDefault();
                props.updateName(shipment);
            }}
	>
    <div className="form-group row">
        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
        <div className="col-sm-4">
            <input type="text" className="form-control" name="name" value={shipment.name}  onChange={handleInputChange}/>
        </div>
    </div>
    <div className="form-group row">
        <label htmlFor="mode" className="col-sm-2 col-form-label">Mode</label>
        <div className="col-sm-4">
             <label type="text" name="mode" >{shipment.mode}</label>
        </div>
    </div>
    <div className="form-group row">
        <label htmlFor="mode" className="col-sm-2 col-form-label">Type</label>
        <div className="col-sm-4">
             <label type="text" name="type" >{shipment.type}</label>
        </div>
    </div>
	
	<div className="form-group row">
        <label htmlFor="mode" className="col-sm-2 col-form-label">Destination</label>
        <div className="col-sm-4">
             <label type="text" name="destination" >{shipment.destination}</label>
        </div>
    </div>
	<div className="form-group row">
        <label htmlFor="mode" className="col-sm-2 col-form-label">Origin</label>
        <div className="col-sm-4">
             <label type="text" name="total" >{shipment.origin}</label>
        </div>
    </div>
    <div className="form-group row">
        <label htmlFor="mode" className="col-sm-2 col-form-label">Total</label>
        <div className="col-sm-4">
             <label type="text" name="total" >{shipment.total}</label>
        </div>
    </div>
	<div className="form-group row">
   
        <label htmlFor="mode" className="col-sm-2 col-form-label">Status</label>
        <div className="col-sm-4">
             <label type="text" name="status" >{shipment.status}</label>
        </div>
    </div>
	
    <div className="form-group row">
        <div className="col-sm-3 offset-sm-0">
            <input type="submit" value="Submit"/>
        </div>
        <input type="button" className="backButton" value="Go Back To Summary Page!" onClick={()=> history.push('/')} />
    </div>
</form>
    </div>
    );
}
export default EditShipment;

import Select from 'react-select'
import React, { useEffect, useState } from "react";
const SELECT_VALUE_KEY = "MySelectValue";
function TableRows({rowsData, deleteTableRows, handleChange}) {
    const [sel, setSel] = useState("");
    const [type,setType] = useState("");
    const Type = [
        { value: 31.00, label: 'Grande chambre froide négative' },
        { value: 27.00, label: 'Grande chambre froide positive' },
        { value: 25.00, label: 'Petite chambre froide négative' },
        { value: 21.00, label: 'Petite chambre froide positive' },
        { value: 40.00, label: 'Tunnel de congélation' }
        
      ]

     


      const [selected, setSelected] = React.useState([]);

     
      
    const  handleChange_first = (e) =>  

    {
     
      sessionStorage.setItem('Type',e.value);
      console.log(setType(e.value))
    
      };
       
      React.useEffect(() => {
        const lastSelected = JSON.parse(
            sessionStorage.getItem(SELECT_VALUE_KEY) ?? "[]"
        );
        setSelected(lastSelected);
      }, []);
    
   const  handleChange_second = (e) =>  

   {
    sessionStorage.setItem('Surface',e.target.value);
   

       
       
   }
  
         
    return(
        
        rowsData.map((data, index)=>{
           
            return(

                <tr key={index}>
                <td>
               <input type="number" min="1"  onChange={(evnt)=>(handleChange(index, evnt))} name="quantite" className="form-control"/>
                </td>
                <td>
                <Select

options={Type}

selected={sessionStorage.getItem('Type')}
onChange={handleChange_first.bind(this)} 
/>
                </td>
                <td>
                <input type="text"  value = {sessionStorage.getItem('Surface')}name="surface" className="form-control"  onChange={handleChange_second}/>
                </td>
               
                <td>
               <input type="text"  value={sessionStorage.getItem('Surface')*sessionStorage.getItem('Type') }   onChange={(evnt)=>(handleChange(index, evnt))} name="prix_unitaire" className="form-control"/>
                </td>
                <td><input type="text"    onChange={(evnt)=>(handleChange(index, evnt))} name="taxe" className="form-control"/> </td>
                <td><input type="text"  value={sessionStorage.getItem('Surface')*sessionStorage.getItem('Type') } onChange={(evnt)=>(handleChange(index, evnt))} name="montant" className="form-control" /> </td>
                <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
              
            </tr>
            
      
         

            )
          
        })
    
  
    )
  

}

export default TableRows;
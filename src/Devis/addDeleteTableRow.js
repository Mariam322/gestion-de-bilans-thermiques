import { useState } from "react/cjs/react.development"
//import 'bootstrap/dist/css/bootstrap.min.css';
import TableRows from "./TableRows"
import '../Devis/Devis.css';
function AddDeleteTableRow(){


    const [rowsData, setRowsData] = useState([]);
 
    const addTableRows = ()=>{
  
        const rowsInput={
            fullName:'',
            emailAddress:'',
            salary:''  
        } 
        setRowsData([...rowsData, rowsInput])
      
    }
   const deleteTableRows = (index)=>{
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
   }
 
   const handleChange = (index, evnt)=>{
    
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  
 
 
}
    return(
        <div className="container">
            <div className="row">
                <div className="col-sm-8">

                <table className="table" style={{width: '1330px', marginLeft:'10px'}}>
                    <thead>
                      <tr>
                          <th>QUANTITÉ</th>
                          <th>Type chambre froide</th>
                          <th>Surface (m²)</th>
                          <th>PRIX UNITAIRE</th>
                          <th>Taxe</th>
                          <th>MONTANT</th>
                          <th><button className="btn-ajouter" onClick={addTableRows} >+</button></th>
                      </tr>

                    </thead>
                   <tbody>

                   <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />

                   </tbody> 
                </table>

                </div>
                <div className="col-sm-4">

                </div>
            </div>
        </div>
    )

}
export default AddDeleteTableRow
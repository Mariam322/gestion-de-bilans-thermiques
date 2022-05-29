import React, { Component } from 'react';
import API from '../Api/Api';
import { DataGrid,GridColDef,GridRowsProp } from '@mui/x-data-grid';
import { Grid } from "@material-ui/core";
import Select from 'react-select';
import  {
    SearchPanel
} from 'devextreme-react/data-grid';
import '../Ville/ville.css';
import Swal from 'sweetalert2';
import ville from '../assets/map.PNG'
export default class Ville extends Component {

    constructor(props) {
    super(props);
   
    this.state = {
        selectedRow:{},
        libelle_ville:'',
        Latitude:'',
        Tmax:'',
        Hr : '', 
        temp:'',
        
        redirect: null,
        villee: [],
        tempS: []
        
        };
        this.state = {
            searchText: ""
        }

        

     
        
    }
    /*async getOptions(){
        const res = await API.get('/gettemp')
        const data = res.data
        
    
        const options = data.map(d => ({
          "value" : d.temp,
          "label": d.temp
        }))
    
        this.setState({tempS: options})
    
      }*/
    
    //componentDidMount() est appelée immédiatement après que le composant est monté (inséré dans l’arbre).
    componentDidMount=async() =>{
        this.GetData();
        //this.getOptions();
        }
        componentDidUpdate=()=>{
            this.GetData()
        }
     



        
            GetData = async () => {
                await API.get('/getville')
                .then(response => {
                this.setState({ villee: response.data });
                })
                .catch(function (error) {
                console.log(error);
                })
                }
                handleChange= (e)=> {
                    let nam = e.target.name;
                    let val = e.target.value;
                    this.setState({[nam]: val});
                    
                   }
                   Addville=()=>{ 
                    const villeObject = {
                      libelle_ville:this.state.libelle_ville,
                      Latitude:this.state.Latitude,
                      Tmax:this.state.Tmax,
                      Hr : this.state.Hr 
        
                }; 
              
                    API.post('/InsertVille',villeObject )
                     .then((response)=> {
                      console.log(response)
                      console.log(response.data)
                      if (response.data == 'existe!'){
                        Swal.fire({
                         
                          text: 'ville existe !',
                          icon: 'warning',
               
                          confirmButtonColor: 'black',
                         
                          confirmButtonText: 'OK'
                          })
                          
                       
                   
                      }
                    });
                  }
                   

                  
                   render() {
                    let { searchText } = this.state;
                   console.log(this.state.villee)
                    const rows: GridRowsProp =this.state.villee
                    const columns: GridColDef[] = [
                        { field: 'id', headerName: 'id_ville', width: 100 },
          { field: 'libelle_ville', headerName: 'libelle_ville' , width: 150 },
          { field: 'Latitude', headerName: 'Latitude' , width: 100 },
          { field: 'Tmax', headerName: 'Tmax' , width: 100 },
          { field: 'Hr', headerName: 'Hr' , width: 100 },
         
        
                    
           
             ]; 
             /*console.log(this.state.selectedRow)*/
             return (
          
                
               
                <div>
                    
                     <h1> Caractéristiques de la Chambre froide</h1>
                     <SearchPanel  visible={true}  />
                    
                     <DataGrid rows={rows} 
                     columns={columns}  
                      allowColumnReordering={true}
           style={{height:400,
                width: 800,
                justifyContent: 'space-between',
                display: 'flex',
                marginTop: '50px',
              
                }} checkboxSelection 
              
                 onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRows = rows.filter((row) =>
                  selectedIDs.has(row.id),
                  
                  
                );
           
        
        
                this.setState({selectedRow:selectedRows});
                this.setState({libelle_ville:selectedRows[0].libelle_ville})
                this.setState({Latitude:selectedRows[0].Latitude}) 
                this.setState({Tmax:selectedRows[0].Tmax})
                
                
                this.setState({Hr:selectedRows[0].Hr})
              
                this.setState(searchText)
                
              }}
              
        
         />
        
                <Grid container className="table table-striped"   >
              
                     <Grid item xs={11}  >
                    
                   
        
                     </Grid>
                     <img src={ville} alt="ville" className='map' />
                 </Grid> 
                
                 <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
                 <div className="newUser">
     
     
     <form className="newUserForm">
        
    
       <div className="newUserItem">
         <label>Ville :</label>
         <input type="text" placeholder="Ville"  value={this.state.libelle_ville} onChange={this.handleChange} 
         name="libelle_ville"  required/>
       </div>
       <div className="newUserItem">
         <label>Latitude :</label>
         <input type="text" placeholder="Latitude"value={this.state.Latitude} onChange={this.handleChange}
        name="Latitude" required />
       </div>

       <div className="newUserItem">
         <label>Température (°C) :</label>
         <input type="text" placeholder="Tmax"value={this.state.Tmax} onChange={this.handleChange}
        name="Tmax" required />
       </div>

       <div className="newUserItem">
         <label>Humidité relative (%) :</label>
         <input type="text" placeholder="Hr" value={this.state.Hr} onChange={this.handleChange}
        name="Hr" required />
       </div>
      
       
       </form>

</div>
            <button  type="submit" onClick={this.Addville} className="newUserButton">Ajouter</button>
          <a href="/Project-list"><button  type="button"  className="newUserButton">Retour  </button></a>
           <a href="/Mur_1"><button  type="submit"  className="newUserButton">Suivant  </button></a>
      
                 </div>
                
                 );  
                 }
                 }
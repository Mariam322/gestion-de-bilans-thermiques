import React, { Component } from 'react';
import API from '../Api/Api';
import { DataGrid,GridColDef,GridRowsProp } from '@mui/x-data-grid';
import { Grid } from "@material-ui/core";
import Select from 'react-select';
import  {
    SearchPanel
} from 'devextreme-react/data-grid';
import NavAdmin from '../Navbar/Navadmin'
import NavEmploye from '../Navbar/Nav'
import Swal from 'sweetalert2';
export default class Ville extends Component {

    constructor(props) {
    super(props);
   
    this.state = {
        selectedRow:{},
        Denrées:'',
        Tcons:'',
        Hr:'',
        Point_de_cong : '', 
        capacité_therm_avant_cong:'',
        capacité_therm_apres_cong:'',
        Lc_cong:'',
        Q_de_resp:'',
        Densité_entreposage:'',
        Temperature:[],
        redirect: null,
        product: [],
        tempS: '',
        TEST:'',  
        masse:'',   
        type_chambre:'',   
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
        this.getOptions();
        }
     
     



        
            GetData = async () => {
                await API.get('/getProduit')
                .then(response => {
                this.setState({ product: response.data });
                })
                .catch(function (error) {
                console.log(error);
                })
                }
                handleChange= (e)=> {
                    
                    let nam = e.target.name;
                    let val = e.target.value;
                    this.setState({[nam]: val});
                   sessionStorage.setItem('Point_de_cong',this.state.Point_de_cong);
                  
                    
                    //this.setState({Temperature:e.value});
                    
                   }
                   handelChange_first=(e)=>{
                  
               
                        this.setState({Temperature:this.getOptions()});
                        sessionStorage.setItem('Temperature',e.value);
                        this.setState({Point_de_cong:sessionStorage.getItem('Point_de_cong')})

                   }
            
                   async getOptions(){
                    const res = await API.get('/getTempInterne')
                    const data = res.data
                    
                
                    const options = data.map(d => ({
                      "value" : d.Temperature,
                      "label": d.Temperature
                    }))
                
                    this.setState({Temperature: options})
                    this.setState({Point_de_cong:''})
            
                
                  }    
                  handleChange_second = (e) => {
                    let nam = e.target.name;
                    let val = e.target.value;
                    this.setState({[nam]: val});
                    this.setState({type_chambre:''})
                    console.log('CONGGGGG',sessionStorage.getItem('Point_de_cong'))
                    this.setState({Point_de_cong:sessionStorage.getItem('Point_de_cong')})
                    sessionStorage.setItem('type_chambre',this.state.type_chambre);
                    
                   
                    if( (sessionStorage.getItem('Temperature')) > (sessionStorage.getItem('Point_de_cong'))) {
                      
                     
                      this.setState({
                        
                        type_chambre:'chambre froide négative'
                   });
                   return sessionStorage.setItem('type_chambre',this.state.type_chambre)
                    }else{
                      
                      this.setState({
                        type_chambre:'chambre froide positive'
                      })
                      
                    }
                    return sessionStorage.setItem('type_chambre',this.state.type_chambre)
                     console.log (this.state.type_chambre);
                    
                  }

                  
                   render() {
                    let { searchText } = this.state;
                   console.log(this.state.product)
                    const rows: GridRowsProp =this.state.product
                    const columns: GridColDef[] = [
                        { field: 'id', headerName: 'id_Produit', width: 100 },
                        { field: 'Denrées', headerName: 'Denrées' , width: 100 },
                        { field: 'Tcons', headerName: 'Tcons' , width: 100 },
                        { field: 'Hr', headerName: 'Hr(%)' , width: 100 },
                        { field: 'Point_de_cong', headerName: 'Point_de_cong(°C)' , width: 130 },
                        { field: 'capacité_therm_avant_cong', headerName: 'capacité_therm_avant_cong(kJ/kg°C)' , width: 220 },
                        { field: 'capacité_therm_apres_cong', headerName: 'capacité_therm_apres_cong(kJ/kg°C)' , width: 220 },
                        { field: 'Lc_cong', headerName: 'Lc_cong(kJ/kg)' , width: 100 },
                        { field: 'Q_de_resp', headerName: 'Q_de_resp(kJ/t.h)' , width: 100 },
                        { field: 'Densité_entreposage', headerName: 'Densité_entreposage(kg/m3)' , width: 170 },
          
         
        
                    
           
             ]; 
             /*console.log(this.state.selectedRow)*/
             return (
          
                
               <div>
               {
            sessionStorage.getItem('isAdmin') === '1' ?  <NavAdmin/>: <NavEmploye/>
          }
                <div style={{marginTop:'120px'}}>
                   
                     <h1 style={{marginTop:'0px'}}> Liste des produits</h1>
                     <SearchPanel  visible={true}  />
                    
                     <DataGrid rows={rows} 
                     columns={columns}  
                      allowColumnReordering={true}
           style={{height:300,
                width: 1400,
                justifyContent: 'space-between',
                display: 'flex',
                marginTop: '60px',
              
                }} checkboxSelection 
              
                 onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRows = rows.filter((row) =>
                  selectedIDs.has(row.id),
                  
                  
                );
           
        
                sessionStorage.setItem('Point_de_cong',selectedRows[0].Point_de_cong)
                this.setState({selectedRow:selectedRows});
                this.setState({Denrées:selectedRows[0].Denrées})
                this.setState({Tcons:selectedRows[0].Tcons}) 
                this.setState({Hr:selectedRows[0].Hr})
                this.setState({Point_de_cong:selectedRows[0].Point_de_cong})
                this.setState({capacité_therm_avant_cong:selectedRows[0].capacité_therm_avant_cong})
                this.setState({capacité_therm_apres_cong:selectedRows[0].capacité_therm_apres_cong})
                this.setState({Lc_cong:selectedRows[0].Lc_cong})
                this.setState({Q_de_resp:selectedRows[0].Q_de_resp})
                this.setState({Densité_entreposage:selectedRows[0].Densité_entreposage})
              
                this.setState(searchText)
                
              }}
     
        
         />
        
                <Grid container className="table table-striped"   >
              
                     <Grid item xs={11}  >
                    
                   
        
                     </Grid>
        
                 </Grid> 
                
                 <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
                 <div className="newUser">
     
     
     <form className="newUserForm" style={{marginTop:'-130px'}}>
        
     <div className="newUserItem">
         <label>Denrées :</label>
         <input type="text" placeholder="Denrées" value={this.state.Denrées}  onChange={this.handleChange} 
         name="Denrées"  required/>
       </div>
       <div className="newUserItem">
         <label>Point de congelation :</label>
         <input type="text" placeholder="point de congélation" value={sessionStorage.getItem('Point_de_cong')}  onChange={this.handleChange} 
         name="Point_de_cong"  required/>
       </div>
       <div className="newUserItem">
         <label>Masse à stocker (Tonnes) :</label>
         <input type="text" placeholder="masse" value={this.state.masse}  onChange={this.handleChange} 
         name="masse"  required/>
       </div>
       <div className="newUserItem" >
         <label>Type de la chambre :</label>
         <input type="text" placeholder="type de la chambre" value={sessionStorage.getItem('type_chambre')} onChange={this.handleChange_second.bind(this)}
        name="type_chambre" required  readonly/>
       </div>

       <div className="newUserItem">
         <label>Température_interne (°C) :</label>
        
         <Select   options={this.state.Temperature}   selected={sessionStorage.getItem('Temperature')} onChange={this.handelChange_first}/>
         
       </div>
       

       <div className="newUserItem">
         <label>Humidité relative (%) :</label>
         <input type="text" placeholder="Hr" value={this.state.Hr} onChange={this.handleChange}
        name="Hr" required />
       </div>
      
       
       </form>
     
</div>
</div>
       
          <a href="/Project-list"><button  type="button"  className="newUserButton">Retour  </button></a>
           <a href="/Mur_1"><button  type="submit"  className="newUserButton">Suivant  </button></a>
      
                 </div>
                
                 );  
                 }
                 }
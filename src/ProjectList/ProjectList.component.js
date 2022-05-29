import React, { Component } from 'react';
import API from '../Api/Api';
import { DataGrid,GridColDef,GridRowsProp } from '@mui/x-data-grid';
import { Grid } from "@material-ui/core";
import '../ProjectList/projlist.css';
import  {
    SearchPanel
} from 'devextreme-react/data-grid';
import Nav from '../Navbar/Nav'
import Select from 'react-select';
import { Link } from 'react-router-dom';
import information from '../assets/information.PNG'
import Swal from 'sweetalert2';
import Epaisseur from'../assets/Epaisseur.PNG'
import Popup from "reactjs-popup";

export default class Project extends Component {

    constructor(props) {
    super(props);
   
    this.state = {
      
        nom_projet:'',
        Date_de_création:'',
        Date_limite:'',
        selectedRow:{},
        id:'',
        
        nom:'',
        prenom:'',
        mail:'',
        code_client:'',
        Hauteur:'',
        Epaisseur:'',
        standard :'',
       
    
        clientiditem:'',

        redirect: null,
        projet: [],
        clientid: [],
        clients: [],
        standarddd:[],
       
        
        };
        this.state = {
            searchText: ""
        }
        

        var today = new Date(),
        Date_de_création = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
       
    this.state = {
      Date_de_création: Date_de_création
    };
        
    }

        async getOptions(){
        const res = await API.get('/getidclient')
        const data = res.data
        
    
        const options = data.map(d => ({
          "value" : d.id,
          "label": d.id
        }))
    
        this.setState({clientid: options})
        this.setState({standard:'Non'})
        this.setState({Epaisseur:''})

    
      }
    //componentDidMount() est appelée immédiatement après que le composant est monté (inséré dans l’arbre).
    componentDidMount=async() =>{
    this.GetData();
    this.getOptions();
    }
    componentDidUpdate=()=>{
        this.GetData()
    }
    componentDidMount_1=() =>{
        const { id } = this.props.match.params;
        this.GetOne(id);
       console.log(id);
        }
     
        GetOne = async (id) => {
            await API.get('/getprojet/'+id)
            .then(response => { 
               this.setState({
                nom_projet: response.data.nom_projet,
                Date_de_création: response.data.Date_de_création,
                Date_limite : response.data.Date_limite,

            
                   });
                   })
                   .catch(function (error) {
                   console.log(error);
                   })
                   }
                   EditProjet=()=>{
                   const { id } = this.props.match.params;
                   let ProjetObject = {
                   id:this.state.selectedRow[0].id,
                   nom_projet: this.state.nom_projet,
                   Date_de_création: this.state.Date_de_création,
                   Date_limite: this.state.Date_limite,

                   };
                   console.log(id)
                   API.put('/updateProjet/'+ ProjetObject.id,ProjetObject )
                   .then(res => console.log(res.data));
                   
                  }
           



                  GetData = async () => {
                    await API.get('/GetProjet')
                    .then(response => {
                    this.setState({ projet: response.data});
                    })
                    .catch(function (error) {
                    console.log(error);
                    })
                    }
                   

        AddProjet=()=>{ 
            const ProjetObject = {
              code_client:this.state.code_client,
              nom_projet: this.state.nom_projet,
              Date_de_création: this.state.Date_de_création,
              Date_limite: this.state.Date_limite,
              standard : this.state.standard ==='Non' ? 0 : 1,
              Epaisseur : this.state.Epaisseur,
              Hauteur : this.state.Hauteur,


        }; 
      
            API.post('/InsertProjet',ProjetObject )
            .then(res => console.log(res.data));
           
           }
           
           async  handleChange_First (e) {      
           
          this.setState({code_client:e.value})

          
            await API.get('/getclient/'+e.value)
            .then(response => { 
              console.log(response)
               this.setState({
                
            
                nom: response.data[0].nom,
                prenom: response.data[0].prenom,
                mail: response.data[0].mail,
               // clientiditem:response.data[0].id,
            
                   });
                   
                    
                   })
                   .catch(function (error) {
                   console.log(error);
                   
                   })
              
                   
                   this.setState({id:e.value});
                  
                  }
              Hello=()=>{
                Swal.fire({
                  title:'Error!',
                  text: 'hello',
                 
                  confirmButtonText: 'Cool'
                  })
              }    


                  handleChange =(e) =>
                  {let nam = e.target.name;
                   let val = e.target.value;

                     this.setState({[nam]: val}); 
                     sessionStorage.setItem('Epaisseur',this.state.Epaisseur);
                     
                }

                
                   handleChange_first = (e) => {
                     
         
                    if (e.value=="Oui") {
                      sessionStorage.setItem('disbaleMur1', 'OUI');
                     
                      this.setState({
                        TEST: false
                    });
                    }else{
                      sessionStorage.setItem('disbaleMur1', 'NON');
                      this.setState({
                        TEST: true
                      })
                    }
                    
                     console.log('satndard',e.value);
                    this.setState({standard:e.value});
                    
                  }
                   
        


        render() {
          const standard = [
            { value: 'Non', label: 'Non'},
                { value: 'Oui', label: 'Oui' },
               
               
              ]
            let { searchText } = this.state;
            console.log(this.state.projet)
            const rows: GridRowsProp =this.state.projet
            const columns: GridColDef[] = [
                { field: 'id', headerName: 'id', width: 90 },
  { field: 'nom_projet', headerName:'nom_projet', width: 150 },
  { field: 'Date_de_création', headerName :'Date_de_création' , width:150 },
  { field: 'Date_limite', headerName:'Date_limite', width: 150 },
  { field: 'code_client', headerName:'code_client' , width: 150 },
  { field: 'nom', headerName: 'nom' , width: 150 },
  { field: 'prenom', headerName: 'prenom' , width: 150 },
  { field: 'mail', headerName: 'mail' , width: 150 },
  { field: 'standard', headerName: 'standard' , width: 150 },
  { field: 'Epaisseur', headerName: 'Epaisseur' , width: 150 },
  { field: 'Hauteur', headerName: 'Hauteur' , width: 150 },

  
 
            
   
     ]; 
     console.log(this.state.selectedRow)
    
     return (
         
        
       
        <div>
          
           
             <h1 > Gestion projets </h1>
             <SearchPanel  visible={true}  />
            
             <DataGrid rows={rows} columns={columns}   allowColumnReordering={true}
   style={{height:400,
        justifyContent: 'space-between',
        display: 'flex',
        marginTop: '30px',
        }} checkboxSelection 
      
         onSelectionModelChange={(ids) => {
           
        const selectedIDs = new Set(ids);
        
        const selectedRows = rows.filter((row) =>
          selectedIDs.has(row.id),
       
          
        );
   
   


        this.setState({selectedRow:selectedRows});
        this.setState({nom_projet:selectedRows[0].nom_projet})
        this.setState({Date_de_création:selectedRows[0].Date_de_création.substr(0,10)})
        this.setState({Date_limite:selectedRows[0].Date_limite.substr(0,10)})
        this.setState({code_client:selectedRows[0].code_client})
        this.setState({nom:selectedRows[0].nom})
        this.setState({prenom:selectedRows[0].prenom})
        this.setState({mail:selectedRows[0].mail})
        this.setState({standard:selectedRows[0].standard})
        this.setState({Epaisseur:selectedRows[0].Epaisseur})
        this.setState({Hauteur:selectedRows[0].Hauteur})
         
        

  
      
        this.setState(searchText)
        
      }}
      

 />

        <Grid container className="table table-striped"   >
      
             <Grid item xs={12}>
            
           

             </Grid>

         </Grid> 
           <br/><br/>
           <fieldset>
           <legend className="hello">Formulaire projet :</legend>
           <div className="newProjet">
           
    

      <form className="newProjectForm">
      <div className="newProjectItem">
          <label>Date de création :</label>
          <input type="text"
           value={this.state.Date_de_création}  
        
          
           name="Date_de_création"
           disabled={true}
          />
        </div>
        <div className="newProjectItem">
          <label>Nom projet:</label>
          <input type="text" placeholder="nom_projet"  value={this.state.nom_projet} onChange={this.handleChange} 
          name="nom_projet"   required />
        </div>

        <div className="newProjectItem">
          <label>Hauteur de la chambre:</label>
          <input type="text" placeholder="Hauteur" value={sessionStorage.setItem('Hauteur',this.state.Hauteur) } onChange={this.handleChange} 
          name="Hauteur"   required />
        </div>
    
        <div className="newProjectItem">
          <label>Date limite :</label>
          <input type="date" placeholder="Date_limite" value={this.state.Date_limite} onChange={this.handleChange} 
          name="Date_limite" required />
        </div>
        <div className="newProjectItem">
        <label>code Client :</label>
        <input type="text"  value={this.state.code_client} readonly/>
        <Select   options={this.state.clientid} onChange={this.handleChange_First.bind(this)}  />
          </div>

        <div className="newProjectItem">
          <label>Nom Client :</label>
          <input type="text" placeholder="nom"  value={this.state.nom} onChange={this.handleChange_First} 
          name="nom" disabled={true}  required />
        </div>
       
        <div className="newProjectItem">
          <label>Prenom Client:</label>
          <input type="text" placeholder="prenom"  value={this.state.prenom} onChange={this.handleChange_First} 
          name="prenom"    disabled={true}  required />
        </div>
        <div className="newProjectItem">
          <label>Mail Client:</label>
          <input type="text" placeholder="mail"  value={this.state.mail} onChange={this.handleChange_First} 
          name="mail" disabled={true} required />
        </div>
        <br/> <br/>
        <fieldset style={{ width:"400%"}}>
            <legend>Panneaux sandwich : </legend>
             
                <div className="newUserItem">
                    <label>Standard :</label>
                    <Select defaultValue={sessionStorage.getItem('disbaleMur1')==='OUI'? standard[1]:standard[0]}  options={standard}  onChange={this.handleChange_first.bind(this)}/>
                </div>
                <div className="newUserItemED">
                     <label>Epaisseur (mm) :</label> 
       
        
                     <input type="number" min="1" max="100" placeholder="Epaisseur" disabled={sessionStorage.getItem('disbaleMur1')!=='OUI'}  onChange={this.handleChange} 
                     name="Epaisseur" value={sessionStorage.getItem('Epaisseur')}/> 
                   
                   
                   <div>
                     
                   <Popup trigger={<Link to ={'/Project-list'}><img src={information} alt="information" className="information"/></Link>} position="top left">
    {close => (
      <div>
        <img src={Epaisseur} alt="Epaisseur" className="Epaisseur"/>
        Fermer ici
        <a className="close" onClick={close}>
          &times;
        </a>
      </div>
    )}
  </Popup>
                   </div>
                
                </div>
                
                
           </fieldset >
          
        <button  type="submit" onClick={this.AddProjet} className="newProjectButton">Ajouter</button>
        <button  type="submit" onClick={this.EditProjet} className="newProjectButton">Modifier</button>
        <Link to={"/ville/"}> <button  type="submit"  className="newProjectButton">Suivant</button></Link>
      </form>
    </div>
    </fieldset>
    </div>
  
  );  
        
    
}
    } 
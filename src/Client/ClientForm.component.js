import React, { Component } from 'react';
import API from '../Api/Api';
import { DataGrid,GridColDef,GridRowsProp } from '@mui/x-data-grid';
import { Grid } from "@material-ui/core";
import '../Client/client.css';
import  {
    SearchPanel
} from 'devextreme-react/data-grid';
import Logo from "../assets/lOGO.JPG"
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import NavAdmin from '../Navbar/Navadmin'
import NavEmploye from '../Navbar/Nav'



export default class Client extends Component {

    constructor(props) {
    super(props);
   
    this.state = {
        selectedRow:{},
        nom:'',
        prenom:'',
        date:'',
        ville : '', 
        pays :'',
        code_postal :'', 
        telephone :'', 
        fax :'', 
        mail :'', 

        redirect: null,
        employee: []
        
        };
        this.state = {
            searchText: ""
        }

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        
       
    this.state = {
        date: date
    };
        
    }
    
    //componentDidMount() est appelée immédiatement après que le composant est monté (inséré dans l’arbre).
    componentDidMount=async() =>{
    this.GetData();
    }
    componentDidUpdate=()=>{
        this.GetData()
    }
    componentDidMount1=() =>{
        const { id } = this.props.match.params;
        this.GetOne(id);
       console.log(id);
        }
    
        GetOne = async (id) => {
            await API.get('/getus/'+id)
            .then(response => { 
               this.setState({
                   nom: response.data.nom,
                   prenom : response.data.prenom,
                   date : response.data.date,
                   ville : response.data.ville, 
                   code_postal :response.data.code_postal, 
                   pays :response.data.pays, 
                   telephone :response.data.telephone, 
                   fax :response.data.fax, 
                   mail :response.data.mail, 
       



                   });
                   })
                   .catch(function (error) {
                   console.log(error);
                   })
                   }
                  Editclient=()=>{
                   const { id } = this.props.match.params;
                   let clientObject = {
                   id:this.state.selectedRow[0].id,
                   nom: this.state.nom,
                   prenom: this.state.prenom,
                   code_postal :this.state.code_postal, 
                   date: this.state.date,
                  ville : this.state.ville, 
                   pays :  this.state.pays, 
                   telephone : this.state.telephone, 
                   fax :this.state.fax, 
                   mail :  this.state.mail, 
       

                   };
                   console.log(id)
                   API.put('/updateClient/'+ clientObject.id,clientObject )
                   .then(res => console.log(res.data));
                   
                  }
           



                  GetData = async () => {
                    await API.get('/GetClient')
                    .then(response => {
                    this.setState({ employee: response.data });
                    })
                    .catch(function (error) {
                    console.log(error);
                    })
                    }
            

        AddClient=()=>{
            const ClientObject = {
            nom: this.state.nom,
            prenom: this.state.prenom,
            date: this.state.date,
            code_postal :this.state.code_postal, 
            ville :  this.state.ville, 
            pays :  this.state.pays, 
            telephone : this.state.telephone, 
            fax : this.state.fax, 
            mail : this.state.mail, 

        }; 
        console.log(this.state.date, this.state.nom ,this.state.prenom, this.state.pays,this.state.ville,this.state.code_postal,this.state.telephone,this.state.fax, this.state.mail )
            API.post('/InsertClient/',ClientObject )
            .then((response)=> {
              console.log(response)
              console.log(response.data)
              if (response.data == 'existe!'){
                Swal.fire({
                 
                  text: 'Client existe !',
                  icon: 'warning',
       
                  confirmButtonColor: 'black',
                 
                  confirmButtonText: 'OK'
                  })
                  
               
           
              }
            });
          }
           
           handleChange= (e)=> {
            let nam = e.target.name;
            let val = e.target.value;
            this.setState({[nam]: val});
           }
           
        


        render() {
            let { searchText } = this.state;
           /* console.log(this.state.employee)*/
            const rows: GridRowsProp =this.state.employee
            const columns: GridColDef[] = [
                { field: 'id', headerName: 'id', width: 90 },
  { field: 'nom', headerName: 'nom' , width: 150 },
  { field: 'prenom', headerName: 'prenom' , width: 90 },
  { field: 'date', headerName: 'date' , width: 150 },
  { field: 'code_postal', headerName: 'code_postal' , width: 150 },
  { field: 'ville', headerName: 'ville' , width: 110 },
  { field: 'pays', headerName: 'pays' , width: 150 },
  { field: 'telephone', headerName: 'telephone' , width: 150 },
  { field: 'fax', headerName: 'fax' , width: 120 },
  { field: 'mail', headerName: 'mail' , width: 180 },
            
            
   
     ]; 
     /*console.log(this.state.selectedRow)*/
     return (
  
  
       
        <div>
                  {
            sessionStorage.getItem('isAdmin') === '1' ?  <NavAdmin/>: <NavEmploye/>
          }
      
             <h1  style={{  marginTop: '120px'}}> Gestion client </h1>
        
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
        this.setState({prenom:selectedRows[0].prenom})
        this.setState({nom:selectedRows[0].nom})
        this.setState({date:selectedRows[0].date})
        this.setState({code_postal:selectedRows[0].code_postal})
        this.setState({ville:selectedRows[0].ville})
        this.setState({pays:selectedRows[0].pays})
        this.setState({telephone:selectedRows[0].telephone})
        this.setState({fax:selectedRows[0].fax})
        this.setState({mail:selectedRows[0].mail})
        this.setState(searchText)
        
      }}
      

 />

        <Grid container className="table table-striped"   >
      
             <Grid item xs={12}>
            
           

             </Grid>

         </Grid> 
           <br/><br/>
         
           <fieldset>
           <legend className="hello">Formulaire client :</legend>
           <div className="newUser">
           
    

      <form className="newUserForm ">
      <div className="newUserItem">
          <label> Date :</label>
          <input
           value={this.state.date}  
           
           disabled={true}
          
           name="date"
   
          />
        </div>
        <div className="newUserItem">
          <label>Nom :</label>
          <input type="text" placeholder="Nom"  value={this.state.nom} onChange={this.handleChange} 
          name="nom" required />
        </div>
        <div className="newUserItem">
          <label>Prenom :</label>
          <input type="text" placeholder="Prenom"value={this.state.prenom} onChange={this.handleChange}
         name="prenom" required />
        </div>
        <div className="newUserItem">
        <label>Pays :</label>
          <input type="text" value={this.state.pays} onChange={this.handleChange}  name="pays" placeholder="pays" required />
        </div>
        <div className="newUserItem">
        <label>Ville :</label>
          <input type="text" value={this.state.ville} onChange={this.handleChange}  name="ville" placeholder="ville" required />
        </div>
        <div className="newUserItem">
          <label>Code postal :</label>
          <input type="text"value={this.state.code_postal} onChange={this.handleChange}  name="code_postal" placeholder="code postal"  required/>
        </div>
        <div className="newUserItem">
          <label>Telephone :</label>
          <input type="tel" value={this.state.telephone} onChange={this.handleChange}  name="telephone" pattern="[0-9]{2}[0-9]{3}[0-9]{3}" placeholder="+216 ******"  required/>
        </div>
        <div className="newUserItem">
        <label>Fax :</label>
          <input type="text"  value={this.state.fax} onChange={this.handleChange} name="fax" placeholder="fax" required />
        </div>
        <div className="newUserItem">
          <label>E-mail :</label>
          <input type="email" value={this.state.mail} onChange={this.handleChange}  name="mail" placeholder="_____@__.__"  required/>
        </div>
       
        <Link to={"/client"}> <button  type="submit" onClick={this.AddClient} className="newUserButton">Ajouter</button></Link>
        <button  type="submit" onClick={this.Editclient} className="newUserButton">Edit</button>
        <button  type="submit"  className="newUserButton">Retour</button>
        </form>
    </div>
    </fieldset>
    </div>
  
  );  
        
    
}
    } 
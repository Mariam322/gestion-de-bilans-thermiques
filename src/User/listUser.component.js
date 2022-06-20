import React, { Component } from 'react';
import API from '../Api/Api';
import { DataGrid,GridColDef,GridRowsProp } from '@mui/x-data-grid';
import { Grid } from "@material-ui/core";

import  {
    SearchPanel
} from 'devextreme-react/data-grid';

import '../User/user.css';
import Select from 'react-select';
import Nav from '../Navbar/Navadmin';
import Swal from 'sweetalert2';




export default class User extends Component {

    constructor(props) {
    super(props);
   
    this.state = {
        selectedRow:{},
        nom:'',
        prenom:'',
        sexe:'',
         
        Route : '', 
        ville :'', 
        code_postal :'', 
        telephone :'', 
        login :'', 
        mail :'', 
        motdepass :'', 
        role:'',
        Etat:'',
        roles:'',
        


        redirect: null,
        employee: [],
        
        
        
        };
        this.state = {
            searchText: ""
        }

     
        
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
            await API.get('/getuser/'+id)
            .then(response => { 
               this.setState({
                   nom: response.data.nom,
                   prenom : response.data.prenom,
                   sexe : response.data.sexe,
                   Route  : response.data.Route , 
                   ville  :response.data.ville , 
                   code_postal  :response.data.code_postal , 
                   telephone  :response.data.telephone , 
                   login  :response.data.login , 
                   mail   :response.data.mail  , 
                   motdepass    :response.data.motdepass   , 

                   
       



                   });
                 
                   })
                   .catch(function (error) {
                   console.log(error);
                   })
                   
                   }
                  Edituser=()=>{
                   const { id } = this.props.match.params;
                   let userObject = {
                   id:this.state.selectedRow[0].id,
                   nom: this.state.nom,
                   prenom: this.state.prenom,
                   sexe :this.state.sexe, 
                   Route : this.state.Route,
                  ville : this.state.ville, 
                  code_postal  :  this.state.code_postal , 
                   telephone : this.state.telephone, 
                   login  :this.state.login , 
                   mail :  this.state.mail, 
                   motdepass  :  this.state.motdepass , 
                    role : this.state.role,
                    Etat: this.state.Etat,

                   };
                   console.log(id)
                   API.put('/updateuser/'+ userObject.id,userObject )
                   .then(res => console.log(res.data));
                   
                  }
           



                  GetData = async () => {
                    await API.get('/getusers')
                    .then(response => {
                    this.setState({ employee: response.data });
                    })
                    .catch(function (error) {
                    console.log(error);
                    })
                    }
            

        AddUser=()=>{
            const UserObject = {
                nom: this.state.nom,
                prenom: this.state.prenom,
                sexe :this.state.sexe , 
                Route : this.state.Route,
               ville : this.state.ville, 
               code_postal  :  this.state.code_postal , 
                telephone : this.state.telephone, 
                login  :this.state.login , 
                mail :  this.state.mail, 
                motdepass  :  this.state.motdepass , 
                roles : this.state.roles,
                Etat : this.state.Etat,
        }; 
        console.log(this.state.nom, this.state.prenom ,this.state.sexe,this.state.Route,this.state.ville,this.state.code_postal,this.state.telephone, this.state.login , this.state.mail , this.state.motdepass ,this.state.roles,this.state.Etat)
            API.post('/Create',UserObject )
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
              console.log(response)
              console.log(response.data)
           
            });
          }
           handleChange= (e)=> {
            let nam = e.target.name;
            let val = e.target.value;       
            this.setState({[nam]: val});
            
           }
           handleChange_role= (e)=> {
           this.setState({ roles: e.value});
           }
           
          
           

        render() {
         
const role = [
            { value: 'Admin', label: 'Admin'},
                { value: 'Employee', label: 'Employee' },
               
               
              ]


            let { searchText } = this.state;
           /*console.log(this.state.employee)*/
            const rows: GridRowsProp =this.state.employee
            const columns: GridColDef[] = [
                { field: 'id', headerName: 'Code user', width: 100 },
  { field: 'nom', headerName: 'Nom' , width: 120 },
  { field: 'prenom', headerName: 'Prénom' , width: 90 },
  { field: 'sexe', headerName: 'Sexe' , width: 110 },
  { field: 'Route', headerName: 'Route' , width: 100 },
  { field: 'ville', headerName: 'Ville' , width: 100 },
  { field: 'code_postal', headerName: 'Code postal' , width: 150 },
  { field: 'telephone', headerName: 'Téléphone' , width: 120 },
  { field: 'login', headerName: 'Login' , width: 120 },
  { field: 'mail', headerName: 'Mail' , width: 150 },
  { field: 'motdepass', headerName: 'Mot de passe' , width: 150 },
  { field: 'roles', headerName: 'roles' , width: 150 },
  { field: 'Etat', headerName: 'Etat' , width: 150 },
            
   
     ]; 


     /*console.log(this.state.selectedRow)*/
     return (
  
        
       
        <div>
          <Nav></Nav>
             <div className="utilisateur">
             <h1> Gestion  utilisateurs </h1>
             <SearchPanel  visible={true}  />
            
             <DataGrid rows={rows} 
             columns={columns}  
              allowColumnReordering={true}
   style={{height:300,
        justifyContent: 'space-between',
        display: 'flex',
        marginTop: '30px',
        marginLeft:'10px',
        }} checkboxSelection 
      
         onSelectionModelChange={(ids) => {
        const selectedIDs = new Set(ids);
        const selectedRows = rows.filter((row) =>
          selectedIDs.has(row.id),
          
          
        );
   


        this.setState({selectedRow:selectedRows});
        this.setState({nom:selectedRows[0].nom})
        this.setState({prenom:selectedRows[0].prenom}) 
        this.setState({sexe:selectedRows[0].sexe})
        this.setState({code_postal:selectedRows[0].code_postal})
        this.setState({ville:selectedRows[0].ville})
        this.setState({Route:selectedRows[0].Route})
        this.setState({telephone:selectedRows[0].telephone})
        this.setState({login:selectedRows[0].login})
        this.setState({mail:selectedRows[0].mail})
        this.setState({motdepass:selectedRows[0].motdepass})
        this.setState({roles:selectedRows[0].roles})
        this.setState({Etat:selectedRows[0].Etat})
       
        
      }}
      

 />

        <Grid container className="table table-striped"   >
      
             <Grid item xs={12}>
            
           

             </Grid>

         </Grid> 
           <br/><br/>
           <fieldset>
           <legend className="hello">Formulaire utilisateur :</legend>
           <div className="newUser">
           <form className="newUserForm ">
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
          <label>sexe:</label>
          <div className="newUserGender">
            <input type="radio" name="sexe" id="female" value='female'  onChange={this.handleChange}   checked={this.state.sexe=='female'}/>
            <label for="female">Female :</label>
            <input type="radio" name="sexe" id="male" value='male' onChange={this.handleChange}  checked={this.state.sexe=='male'} />
            <label for="male">Male :</label>
            
          </div>
        </div>

     
       <div className="newUserItem">
       <label>Route :</label>
         <input type="text" value={this.state.Route} onChange={this.handleChange}  name="Route" placeholder="Route" required />
       </div>
       <div className="newUserItem">
       <label>Ville :</label>
         <input type="text" value={this.state.ville} onChange={this.handleChange}  name="ville" placeholder="ville" required />
       </div>
       <div className="newUserItem">
         <label>Code postal :</label>
         <input type="text" value={this.state.code_postal} onChange={this.handleChange}  name="code_postal" placeholder="code postal"  required/>
       </div>
       <div className="newUserItem">
         <label>Téléphone :</label>
         <input type="tel" value={this.state.telephone} onChange={this.handleChange}  name="telephone" pattern="[0-9]{2}[0-9]{3}[0-9]{3}"  placeholder="+216 **"  required/>
       </div>
       <div className="newUserItem">
       <label>Login :</label>
         <input type="text"  value={this.state.login} onChange={this.handleChange}  name="login" placeholder="login" required />
       </div>


       <div className="newUserItem">
         <label>E-mail :</label>
         <input type="email" value={this.state.mail} onChange={this.handleChange}  name="mail" placeholder="___@.__"  required/>
       </div>
       <div className="newUserItem">
         <label>Mot de passe :</label>
         <input type="password" value={this.state.motdepass} onChange={this.handleChange}  name="motdepass" placeholder="mot de passe"  required/>
       </div>
       
       <div className="newProjectItem">
        <label>Role Utilisateur:</label>
        <Select   options={role}  onChange={this.handleChange_role.bind(this)} />
        <input type="text"  value={this.state.roles} readonly/>
          </div>

          <div className="newUserItem">
          <label>sexe:</label>
          <div className="newUserGender">
            <input type="radio" name="Etat" id="Active" value='Active'  onChange={this.handleChange}   checked={this.state.Etat=='Active'}/>
            <label for="female">Active :</label>
            <input type="radio" name="Etat" id="Desactive" value='Desactive' onChange={this.handleChange}  checked={this.state.Etat=='Desactive'} />
            <label for="male">Desactive :</label>
            
          </div>
        </div>
    <br></br>
    <div>
       <button  type="submit" onClick={this.AddUser} className="newUserButton">Ajouter </button>
       <button  type="submit" onClick={this.Edituser} className="newUserButton">Modifier</button>
       </div>
       </form>
    </div>
    </fieldset>
    </div>
  </div>
  
    );  
        
   
  }
      } 
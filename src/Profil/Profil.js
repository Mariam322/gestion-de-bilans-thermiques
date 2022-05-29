import React, { Component } from 'react';
import API from '../Api/Api';
import Nav from '../Navbar/Nav'

export default class Profil extends Component {

  constructor(props) {
    super(props);
   
    this.state = {
       
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


        redirect: null,
        
        
        };
        

     
        
    }
    componentDidMount=() =>{
      const id = sessionStorage.getItem('userId');
      console.log('id', id)
      this.GetOne(id);
     
      }
      GetOne = async (id) => {
        await API.get('/getuser/'+id)
        .then(response => { 
           this.setState({
               nom: response.data[0].nom,
               prenom : response.data[0].prenom,
               sexe : response.data[0].sexe,
               Route  : response.data[0].Route , 
               ville  :response.data[0].ville , 
               code_postal  :response.data[0].code_postal , 
               telephone  :response.data[0].telephone , 
               login  :response.data[0].login , 
               mail   :response.data[0].mail  , 
               motdepass    :response.data[0].motdepass   , 

               });
               })
               .catch(function (error) {
               console.log(error);
               })
               }
     
    




    render() {
    return(
     
      <div>
         <Nav/>
      
      <div>
      <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
      </div>
        <div className="newUser">
       
        <h1 className="newUserTitle">Formulaire utilisateur</h1>
        <form className="newUserForm">
           
      
          <div className="newUserItem">
            <label>Nom :</label>
            <input type="text" placeholder="Nom" 
            name="nom" value ={this.state.nom} required />
          </div>
          <div className="newUserItem">
            <label>Prenom :</label>
            <input type="text" placeholder="Prenom"
           name="prenom" value ={this.state.prenom} required />
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
            <input type="text"   name="Route" placeholder="Route" defaultValue ={this.state.Route} required />
          </div>
          <div className="newUserItem">
          <label>Ville :</label>
            <input type="text" name="ville" placeholder="ville" defaultValue ={this.state.ville} required />
          </div>
          <div className="newUserItem">
            <label>Code postal :</label>
            <input type="text"  name="code_postal" placeholder="code postal"value ={this.state.code_postal}  required/>
          </div>
          <div className="newUserItem">
            <label>Téléphone :</label>
            <input type="tel"   name="telephone" placeholder="+216 **"  defaultValue ={this.state.telephone} required/>
          </div>
          <div className="newUserItem">
          <label>Login :</label>
            <input type="text"    name="login" placeholder="login" value ={this.state.login} required />
          </div>
   
   
          <div className="newUserItem">
            <label>E-mail :</label>
            <input type="email"  name="mail" placeholder="___@.__"   value ={this.state.mail} required/>
          </div>
          <div className="newUserItem">
            <label>Mot de passe :</label>
            <input type="text"  name="motdepass" placeholder="mot de passe" value ={this.state.motdepass}  required/>
          </div>
       
         
        
        </form>
      </div>
      </div>
   
   
    );
    }
}
    
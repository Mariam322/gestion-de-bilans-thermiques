import React, { Component } from 'react';
import API from '../Api/Api';
import NavAdmin from '../Navbar/Navadmin'
import NavEmploye from '../Navbar/Nav'
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
        id:'',
   

        redirect: null,
        
        
        };
        
    }
    componentDidMount=() =>{
      const id = sessionStorage.getItem('userId');
      console.log('id', id)
      this.GetOne(id);
      
      
     
      }
      componentDidUpdate=()=>{
        const id = sessionStorage.getItem('userId');
        this.EditProfil(id);
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
         
                       handleChange_first =(e) =>
                       {let nam = e.target.name;
                        let val = e.target.value;
     
                          this.setState({[nam]: val}); 
                         
                          
                     }
           
               EditProfil=(id)=>{
                console.log('hello',id);
                let ProfilObject = {
          
                nom: this.state.nom,
               prenom : this.state.prenom,
               sexe : this.state.sexe,
               Route  : this.state.Route , 
               ville  :this.state.ville , 
               code_postal  :this.state.code_postal , 
               telephone  :this.state.telephone , 
               login  :this.state.login , 
               mail   :this.state.mail  , 
               motdepass    :this.state.motdepass   , 
                

                };
                console.log(id)
                API.put('/updateuser/'+ id, ProfilObject )
                .then(res => console.log(res.data));
                
               }
     
    




    render() {
    return(
     
      <div>
           {
            sessionStorage.getItem('isAdmin') === '1' ?  <NavAdmin/>: <NavEmploye/>
          }
      
      <div>
      <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
      </div>
        <div className="newUser">
       
        <h1 className="newUserTitle" style={{marginTop:'-70px'}}>Profil</h1>
       
        <form className="newUserForm"style={{marginTop:'0px'}}>
     
      
          <div className="newUserItem" >
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
   
        
          <div className="newUserItem" >
          <label>Route :</label>
            <input type="text"   name="Route" placeholder="Route" defaultValue ={this.state.Route} required />
          </div>
          <div className="newUserItem">
          <label>Ville :</label>
            <input type="text" name="ville" placeholder="ville" defaultValue ={this.state.ville} required />
          </div>
          <div className="newUserItem">
            <label>Code postal :</label>
            <input type="text"  name="code_postal" placeholder="code postal" value ={this.state.code_postal}  onChange={this.handleChange_first}  pattern="[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}"  required/>
          </div>
          <div className="newUserItem">
            <label>Téléphone :</label>
            <input type="text"   name="telephone" placeholder="+216 **" pattern="[0-9]{2}[0-9]{3}[0-9]{3}" onChange={this.handleChange_first} value ={this.state.telephone} required/>
          </div>
          <div className="newUserItem" >
          <label>Login :</label>
            <input type="text"    name="login" placeholder="login" value ={this.state.login} required />
          </div>
   
   
          <div className="newUserItem">
            <label>E-mail :</label>
            <input type="email"  name="mail" placeholder="___@.__"  onChange={this.handleChange_first}  value ={this.state.mail} required/>
          </div>
          <div className="newUserItem">
            <label>Mot de passe :</label>
            <input type="text"  name="motdepass" placeholder="mot de passe" value ={this.state.motdepass}  onChange={this.handleChange_first}  required/>
          </div>
       
         <br></br><br></br>
        <button type="submit" className="newUserButton" onClick={this.EditProfil} style={{ marginLeft:'5px'}}>Modifier</button>
        </form>
      </div>
      </div>
   
   
    );
    }
}
    
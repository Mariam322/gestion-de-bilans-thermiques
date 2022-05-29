import React from 'react'
import  { Component } from 'react';
import '../Devis/Devis.css';
import API from '../Api/Api';
import Select from 'react-select'
import Logo from "../assets/lOGO.JPG"
import AddDeleteTableRow from'./addDeleteTableRow'
import Popup from "reactjs-popup";
import argent from "../assets/argent.png"
import { Link } from 'react-router-dom';
import prix from "../assets/prix.PNG"


export default class Deviss extends Component {

    constructor(props) {
    super(props);
    this.state = {
        code_client:'',
        nom:'',
        prenom:'',
        code_postal:'',
        ville : '', 
        pays :'', 
        telephone :'', 
        fax :'', 
        mail :'', 
        TypeChambre:'',
      
    
    
    
        clientid: [],
    }
    var today = new Date(),
    date=today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
   

var today = new Date(),
dateV=today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate()+10);

this.state = {
dateV: dateV,
date:date
};
    
    }

    
  
    //componentDidMount() est appelée immédiatement après que le composant est monté (inséré dans l’arbre).
    componentDidMount=async() =>{
   
    this.getOptions();
    }
    async getOptions(){
        const res = await API.get('/getidclient')
        const data = res.data
        
    
        const options = data.map(d => ({
          "value" : d.id,
          "label": d.id
        }))
    
        this.setState({clientid: options})
    
      }
    async  handleChange_First (e) {       
        await API.get('/getclientD/'+e.value)
        .then(response => { 
          console.log(response)
           this.setState({
            
        
            nom: response.data[0].nom,
            prenom: response.data[0].prenom,
            mail: response.data[0].mail,
            code_postal: response.data[0].code_postal,
            ville: response.data[0].ville,
            pays: response.data[0].pays,
            telephone: response.data[0].telephone
            

        
               });
               
                
               })
               .catch(function (error) {
               console.log(error);
               
               })
          
               
               this.setState({id:e.value});
              
              }
              handleChange =(e) =>
              {let nam = e.target.name;
               let val = e.target.value;
         
                 this.setState({[nam]: val});
              }
              
            
    render(){

  
          
    return (
        
      <div>
        <div >
            <div >
            <h1 className='devis'>Facture</h1>
            
            <img src={Logo} alt="Logo" className='loo' />
            <div className='titre'>
            <h2>Froid Industriel</h2>
            Téléphone: 95061606/ 58776838 
            </div>
            </div>

<div className='DateCrea'>
            <div >
          <label> Date :</label>
          <input
            value={this.state.date}  
         
           disabled={true}
          
           name="date"
          />
        </div>
        <div>
          <label>Devis N° :</label>
          <input type="number" 
          name="Devis" required />
        </div>
        <div >
          <label>Code Client :</label>
          <Select  options={this.state.clientid} onChange={this.handleChange_First.bind(this)}/>
        </div>
    </div>
    <br></br>
    <fieldset className="devisss">


   <legend>Devis a l'attention de :</legend> 
   <div className="input">
        <div >
          <label>Nom Client :</label>
          <input type="text" placeholder="nom"  value={this.state.nom} onChange={this.handleChange_First} 
          name="nom" disabled={true}  required /> 
        </div>
    
        <div>      
               <label>Prenom Client:</label>
          <input type="text" placeholder="prenom"  value={this.state.prenom} onChange={this.handleChange_First} 
          name="prenom"    disabled={true}  required />
        </div>
        <div >
          <label>Mail Client:</label>
          <input type="text" placeholder="mail"  value={this.state.mail} onChange={this.handleChange_First} 
          name="mail" disabled={true} required />
        </div>
        
        <div >
          <label>Code postal :</label>
          <input type="text" placeholder="Code postal"  value={this.state.code_postal} onChange={this.handleChange_First} 
          name="code_postal" disabled={true}  required />
        </div>
       
        <div>      
               <label>Ville Client:</label>
          <input type="text" placeholder="ville"  value={this.state.ville} onChange={this.handleChange_First} 
          name="ville"    disabled={true}  required />
        </div>
        <div >
          <label>Pays Client:</label>
          <input type="text" placeholder="mail"  value={this.state.pays} onChange={this.handleChange_First} 
          name="mail" disabled={true} required />
        </div>
        <div >
          <label>Telephone Client:</label>
          <input type="tel" placeholder="Telephone"  value={this.state.telephone} onChange={this.handleChange_First} 
          name="tel" disabled={true} required />
        </div>
        </div>

        <div className='DevisValide'>
        <label> Devis valide jusqu'au :</label>
          <input style={{width:'200px'}}
           value={this.state.dateV}  
         
           disabled={true}
          
           name="date"
          />

                <div>      
               <label>Préparé par :</label>
          <input type="text" placeholder="nom&prenom"   required />
        </div>
        <div>      
               <label>Telephone :</label>
          <input type="tel" placeholder="Telephone"   required />
        </div>


        <div >
          <label>E-Mail :</label>
          <input type="email" placeholder="mail"  
          name="mail" required />
        </div>


        </div>
        </fieldset> <br></br>

        <div className='commentaire'>
          <label>Commentaires ou instructiond spéciales :</label><br></br>
         <textarea className='textarea' />
        </div><br></br>
        <br></br>
          <div>
          
          <div>
                     
                     <Popup trigger={<Link to ={'/Deviss'}><img src={argent} alt="argent" className="argent"/></Link>} position="top left">
      {close => (
        <div>
          <img src={prix} alt="prix" className="prix"/>
          Fermer ici
          <a className="close" onClick={close}>
            &times;
          </a>
        </div>
      )}
    </Popup>
                     </div>
       <AddDeleteTableRow/>
   </div> <br></br>
       
</div>
<div className="Total"> 
<div>
  <label>SOUS-TOTAL :</label>
  <input type="text"></input>
  </div><br></br>
  <div> 
  <label>T.V.A. :</label>
  <input type="text"></input>
  </div><br></br>
  <div> 
  <label>TAXE:</label>
  <input type="text"></input>
  </div><br></br>
  <div> 
  <label>AUTRE:</label>
  <input type="text"></input>
  </div><br></br>

  <div> 
  <label>TOTAL:</label>
  <input type="text"></input>
  </div><br></br>

  </div>
  

        <button  type="button"  className="newUserButton">Retour  </button>
            </div>
        
       
        );  
        
    }
    }
        
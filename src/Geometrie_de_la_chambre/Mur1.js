import React, { Component } from 'react';
import Select from 'react-select';
import '../Geometrie_de_la_chambre/Mur.css';
import API from '../Api/Api';
import { Options } from 'devextreme-react/tree-view';
import { Link } from 'react-router-dom';


export default class Mur1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            libelle:'',
            contact_externe :'',
            libelle_type:'',
            libelle_Materiaux:'',
            TEST: true,
            LISTE:'',
            Longueur:'',

            redirect: null,
            Orientation: [],
         
          
            Type:[],
            Materiaux:[],
            construction:[],
    };

  
  }

    async getOrientation(){
        const res = await API.get('/getorientation')
        const data = res.data
       
      
        const options = data.map(d => ({
          "value" : d.libelle,
          "label": d.libelle
        }))
   
        this.setState({Orientation: options})
        this.setState({contact_externe:'air extérieur'})
        this.setState({Longueur:''})
     
   
      }

     


      async getType(){
        const res = await API.get('/gettype')
        const data = res.data
       
   
        const options = data.map(d => ({
          "value" : d.libelle_type ,
          "label": d.libelle_type
        }))
   
        this.setState({Type: options})
      

   
      }

      async getMateriaux(){
        const res = await API.get('/getmetaux')
        const data = res.data
       
   
        const options = data.map(d => ({
          "value" : d.libelle_metaux,
          "label": d.libelle_metaux
        }))
   
       this.setState({Materiaux: options})
   
      }

      async getconstruction(){
        const res = await API.get('/getconstruction')
        const data = res.data
       
   
        const options = data.map(d => ({
          "value" : d.libelle_metaux,
          "label": d.libelle_metaux
        }))
   
        this.setState({construction: options})
   
      }
      componentDidMount=async() =>{
       
        this.getOrientation();
        
        this.getType();
        this.getMateriaux();
        this.getconstruction();
        }

        getMurInfo(parameter) {
          switch(parameter){
            case "Est":
              { 
                sessionStorage.setItem('directionMur1', 'Est');
                sessionStorage.setItem('directionMur2', 'Ouest');
                sessionStorage.setItem('directionMur3', 'Nord');
                sessionStorage.setItem('directionMur4', 'Sud');
              }
              break;
              case "Nord":
                { 
                  sessionStorage.setItem('directionMur1', 'Nord');
                  sessionStorage.setItem('directionMur2', 'Sud');
                  sessionStorage.setItem('directionMur3', 'Est');
                  sessionStorage.setItem('directionMur4', 'Ouest');
                } 
                break;
                case "Nord-Est":
                { 
                  sessionStorage.setItem('directionMur1', 'Nord-Est');
                  sessionStorage.setItem('directionMur2', 'Sud-Ouest');
                  sessionStorage.setItem('directionMur3', 'Nord-Ouest');
                  sessionStorage.setItem('directionMur4', 'Sud-Est');
                } 
                break;
                case "Nord-Ouest":
                  { 
                    sessionStorage.setItem('directionMur1', 'Nord-Ouest');
                    sessionStorage.setItem('directionMur2', 'Sud-Est');
                    sessionStorage.setItem('directionMur3', 'Nord-Est');
                    sessionStorage.setItem('directionMur4', 'Sud-Ouest');
                  } 
                  break;
                  case "Ouest":
                    { 
                      sessionStorage.setItem('directionMur1', 'Ouest');
                      sessionStorage.setItem('directionMur2', 'Est');
                      sessionStorage.setItem('directionMur3', 'Nord');
                      sessionStorage.setItem('directionMur4', 'Sud');
                    } 
                    break;
                    case "Sud":
                      { 
                        sessionStorage.setItem('directionMur1', 'Sud');
                        sessionStorage.setItem('directionMur2', 'Nord');
                        sessionStorage.setItem('directionMur3', 'Est');
                        sessionStorage.setItem('directionMur4', 'Ouest');
                      } 
                      break;
                      case "Sud-Est":
                        { 
                          sessionStorage.setItem('directionMur1', 'Sud-Est');
                          sessionStorage.setItem('directionMur2', 'Nord-Ouest');
                          sessionStorage.setItem('directionMur3', 'Sud-Ouest');
                          sessionStorage.setItem('directionMur4', 'Nord-Est');
                        } 
                        break;
                        case "Sud-Ouest":
                          { 
                            sessionStorage.setItem('directionMur1', 'Sud-Ouest');
                            sessionStorage.setItem('directionMur2', 'Nord-Est');
                            sessionStorage.setItem('directionMur3', 'Sud-Est');
                            sessionStorage.setItem('directionMur4', 'Nord-Ouest');
                          } 
                          break;
            default:
              sessionStorage.setItem('directionMur1', 'Nord');
              sessionStorage.setItem('directionMur2', 'Sud');
              sessionStorage.setItem('directionMur3', 'Est');
              sessionStorage.setItem('directionMur4', 'Ouest');
          }
        }
        getMurDirection() {
          return sessionStorage.getItem('directionMur1');
        }
        handleChange=(e)=>{
     
            this.setState({libelle:e.value});
           
            this.setState({libelle_type:e.value})

        
            let nam = e.target.name;
             let val = e.target.value;

               this.setState({[nam]: val}); 
               sessionStorage.setItem('Longueur',this.state.Longueur);
          
           }
          
           handleChange_first = (e) => {
            this.getMurInfo(e.value);
           
            
            
                     
          }
         
          handleChange_Second = (e) => {
                     
         
            if (e.value=="mixte") {
              sessionStorage.setItem('disbaleContact', 'mixte');
              this.setState({
                TEST: false
            });
            }else if (e.value=="air extérieur"){
              sessionStorage.setItem('disbaleContact', 'air extérieur');
              this.setState({
                TEST: true
              })
            }else{
              sessionStorage.setItem('disbaleContact', 'un autre local');
              this.setState({
                TEST: true
              })
            }
             console.log('contact_externe',e.value);
            this.setState({contact_externe:e.value})
          }
           
          handleChange_third = (e) => {
            let nam = e.target.name;
            let val = e.target.value;

              this.setState({[nam]: val}); 
            if (e.value=='Beton') {
              sessionStorage.setItem('liste','Beton');
              this.setState({
                LISTE: this.getconstruction()
            });
          }else{
              sessionStorage.setItem('liste', 'Metal');
              this.setState({
                LISTE:  this.getMateriaux()
              })
            }
             console.log('Type',e.value);
            this.setState({Type:e.value})
          }
   
    render(){
      
          const contact_externe = [
            { value: 'mixte', label: 'mixte' },
            { value: 'air extérieur', label: 'air extérieur' },
            { value: 'un autre local', label: 'un autre local'}
          ]

         

   

   

         



    return(
      
        <div>
     
            <h1>Géométrie de la Chambre froide</h1>
           
            <div className="nature">
        
         <input type="text" placeholder="Latitude" value={sessionStorage.getItem('Latitude')} onChange={this.handleChange_second}
        name="Latitude" required />
       </div><br/>

           <fieldset className='Mur1'>
                <legend>Mur N° 1 : </legend>

                <div className="newUserItem">
                    <label>Orientation :</label>
                    <Select className="select"  defaultValue={{ label: this.getMurDirection(), value: this.getMurDirection() }} options={this.state.Orientation}   onChange={this.handleChange_first.bind(this)}/>
                </div>
                <div className="newUserItemE">
                     <label>Longueur (m) :</label>
                     <input  className="select" type="Number"  min="1" placeholder="Longueur"  
                     name="Longueur" value={sessionStorage.getItem('Longueur')} onChange={this.handleChange} />
                </div>
                <h2>Température du local en contact :</h2>
                <div className="newUserItem">
                    <label>Contact externe :</label>
                    <Select  className="select" defaultValue={sessionStorage.getItem('disbaleContact')==='mixte'? contact_externe[1]:contact_externe[0]}  options={contact_externe}  onChange={this.handleChange_Second.bind(this)} />
                </div>
                <div className="newUserItemE">
                     <label>Si "un autre local"/"mixte"  :</label>
                     <input  className="select" type="text" placeholder="Si un autre local/mixte" disabled={sessionStorage.getItem('disbaleContact')!=='mixte'} onChange={this.handleChange}/>
                </div>
                <div className="newUserItem">
                     <label>Si "mixte" longueur en contact avec un autre local (m)  :</label>
                     <input type="Number" min="1" placeholder="Si mixte longueur en contact avec un autre local (m)"   disabled={sessionStorage.getItem('disbaleContact')!=='mixte'} onChange={this.handleChange}
                     name="LongueurM"  />
                </div> <br/>
                <fieldset className="compo">
                    <legend>Composition  </legend>
                <h3 className="select">Surface externe :</h3>
                <div className="newUserItem">
                    <label>Type :</label>
                    <Select  className="select" options={this.state.Type} isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'}  onChange={this.handleChange_third.bind(this)} DefaultValue={sessionStorage.getItem('liste')==='Beton'? this.state.Type[1]:this.state.Type[0]}/>
                </div>
                <div className="newUserItemE">
                    <label >Matériaux :</label>
                    <Select   options={this.state.Materiaux} isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} />
               
                </div>
                <div className="newUserItem">
                     <label className="select" >Epaisseur (mm)  :</label>
                     <input  className="select" type="Number"min="1" placeholder="Epaisseur (mm)" disabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} 
                     name="Ep" />
                </div>

                <h3 className="select" >Surface Interne :</h3>
                <div className="newUserItem">
                    <label>Type :</label>
                    <Select className="select"   options={this.state.Type}   isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} />
                </div>
                <div className="newUserItemE">
                    <label>Matériaux :</label>
                    <Select   options={this.state.Materiaux} isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} />
                </div>
                <div className="newUserItem">
                     <label>Epaisseur (mm)  :</label>
                     <input type="Number" min="1" placeholder="Epaisseur (mm)"  
                     name="Ep" disabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} />
                </div>

                <h3 className="select" >Isolant :</h3>
               
                <div className="newUserItem">
                    <label>Matériaux :</label>
                    <Select className="select"   options={this.state.Materiaux} isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} />
                </div>
                <div className="newUserItemE ">
                     <label>Epaisseur (mm)  :</label>
                     
                     <input type="Number" min="1" placeholder="Epaisseur (mm)"  disabled={sessionStorage.getItem('disbaleMur1') === 'OUI'}
                     name="Ep"  />
                </div>
                </fieldset>

             

           </fieldset>
           <a href="/ville"><button   className="newUserButton">Retour  </button></a>
           <Link to={"/Mur_2/"}><button  type="submit"  className="newUserButton">Suivant  </button></Link>
           


       
        </div>
    )
}
     }

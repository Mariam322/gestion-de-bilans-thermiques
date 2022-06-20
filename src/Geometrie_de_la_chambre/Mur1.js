import React, { Component } from 'react';
import Select from 'react-select';
import '../Geometrie_de_la_chambre/Mur.css';
import API from '../Api/Api';
import { Options } from 'devextreme-react/tree-view';
import { Link } from 'react-router-dom';
import NavAdmin from '../Navbar/Navadmin'
import NavEmploye from '../Navbar/Nav'
export default class Mur1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            libelle:'',
            contact_externe :'',
            
         
            TEST: true,
            LISTE:'',
            Longueur:'',
            AutreLocal_Mixte:'',
            longueur_mixte:'',

            Type_SurfaceInterne:'',
            Epaisseur_SurfaceInterne:'',
            Materiaux_SurfaceInterne:'',

            Epaisseur_SurfaceExterne:'',
            Type_SurfaceExterne:'',
            Materiaux_SurfaceExterne:'',
            Isolant_Materiaux:'',
            Isolant_Epaisseur:'',
            redirect: null,
            Orientation: [],
         
          
            Type:[],
            Materiaux:[],
            MateriauxIsolant:[],
            
            
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
      AddMur=()=>{ 
        const MurObject = {
          num_mur : 1,
          id_project : sessionStorage.getItem('id_project'),
           Longueur :this.state.Longueur,
           contact_externe : this.state.contact_externe,
           AutreLocal_Mixte:this.state.AutreLocal_Mixte,
           longueur_mixte:this.state.longueur_mixte,
         id_orientation : this.state.id_orientation,
         
         Type_SurfaceInterne : this.state.Type_SurfaceInterne,
         Materiaux_SurfaceInterne : this.state.Materiaux_SurfaceInterne,
         Epaisseur_SurfaceInterne : this.state.Epaisseur_SurfaceInterne,
       
         Type_SurfaceExterne:this.state.Type_SurfaceExterne,
         Materiaux_SurfaceExterne:this.state.Materiaux_SurfaceExterne,  
         Epaisseur_SurfaceExterne : this.state.Epaisseur_SurfaceExterne, 
          //Epaisseur_SurfaceInterne : this.state.Epaisseur_SurfaceInterne,
         Isolant_Materiaux:this.state.Isolant_Materiaux,
         Isolant_Epaisseur:this.state.Isolant_Epaisseur,   
         

    }; 
  
        API.post('/InsertMur',MurObject )
        .then(res => console.log(res.data));
       
       }
     
     
      async getMatIsolant(){
        const res = await API.get('/materiau_isolant')
        const data = res.data
        console.log(data)
        console.log('########################')
        
   
        const options = data.map(d => ({
          "value" : d.nomisolant ,
          "label": d.nomisolant
        }))
   
        this.setState({MateriauxIsolant: options})
  
        
  
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
     
      async getMateriaux(typeSur){
        var result
        if (typeSur == 'Beton'){
          result = await API.get('/getconstruction')
       
          
        }else{
          // TODO , route / get.... 
          result = await API.get('/getmetaux')
         // result.data.push({libelle_metaux: 'test'})
        }
          const data = result.data
          const options = data.map(d => ({
            "value" :  d.libelle,
            "label": d.libelle
          }))
          this.setState({Materiaux: options})
          console.log('Ma',this.state.Materiaux)
       
   
      }

      componentDidMount=async() =>{
       
         this.getOrientation();
        
        this.getType();
        this.getMateriaux();
        //this.getconstruction();
        this.getMatIsolant();
        
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
            this.setState({Materiaux_SurfaceExterne:e.value})
     
          }
           
          handleChange_third = (e) => {
            
            this.setState({Type_SurfaceExterne:e.value})
             console.log('Type_SurfaceExterne',e.value);
             this.getMateriaux(e.value)
            //this.setState({Type_SurfaceExterne:this.state.Type_SurfaceExterne})
       
          }
          handelChange_fourth = (e) => {
            this.getMateriaux(e.value)
            this.setState({Type_SurfaceInterne:e.value})
          }
          
          handelChange_fifth= (e) => {
            this.setState({Materiaux_SurfaceInterne:e.value})
            this.getMateriaux(e.value)
            this.setState({Materiaux:['rrrrrr','rrrrrr','rrrrrr']})
          }
         
          handleChange_Isolant = (e) => {
            this.setState({Isolant_Materiaux:e.value})
      
         
          
          
          }
    render(){
      
          const contact_externe = [
            { value: 'mixte', label: 'mixte' },
            { value: 'air extérieur', label: 'air extérieur' },
            { value: 'un autre local', label: 'un autre local'}
          ]

         

   

   

         



    return(
      
        <div>
       {
            sessionStorage.getItem('isAdmin') === '1' ?  <NavAdmin/>: <NavEmploye/>
          }
      
     <div style={{marginTop: '120px'}}>
            <h1>Géométrie de la Chambre froide</h1>
           
            <div className="nature">
        
         <input type="text" placeholder="Type de chambre" value={sessionStorage.getItem('type_chambre')} onChange={this.handleChange_second}
        name="Latitude"  required />
       </div><br/>

           <fieldset className='Mur1'>
                <legend>Mur N° 1 : </legend>

                <div className="newUserItem">
                    <label>Orientation :</label>
                    <Select className="select"  defaultValue={{ label: this.getMurDirection(), value: this.getMurDirection() }} options={this.state.Orientation}   onChange={this.handleChange_first.bind(this)}/>
                </div>
                <div className="newUserItemE">
                     <label>Longueur (m) :</label>
                     <input  className="select" value={sessionStorage.setItem('Longueur',this.state.Longueur)}  type="Number"  step="1" min="1" placeholder="Longueur"  
                     name="Longueur" onChange={this.handleChange} />
                   
                </div>
                <h2>Température du local en contact :</h2>
                <div className="newUserItem">
                    <label>Contact externe :</label>

                    
                    <Select  className="select" defaultValue={sessionStorage.getItem('disbaleContact')==='mixte'? contact_externe[1]:contact_externe[0]}  options={contact_externe}  onChange={this.handleChange_Second.bind(this)} />
                </div>
                <div className="newUserItemE">
                     <label>Si "un autre local"/"mixte"  :</label>
                     <input  className="select" type="text" placeholder="Si un autre local/mixte" name="AutreLocal_Mixte" value={this.state.AutreLocal_Mixte} disabled={(sessionStorage.getItem('disbaleContact')==='air extérieur')} onChange={this.handleChange} />
                </div>
                <div className="newUserItem">
                     <label>Si "mixte" longueur en contact avec un autre local (m)  :</label>
                     <input type="Number" min="1" placeholder="Si mixte longueur en contact avec un autre local (m)"  value={this.state.longueur_mixte}  disabled={(sessionStorage.getItem('disbaleContact')==='un autre local') || (sessionStorage.getItem('disbaleContact')==='air extérieur')} onChange={this.handleChange}
                     name="longueur_mixte"  />
                </div> <br/>
                <fieldset className="compo">
                    <legend>Composition  </legend>
                <h3 className="select">Surface externe :</h3>
                <div className="newUserItem">
                    <label>Type :</label>
                    <Select  className="select"   options={this.state.Type} isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'}  onChange={this.handleChange_third.bind(this)} DefaultValue={sessionStorage.getItem('liste')==='Beton'? this.state.Type[1]:this.state.Type[0]}/>

                </div>
                <div className="newUserItemE">
                    <label >Matériaux :</label>
                    <Select   options={this.state.Materiaux} isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} onChange={this.handleChange_Second.bind(this)} />
               
                </div>
                <div className="newUserItem">
                     <label className="select" >Epaisseur (mm)  :</label>
                     <input  className="select" value={this.state.Epaisseur_SurfaceExterne} type="Number"min="1" placeholder="Epaisseur (mm)" disabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} 
                     name="Epaisseur_SurfaceExterne" onChange={this.handleChange} />
                </div>

                <h3 className="select" >Surface Interne :</h3>
                <div className="newUserItem">
                    <label>Type :</label>
                    <Select  className="select"   options={this.state.Type} isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'}  onChange={this.handelChange_fourth.bind(this)} DefaultValue={sessionStorage.getItem('liste')==='Beton'? this.state.Type[1]:this.state.Type[0]}/>

                </div>
                <div className="newUserItemE">
                    <label >Matériaux :</label>
                    <Select   options={this.state.Materiaux} isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} onChange={this.handelChange_fifth.bind(this)} />
               
                </div>
                <div className="newUserItem">
                     <label>Epaisseur (mm)  :</label>
                     <input type="Number" min="1" placeholder="Epaisseur (mm)"  
                     name="Epaisseur_SurfaceInterne" value={this.state.Epaisseur_SurfaceInterne} disabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} onChange={this.handleChange} />
                </div>



                <h3 className="select" >Isolant :</h3>
               
                <div className="newUserItem">
                    <label>Matériaux :</label>
                    <Select className="select"   options={this.state.MateriauxIsolant} isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} onChange={this.handleChange_Isolant.bind(this)}    />
                </div>
                <div className="newUserItemE ">
                     <label>Epaisseur (mm)  :</label>
                     
                     <input type="Number" min="1" placeholder="Epaisseur (mm)" onChange={this.handleChange} value={this.state.Isolant_Epaisseur} disabled={sessionStorage.getItem('disbaleMur1') === 'OUI'}
                     name="Isolant_Epaisseur"  />
                </div>
                </fieldset>

             

           </fieldset>
           <div   >
           <a href="/ville"><button   className="newUserButton">Retour  </button></a>
           <a href="/Mur_2"><button onClick={this.AddMur}  type="submit"  className="newUserButton">Suivant  </button></a>
           </div>


       
        </div>
        </div>
    )
}
     }

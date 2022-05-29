import React, { Component } from 'react';
import Select from 'react-select';
import '../Geometrie_de_la_chambre/Mur.css';
import API from '../Api/Api';
import { Options } from 'devextreme-react/tree-view';
import { Link } from 'react-router-dom';


export default class Mur2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            libelle:'',
            libelle_contact :'',
            libelle_type:'',
            libelle_Materiaux:'',
            TEST: true,

            redirect: null,
            Orientation: [],
         
          
            Type:[],
            Materiaux:[]
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
        const res = await API.get('/getmateriaux')
        const data = res.data
       
   
        const options = data.map(d => ({
          "value" : d.libelle_metaux,
          "label": d.libelle_metaux
        }))
   
        this.setState({Materiaux: options})
   
      }
      componentDidMount=async() =>{
       
        this.getOrientation();
        
        this.getType();
        this.getMateriaux();
        }

        
        getMurDirection() {
          return sessionStorage.getItem('directionMur2');
        }
        handleChange=(e)=>{
     
            this.setState({libelle:e.value});
           
            this.setState({libelle_type:e.value})
           }
          
           handleChange_first = (e) => {
            this.getMurInfo(e.value);
           
          }
         
    
        
   
    render(){
      
          const contact_externe = [
            { value: 'mixte', label: 'mixte' },
            { value: 'air extérieur', label: 'air extérieur' },
            { value: 'un autre local', label: 'un autre local' }
          ]

         

   

   

         



    return(
      
        <div>
      
            <h1>Géométrie de la Chambre froide</h1>
           
            <div className="nature">
        
        <input type="text" placeholder="Latitude" value={sessionStorage.getItem('Latitude')} onChange={this.handleChange_second}
       name="Latitude" required />
      </div><br/>

           <fieldset className='Mur2'>
                <legend>Mur N° 2 : </legend>

                <div className="newUserItem">
                    <label>Orientation :</label>
                    <Select className="select"  defaultValue={{ label: this.getMurDirection(), value: this.getMurDirection() }} options={this.state.Orientation}   onChange={this.handleChange_first.bind(this)}/>
                </div>
                <div className="newUserItemE">
                     <label>Longueur (m) :</label>
                     <input type="Number"  min="1" placeholder="Longueur"  
                     name="Longueur" value={sessionStorage.getItem('Longueur')}  />
                </div>
                <h2 className="select" >Température du local en contact :</h2>
                <div className="newUserItem">
                    <label>Contact externe :</label>
                    <Select  className="select" options={contact_externe}   />
                </div>
                <div className="newUserItemE">
                     <label>Si "un autre local"/"mixte"  :</label>
                     <input type="text" placeholder="Si un autre local/mixte"  
                     name="local"  />
                </div>
                <div className="newUserItem">
                     <label>Si "mixte" longueur en contact avec un autre local (m)  :</label>
                     <input type="Number" min="1" placeholder="Si mixte longueur en contact avec un autre local (m)"  
                     name="LongueurM"  />
                </div> <br/>
                <fieldset className="compo">
                    <legend>Composition  </legend>
                <h3 className="select" >Surface externe :</h3>
                <div className="newUserItem">
                    <label>Type :</label>
                    <Select  className="select"  options={this.state.Type} isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} />
                </div>
                <div className="newUserItemE">
                    <label>Matériaux :</label>
                    <Select  className="select"  options={this.state.Materiaux} isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} />
               
                </div>
                <div className="newUserItem">
                     <label className="select">Epaisseur (mm)  :</label>
                     <input  className="select" type="Number"min="1" placeholder="Epaisseur (mm)" disabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} 
                     name="Ep" />
                </div>

                <h3 className="select">Surface Interne :</h3>
                <div className="newUserItem">
                    <label>Type :</label>
                    <Select  className="select" options={this.state.Type}   isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} />
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

                <h3 className="select">Isolant :</h3>
               
                <div className="newUserItem">
                    <label>Matériaux :</label>
                    <Select   className="select" options={this.state.Materiaux} isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} />
                </div>
                <div className="newUserItemE ">
                     <label>Epaisseur (mm)  :</label>
                     
                     <input type="Number" min="1" placeholder="Epaisseur (mm)"  disabled={sessionStorage.getItem('disbaleMur1') === 'OUI'}
                     name="Ep"  />
                </div>
                </fieldset>

             

           </fieldset>
           <a href="/Mur_1"><button   className="newUserButton">Retour  </button></a>
           <Link to={"/Mur_3/"}><button  type="submit"  className="newUserButton">Suivant  </button></Link>
           


       
        </div>
    )
}
     }

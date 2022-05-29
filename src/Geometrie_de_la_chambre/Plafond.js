import React, { Component } from 'react';
import Select from 'react-select';
import '../Geometrie_de_la_chambre/Mur.css';
import API from '../Api/Api';



export default class Plafond extends Component {
    constructor(props) {
        super(props);
        this.state = {
            libelle:'',
            libelle_contact :'',
            libelle_type:'',
            libelle_Materiaux:'',

            redirect: null,
            Orientation: [],
            Contact:[],
            Type:[],
            Materiaux:[]
    };

  /* state ={
        disabled: true
    }
    handleChange = (e) => {
        if(e.target.option[0]){
            this.setState({
                disabled: false
            });
        }
    }*/
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

      async getContact(){
        const res = await API.get('/getcontact')
        const data = res.data
       
   
        const options = data.map(d => ({
          "value" : d.libelle_contact ,
          "label": d.libelle_contact
        }))
   
        this.setState({Contact: options})
   
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
        this.getContact();
        this.getType();
        this.getMateriaux();
        }

        handleChange=(e)=>{
     
            this.setState({libelle:e.value});
            this.setState({libelle_contact:e.value});
            this.setState({libelle_type:e.value})
           }
   
    render(){
      const standard = [
            { value: 'Oui', label: 'Oui' },
            { value: 'Non', label: 'Non' },
           
          ]

         

   

   

         



    return(
        <div>
             <h1>Géométrie de la Chambre froide</h1>
       <div className="nature">
        
        <input type="text" placeholder="Latitude" value={sessionStorage.getItem('Latitude')} onChange={this.handleChange_second}
       name="Latitude" required />
      </div><br/>
           

           <fieldset className='Mur1'>
                <legend>Plafond : </legend>

                <div className="newUserItem">
                    <label  className="select" >Orientation :</label>
                    <Select   className="select"  options={this.state.Orientation} onChange={this.handleChange.bind(this)}  />
                </div>
                <div className="newUserItemE">
                     <label>Longueur (m) :</label>
                     <input type="Number" placeholder="Longueur"  
                     name="Longueur"  />
                </div>
                <h2  className="select" >Température du local en contact :</h2>
                <div className="newUserItem">
                    <label  className="select" >Contact externe :</label>
                    <Select  className="select"   options={this.state.Contact} onChange={this.handleChange.bind(this)}  />
                </div>
                <div className="newUserItemE">
                     <label>Si "un autre local"/"mixte"  :</label>
                     <input type="text" placeholder="Si un autre local/mixte"  
                     name="local"  />
                </div>
                <div className="newUserItem">
                     <label>Si "mixte" longueur en contact avec un autre local (m)  :</label>
                     <input type="Number" placeholder="Si mixte longueur en contact avec un autre local (m)"  
                     name="LongueurM"  />
                </div> <br/>
                <fieldset className="compo">
                    <legend>Composition  </legend>
                <h3  className="select" >Surface externe :</h3>
                <div className="newUserItem">
                    <label>Type :</label>
                    <Select   className="select"  options={this.state.Type} onChange={this.handleChange.bind(this)}   isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'}/>
                </div>
                <div className="newUserItemE">
                    <label>Matériaux :</label>
                    <Select   options={this.state.Materiaux} onChange={this.handleChange.bind(this)} isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'}  />
               
                </div>
                <div className="newUserItem">
                     <label>Epaisseur (mm)  :</label>
                     <input type="Number" placeholder="Epaisseur (mm)"  
                     name="Ep" disabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} />
                </div>

                <h3  className="select" > Surface Interne :</h3>
                <div className="newUserItem">
                    <label>Type :</label>
                    <Select  className="select"   options={this.state.Type} onChange={this.handleChange.bind(this)}  isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'}  />
                </div>
                <div className="newUserItemE">
                    <label>Matériaux :</label>
                    <Select  className="select"   options={this.state.Materiaux} onChange={this.handleChange.bind(this)}  isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'}/>
                </div>
                <div className="newUserItem">
                     <label>Epaisseur (mm)  :</label>
                     <input type="Number" placeholder="Epaisseur (mm)"  
                     name="Ep" disabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} />
                </div>

                <h3  className="select" >Isolant :</h3>
               
                <div className="newUserItem">
                    <label>Matériaux :</label>
                    <Select   className="select"  options={this.state.Materiaux} onChange={this.handleChange.bind(this)}  isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} />
                </div>
                <div className="newUserItemE ">
                     <label>Epaisseur (mm)  :</label>
                     <input type="Number" placeholder="Epaisseur (mm)"  
                     name="Ep"  disabled={sessionStorage.getItem('disbaleMur1') === 'OUI'}/>
                </div>
                </fieldset>

             

           </fieldset>
           <a href="/Mur_4"><button   className="newUserButton">Retour  </button></a>
           <a href="/Plancher"><button  type="submit"  className="newUserButton">Suivant  </button></a>
           


       
        </div>
    )
}
     }

   
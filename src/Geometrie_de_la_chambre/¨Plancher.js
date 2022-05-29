import React, { Component } from 'react';
import Select from 'react-select';
import '../Geometrie_de_la_chambre/Mur.css';
import API from '../Api/Api';



export default class Plancher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            libelle:'',
            contact :'',
            Vide:'',
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
        this.setState({Contact:'Terre'})
        this.setState({Vide:'Non'})
   
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
           handleChange_first = (e) => {
                     
         
            if (e.value=="un autre local") {
              sessionStorage.setItem('disbaleContact', 'un autre local');
             
              this.setState({
                TEST: false
            });
            }else{
              sessionStorage.setItem('disbaleContact', 'Terre');
              this.setState({
                TEST: true
              })
            }
            
             console.log('Contact',e.value);
            this.setState({Contact:e.value});
            
          }

          handleChange_Second = (e) => {
                     
         
            if (e.value=="Oui") {
              sessionStorage.setItem('disbaleVide', 'OUI');
             
              this.setState({
                TEST: false
            });
            }else{
              sessionStorage.setItem('disbaleVide', 'NON');
              this.setState({
                TEST: true
              })
            }
            
             console.log('Vide',e.value);
            this.setState({Vide:e.value});
            
          }
           

   
    render(){
      const Vide = [
            { value: 'Oui', label: 'Oui' },
            { value: 'Non', label: 'Non' },
           
          ]
          const Contact = [
            { value: 'Terre', label: 'Terre' },
            { value: 'un autre local', label: 'un autre local' },
           
          ]

         

   

   

         



    return(
        <div>
          <h1>Géométrie de la Chambre froide</h1>
       <div className="nature">
        
        <input type="text" placeholder="Latitude" value={sessionStorage.getItem('Latitude')} onChange={this.handleChange_second}
       name="Latitude" required />
      </div><br/>

           <fieldset className='plancher'>
                <legend>Plancher : </legend>

               
                <h2 className="select">Température du local en contact :</h2>
                <div className="newUserItem">
                    <label>Contact externe :</label>
                    <Select className="select"  options={Contact}  defaultValue={sessionStorage.getItem('disbaleContact')==='un autre local'? Contact[1]:Contact[0]} onChange={this.handleChange_first.bind(this)}  />
                </div>
                <div className="newUserItemE">
                     <label>Si "un autre local"  :</label>
                     <input type="text" placeholder="Si un autre local"  disabled={sessionStorage.getItem('disbaleContact')!=='un autre local'}  onChange={this.handleChange}
                     name="local"  />
                </div>
                <div className="newUserItem">
                    <label>Vide sanitaire :</label>
                    <Select className="select" defaultValue={sessionStorage.getItem('disbaleVide')==='OUI'? Vide[1]:Vide[0]}   onChange={this.handleChange_Second.bind(this)} options={Vide}   />
                </div>
                <div className="newUserItemE">
                     <label>Epaisseur (mm)  :</label>
                     <input className="select" type="Number" placeholder="Epaisseur (mm)" disabled={sessionStorage.getItem('disbaleVide')!=='OUI'}  
                     name="Epaisseur"   onChange={this.handleChange}/>
                </div>  <br/>
                <fieldset className="compo">
                    <legend>Composition  </legend>
                <h3 className="select">Surface externe :</h3>
                <div className="newUserItem">
                    <label>Type :</label>
                    <Select  className="select" options={this.state.Type} onChange={this.handleChange.bind(this)}  />
                </div>
                <div className="newUserItemE">
                    <label>Matériaux :</label>
                    <Select   options={this.state.Materiaux} onChange={this.handleChange.bind(this)}  />
               
                </div>
                <div className="newUserItem">
                     <label>Epaisseur (mm)  :</label>
                     <input type="Number" placeholder="Epaisseur (mm)"  
                     name="Ep"  />
                </div>

                <h3 className="select">Surface Interne :</h3>
                <div className="newUserItem">
                    <label>Type :</label>
                    <Select  className="select" options={this.state.Type} onChange={this.handleChange.bind(this)}  />
                </div>
                <div className="newUserItemE">
                    <label>Matériaux :</label>
                    <Select   options={this.state.Materiaux} onChange={this.handleChange.bind(this)}  />
                </div>
                <div className="newUserItem">
                     <label>Epaisseur (mm)  :</label>
                     <input type="Number" placeholder="Epaisseur (mm)"  
                     name="Ep"  />
                </div>

                <h3 className="select">Isolant :</h3>
               
                <div className="newUserItem">
                    <label>Matériaux :</label>
                    <Select className="select"  options={this.state.Materiaux} onChange={this.handleChange.bind(this)}  />
                </div>
                <div className="newUserItemE ">
                     <label>Epaisseur (mm)  :</label>
                     <input type="Number" placeholder="Epaisseur (mm)"  
                     name="Ep"  />
                </div>
                </fieldset>

             

           </fieldset>
           <a href="/plafond"><button   className="newUserButton">Retour  </button></a>
           <a href="/porte"><button  type="submit"  className="newUserButton">Suivant  </button></a>
           


       
        </div>
    )
}
     }

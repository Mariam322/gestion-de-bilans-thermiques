import React, { Component } from 'react';
import Select from 'react-select';
import '../Geometrie_de_la_chambre/Mur.css';
import API from '../Api/Api';
import NavAdmin from '../Navbar/Navadmin'
import NavEmploye from '../Navbar/Nav'

export default class Plafond extends Component {
    constructor(props) {
        super(props);
        this.state = {
            libelle:'',
            libelle_contact :'',
            libelle_type:'',
            libelle_metaux:'',

            Largeur_Mixte:'',

            longueur:'',
            contact_externe:'',
            AutreLocal_Mixte:'',
            Longueur_Mixte:'',

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
        this.setState({contact_externe:'air extérieur'})

   
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
      AddPlafond=()=>{ 
        const PlafondObject = {
          id_mur :this.state.id_mur,
           longueur :this.state.longueur,
           contact_externe : this.state.contact_externe,
           AutreLocal_Mixte:this.state.AutreLocal_Mixte,
           Longueur_Mixte:this.state.Longueur_Mixte,
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
  
        API.post('/InsertPlafond',PlafondObject )
        .then(res => console.log(res.data));
       
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
        this.getContact();
        this.getType();
        this.getMateriaux();
        }

        handleChange=(e)=>{
     
            this.setState({libelle:e.value});
            this.setState({libelle_contact:e.value});
            this.setState({libelle_type:e.value})
            this.setState({libelle_metaux:e.value})
           }
           handleChange_First=(e)=>{
            let nam = e.target.name;
            let val = e.target.value;
  
              this.setState({[nam]: val}); 
      
            
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
   
    render(){
      const standard = [
            { value: 'Oui', label: 'Oui' },
            { value: 'Non', label: 'Non' },
           
          ]
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
       name="Latitude" required />
      </div><br/>
           

           <fieldset >
                <legend>Plafond : </legend>

                <div className="newUserItem">
                     <label>Longueur (m) :</label>
                     <input type="Number" placeholder="Longueur"  value={this.state.longueur} onChange={this.handleChange_First}
                     name="longueur"  />
                </div>
                <h2  className="select" >Température du local en contact :</h2>
                <div className="newUserItem">
                    <label  className="select" >Contact externe :</label>
                    <Select  className="select" defaultValue={sessionStorage.getItem('disbaleContact')==='mixte'? contact_externe[1]:contact_externe[0]}  options={contact_externe}  onChange={this.handleChange_Second.bind(this)} />
                </div>
                <div className="newUserItemE">
                     <label>Si "un autre local"/"mixte"  :</label>
                     <input type="text" placeholder="Si un autre local/mixte"  name="AutreLocal_Mixte" value={this.state.AutreLocal_Mixte} disabled={sessionStorage.getItem('disbaleContact')!=='mixte'} onChange={this.handleChange_First} />
                </div>
                <div className="newUserItem">
                     <label>Si "mixte" longueur en contact avec un autre local (m)  :</label>
                     <input type="Number" value={this.state.Longueur_Mixte}  min="1" placeholder="Si mixte longueur en contact avec un autre local (m)"   disabled={(sessionStorage.getItem('disbaleContact')==='un autre local')} onChange={this.handleChange_First}
                     name="Longueur_Mixte"  />
                </div> <br/>
                <div className="newUserItem">
                     <label>Si "mixte" largeur en contact avec un autre local (m)  :</label>
                     <input type="Number" value={this.state.Largeur_Mixte}  min="1" placeholder="Si mixte largeur en contact avec un autre local (m)"   disabled={(sessionStorage.getItem('disbaleContact')==='un autre local')} onChange={this.handleChange_First}
                     name="Largeur_Mixte"  />
                </div>
                <fieldset className="compo">
                    <legend>Composition  </legend>
                <h3  className="select" >Surface externe :</h3>
                <div className="newUserItem">
                    <label>Type :</label>
                    <Select   className="select"  options={this.state.Type} onChange={this.handleChange_third.bind(this)}   isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} DefaultValue={sessionStorage.getItem('liste')==='Beton'? this.state.Type[1]:this.state.Type[0]}/>
                </div>
                <div className="newUserItemE">
                    <label>Matériaux :</label>
                    <Select   options={this.state.Materiaux} onChange={this.handleChange.bind(this)} isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'}  />
               
                </div>
                <div className="newUserItem">
                     <label>Epaisseur (mm)  :</label>
                     <input type="Number" placeholder="Epaisseur (mm)"  value={this.state.Epaisseur_SurfaceExterne} onChange={this.handleChange_First}
                     name="Epaisseur_SurfaceExterne" disabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} />
                </div>

                <h3  className="select" > Surface Interne :</h3>
                <div className="newUserItem">
                    <label>Type :</label>
                    <Select  className="select"   options={this.state.Type} onChange={this.handelChange_fourth.bind(this)}  isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} DefaultValue={sessionStorage.getItem('liste')==='Beton'? this.state.Type[1]:this.state.Type[0]}  />
                </div>
                <div className="newUserItemE">
                    <label>Matériaux :</label>
                    <Select  className="select"   options={this.state.Materiaux} onChange={this.handleChange.bind(this)}  isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'}/>
                </div>
                <div className="newUserItem">
                     <label>Epaisseur (mm)  :</label>
                     <input type="Number" placeholder="Epaisseur (mm)"  onChange={this.handleChange_First}
                       name="Epaisseur_SurfaceInterne" value={this.state.Epaisseur_SurfaceInterne} disabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} />
                </div>

                <h3  className="select" >Isolant :</h3>
               
                <div className="newUserItem">
                    <label>Matériaux :</label>
                    <Select   className="select"  options={this.state.Materiaux} onChange={this.handleChange.bind(this)}  isDisabled={sessionStorage.getItem('disbaleMur1') === 'OUI'} />
                </div>
                <div className="newUserItemE ">
                     <label>Epaisseur (mm)  :</label>
                     <input type="Number" placeholder="Epaisseur (mm)"  onChange={this.handleChange_First} value={this.state.Isolant_Epaisseur} 
                     name="Isolant_Epaisseur"  disabled={sessionStorage.getItem('disbaleMur1') === 'OUI'}/>
                </div>
                </fieldset>

             

           </fieldset>
           <div >
           <a href="/Mur_4"><button   className="newUserButton">Retour  </button></a>
           <a href="/Plancher"><button onClick={this.AddPlafond} type="submit"  className="newUserButton">Suivant  </button></a>
           </div>


           </div>
        </div>
    )
}
     }

   
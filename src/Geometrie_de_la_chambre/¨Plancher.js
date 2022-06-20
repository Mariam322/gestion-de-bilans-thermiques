import React, { Component } from 'react';
import Select from 'react-select';
import '../Geometrie_de_la_chambre/Mur.css';
import API from '../Api/Api';
import Nav from '../Navbar/Navadmin'


export default class Plancher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            libelle:'',
            contact_externe :'',
            vide_sanitaire:'',
            libelle_type:'',
            libelle_Materiaux:'',
            epaisseur:'',
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
        this.setState({contact_externe:'Terre'})
        this.setState({vide_sanitaire:'Non'})
   
      }

      async getContact(){
        const res = await API.get('/getcontact')
        const data = res.data
       
   
        const options = data.map(d => ({
          "value" : d.libelle_contact ,
          "label": d.libelle_contact
        }))
   
        this.setState({contact_externe: options})
   
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
      AddPlancher=()=>{ 
        const PlancherObject = {
          id_plancher:this.state.id_plancher,
           contact_externe : this.state.contact_externe,
           vide_sanitaire:this.state.vide_sanitaire,
           epaisseur:this.state.epaisseur,

  
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
  
        API.post('/InsertPlancher',PlancherObject )
        .then(res => console.log(res.data));
       
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
            
             console.log('contact_externe',e.value);
            this.setState({contact_externe:e.value});
            this.setState({Materiaux_SurfaceExterne:e.value})
            
          }
          handelChange_fourth = (e) => {
            this.setState({Type_SurfaceInterne:e.value})
            this.getMateriaux(e.value)
          }
          
          handelChange_fifth= (e) => {
                    
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
            
             console.log('vide_sanitaire',e.value);
            this.setState({vide_sanitaire:e.value});
            
          }
          handelChange_sixth= (e) => {
            this.setState({Materiaux_SurfaceInterne:e.value})
          }
          handelChange_isolant= (e) => {
            this.setState({Isolant_Materiaux:e.value})
          }
           

   
    render(){
      const vide_sanitaire = [
            { value: 'Oui', label: 'Oui' },
            { value: 'Non', label: 'Non' },
           
          ]
          const contact_externe = [
            { value: 'Terre', label: 'Terre' },
            { value: 'un autre local', label: 'un autre local' },
           
          ]

         

   

   

         



    return(
        <div>
          <Nav/>
          <div style={{ marginTop:'100px'}}>
          <h1>Géométrie de la Chambre froide</h1>
       <div className="nature">
        
        <input type="text" placeholder="type de chambre" value={sessionStorage.getItem('Latitude')} onChange={this.handleChange_second}
       name="Latitude" required />
      </div><br/>

           <fieldset className='plancher' >
                <legend>Plancher : </legend>

               
                <h2 className="select">Température du local en contact :</h2>
                <div className="newUserItem">
                    <label>Contact externe :</label>
                    <Select className="select"  options={contact_externe}  defaultValue={sessionStorage.getItem('disbaleContact')==='un autre local'? contact_externe[1]:contact_externe[0]} onChange={this.handleChange_first.bind(this)}  />
                </div>
                <div className="newUserItemE">
                     <label>Si "un autre local"  :</label>
                     <input type="text" placeholder="Si un autre local"  disabled={sessionStorage.getItem('disbaleContact')!=='un autre local'}  onChange={this.handleChange}
                     name="local"  />
                </div>
                <div className="newUserItem">
                    <label>Vide sanitaire :</label>
                    <Select  name="vide_sanitaire" className="select" defaultValue={sessionStorage.getItem('disbaleVide')==='OUI'? vide_sanitaire[1]:vide_sanitaire[0]}   onChange={this.handleChange_Second.bind(this)} options={vide_sanitaire}   />
                </div>
                <div className="newUserItemE">
                     <label>Epaisseur (mm)  :</label>
                     <input className="select" type="Number" placeholder="Epaisseur (mm)" disabled={sessionStorage.getItem('disbaleVide')!=='OUI'}  
                     name="epaisseur" value={this.state.epaisseur}   onChange={this.handelChange_fifth}/>
                </div>  <br/>
                <fieldset className="compo">
                    <legend>Composition  </legend>
                <h3 className="select">Surface externe :</h3>
                <div className="newUserItem">
                    <label>Type :</label>
                    <Select  className="select" options={this.state.Type} onChange={this.handleChange_third.bind(this)} DefaultValue={sessionStorage.getItem('liste')==='Beton'? this.state.Type[1]:this.state.Type[0]} />
                </div>
                <div className="newUserItemE">
                    <label>Matériaux :</label>
                    <Select   options={this.state.Materiaux} onChange={this.handleChange_first.bind(this)}  />
               
                </div>
                <div className="newUserItem">
                     <label>Epaisseur (mm)  :</label>
                     <input type="Number" placeholder="Epaisseur (mm)" value={this.state.Epaisseur_SurfaceExterne} onChange={this.handelChange_fifth} 
                     name="Epaisseur_SurfaceExterne"  />
                </div>

                <h3 className="select">Surface Interne :</h3>
                <div className="newUserItem">
                    <label>Type :</label>
                    <Select  className="select" options={this.state.Type} onChange={this.handelChange_fourth.bind(this)} DefaultValue={sessionStorage.getItem('liste')==='Beton'? this.state.Type[1]:this.state.Type[0]}  />
                </div>
                <div className="newUserItemE">
                    <label>Matériaux :</label>
                    <Select   options={this.state.Materiaux} onChange={this.handelChange_sixth.bind(this)}  />
                </div>
                <div className="newUserItem">
                     <label>Epaisseur (mm)  :</label>
                     <input type="Number" placeholder="Epaisseur (mm)" value={this.state.Epaisseur_SurfaceInterne} onChange={this.handelChange_fifth}  
                     name="Epaisseur_SurfaceInterne"  />
                </div>

                <h3 className="select">Isolant :</h3>
               
                <div className="newUserItem">
                    <label>Matériaux :</label>
                    <Select className="select"  options={this.state.Materiaux} onChange={this.handelChange_isolant.bind(this)}  />
                </div>
                <div className="newUserItemE ">
                     <label>Epaisseur (mm)  :</label>
                     <input type="Number" placeholder="Epaisseur (mm)"  value={this.state.Isolant_Epaisseur} onChange={this.handelChange_fifth}  
                     name="Isolant_Epaisseur"  />
                </div>
                </fieldset>

             

           </fieldset>
           <div >
           <a href="/plafond"><button   className="newUserButton">Retour  </button></a>
           <a href="/porte"><button  onClick={this.AddPlancher}  type="submit"  className="newUserButton">Suivant  </button></a>
           </div>

           </div>
       
        </div>
    )
}
     }

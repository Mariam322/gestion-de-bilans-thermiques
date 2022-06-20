import React, { Component } from 'react';
import Select from 'react-select';
import '../Geometrie_de_la_chambre/Mur.css';
import API from '../Api/Api';
import NavAdmin from '../Navbar/Navadmin'
import NavEmploye from '../Navbar/Nav'


export default class Porte extends Component {
    constructor(props) {
        super(props);
        this.state = {
            libelle:'',
            Contact:'',
            libelle_type:'',
            libelle_Materiaux:'',
            largeur:'',
            hauteur:'',
            epaisseur:'',
            Type_SurfaceInterne:'',
            Epaisseur_SurfaceInterne:'',
            Materiaux_SurfaceInterne:'',

            Epaisseur_SurfaceExterne:'',
            Type_SurfaceExterne:'',
            Materiaux_SurfaceExterne:'',
            Isolant_Materiaux:'',
            Isolant_Epaisseur:'',
            orientation:'',
            Type_ouverture:'',
             Isolation:'',
            contact_externe:'',
            AutreLocal_Mixte:'',
            DimensionNormalise:'',
        

            redirect: null,
            Orientation: [],
       
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
        this.setState({Contact:'air extérieur'})
        this.setState({dimension:'Oui'})
        this.setState({largeur:''})
        this.setState({hauteur:''})
      }
      AddPorte=()=>{ 
        const PorteObject = {
          id_porte:this.state.id_porte,
           orientation:this.state.orientation,
           Type_ouverture:this.state.Type_ouverture,
          Isolation: this.state.Isolation,
          contact_externe:this.state.contact_externe,
          AutreLocal_Mixte: this.state.AutreLocal_Mixte,
          DimensionNormalise: this.state.DimensionNormalise,
          largeur :this.state.largeur,
           hauteur :this.state.hauteur,
      
      
  
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
  
        API.post('/InsertPorte',PorteObject )
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

        this.setState({largeur:''})
        this.setState({hauteur:''})
   
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
        }

        handleChange=(e)=>{

            this.setState({Type_ouverture:e.value})

           }
           handleChange_orientation=(e)=>{
            this.setState({Orientation:e.value})
            this.setState({Orientation:this.getOrientation()});
            sessionStorage.setItem('OrientationPorte',e.value);
           }
           handleChange_isolation=(e)=>{
            this.setState({Isolation:e.value})
           }
         
           handleChange_first = (e) => {
                     
         
            if (e.value=="un autre local") {
              sessionStorage.setItem('disbalePorte', 'un autre local');
             
              this.setState({
                TEST: false
            });
            }else{
              sessionStorage.setItem('disbalePorte', 'air extérieur');
              this.setState({
                TEST: true
              })
            }
            
             console.log('contact_externe',e.value);
            this.setState({contact_externe:e.value});
            
          }

          handleChange_Second = (e) => {
                     
         
            if (e.value=="Non") {
              sessionStorage.setItem('disbaleLargLong', 'Non');
             
              this.setState({
                TEST: false
            });
            }else{
              sessionStorage.setItem('disbaleLargLong', 'Oui');
              this.setState({
                TEST: true
              })
            }
            
             console.log('DimensionNormalise',e.value);
            this.setState({DimensionNormalise:e.value});
            
          }
          handelChange_third=(e)=>{
                  
               
            this.setState({Orientation:this.getOrientation()});
            sessionStorage.setItem('OrientationPorte',e.value);
       }
       handelChange_largHaut=(e)=>{
                  
               
        
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
    render(){
      const DimensionNormalise = [
            { value: 'Oui', label: 'Oui' },
            { value: 'Non', label: 'Non' },
           
          ]

          const contact_externe = [
            { value: 'air extérieur', label: 'air extérieur' },
            { value: 'un autre local', label: 'un autre local' },
           
          ]

          const Type_ouverture = [
            { value: 'automatique commandée', label: 'automatique commandée' },
            { value: 'ouverture manuelle', label: 'ouverture manuelle' },
           
          ]

          const Isolation = [
            { value: 'Oui', label: 'Oui' },
            { value: 'Non', label: 'Non' },
           
          ]

         

   

   

         



    return(
        <div>
          {
            sessionStorage.getItem('isAdmin') === '1' ?  <NavAdmin/>: <NavEmploye/>
          }
          <div style={{marginTop: '120px'}}>
              <h1>Géométrie de la Chambre froide</h1>
           <div className="nature" style={{marginTop: '-60px',marginLeft: '300px'}}>
        
         <input type="text" placeholder="Type de chambre" value={sessionStorage.getItem('type_chambre')} onChange={this.handleChange_second}
        name="Latitude" required />
       </div><br/>

           <fieldset className='Porte'>
                <legend>Porte : </legend>

                <div className="newUserItem">
                    <label>Orientation :</label>
                    <Select  className="select" options={this.state.Orientation}  selected={sessionStorage.getItem('OrientationPorte')} onChange={this.handleChange_orientation}/>
         
                </div>

                <div className="newUserItem">
                    <label>Type d'ouverture de la porte :</label>
                    <Select  className="select" options={Type_ouverture}  onChange={this.handleChange}/>
                </div>

                <div className="newUserItemE">
                    <label>Isolation par rideau d'air :</label>
                    <Select   options={Isolation} onChange={this.handleChange_isolation}  />
                </div>




               
                <h2 className="select">Température du local en contact :</h2>
                <div className="newUserItem">
                    <label>Contact externe :</label>
                    <Select  className="select" defaultValue={sessionStorage.getItem('disbalePorte')==='un autre local'? contact_externe[1]:contact_externe[0]} options={contact_externe}  onChange={this.handleChange_first.bind(this) } />
                </div>
                <div className="newUserItemE">
                     <label>Si "un autre local"  :</label>
                     <input type="text" placeholder="Si un autre local"  
                     name="AutreLocal_Mixte"  disabled={sessionStorage.getItem('disbalePorte')!=='un autre local'} onChange={this.handleChange} />
                </div>
                <div className="newUserItem">
                    <label>Dimension Normalisée :</label>
                    <Select className="select" defaultValue={sessionStorage.getItem('disbaleLargLong')==='Non'? DimensionNormalise[1]:DimensionNormalise[0]}   onChange={this.handleChange_Second.bind(this)}  options={DimensionNormalise}   />
                </div>
                <div className="newUserItem">
                     <label>Largeur (m) :</label>
                     <input type="Number" placeholder="Largeur (m)" value={this.state.largeur}   disabled={sessionStorage.getItem('disbaleLargLong')!=='Non'}  onChange={this.handelChange_largHaut} 
                     name="largeur"   />
                </div>
                <div className="newUserItemE">
                     <label>Hauteur (m) :</label>
                     <input type="Number" placeholder="Hauteur (m)"  value={sessionStorage.setItem('HauteurPorte',this.state.hauteur) } disabled={sessionStorage.getItem('disbaleLargLong')!=='Non'}  onChange={this.handelChange_largHaut} 
                     name="hauteur"  />
                </div> <br/>



                <fieldset  className="compo">
                    <legend>Composition </legend>
                <h3 className="select">Surface externe :</h3>
                <div className="newUserItem">
                    <label>Type :</label>
                    <Select  className="select"  options={this.state.Type} onChange={this.handleChange_third.bind(this)} DefaultValue={sessionStorage.getItem('liste')==='Beton'? this.state.Type[1]:this.state.Type[0]} />
                </div>
                <div className="newUserItemE">
                    <label>Matériaux :</label>
                    <Select   options={this.state.Materiaux} onChange={this.handleChange.bind(this)}  />
               
                </div>
                <div className="newUserItem">
                     <label>Epaisseur (mm)  :</label>
                     <input type="Number" placeholder="Epaisseur (mm)"  value={this.state.Epaisseur_SurfaceExterne}
                     name="Epaisseur_SurfaceExterne" onChange={this.handelChange_largHaut}  />
                </div>

                <h3 className="select">Surface Interne :</h3>
                <div className="newUserItem">
                    <label>Type :</label>
                    <Select className="select"  options={this.state.Type} onChange={this.handelChange_fourth.bind(this)} DefaultValue={sessionStorage.getItem('liste')==='Beton'? this.state.Type[1]:this.state.Type[0]}  />
                </div>
                <div className="newUserItemE">
                    <label>Matériaux :</label>
                    <Select   options={this.state.Materiaux} onChange={this.handleChange.bind(this)}  />
                </div>
                <div className="newUserItem">
                     <label>Epaisseur (mm)  :</label>
                     <input type="Number" placeholder="Epaisseur (mm)"  value={this.state.Epaisseur_SurfaceInterne}
                     name="Epaisseur_SurfaceInterne" onChange={this.handelChange_largHaut}  />
                </div>

                <h3 className="select"> Isolant :</h3>
               
                <div className="newUserItem">
                    <label>Matériaux :</label>
                    <Select  className="select" options={this.state.Materiaux} onChange={this.handleChange.bind(this)}  />
                </div>
                <div className="newUserItemE ">
                     <label>Epaisseur (mm)  :</label>
                     <input type="Number" placeholder="Epaisseur (mm)" value={this.state.Isolant_Epaisseur}
                     name="Isolant_Epaisseur"  onChange={this.handelChange_largHaut} />
                </div>
                </fieldset>

             

           </fieldset>
           <div style={{marginTop: '-50px'}}>
           <a href="/plancher"><button   className="newUserButton">Retour  </button></a>
           <a href="/Facture"> <button  onClick={this.AddPorte}className="newUserButton">Suivant</button></a>
           <a href="/ResumeChambre"><button   className="newUserButton">Resume Chambre  </button></a>

           </div>
       
        </div>
        </div>
    )
}
     }

   
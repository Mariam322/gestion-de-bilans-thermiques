import React, { Component } from 'react';
import Select from 'react-select';
import '../Geometrie_de_la_chambre/Mur.css';
import API from '../Api/Api';




export default class Porte extends Component {
    constructor(props) {
        super(props);
        this.state = {
            libelle:'',
            Contact:'',
            libelle_type:'',
            libelle_Materiaux:'',
            Largeur:'',
            Hauteur:'',
            

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
        this.setState({Largeur:''})
        this.setState({Hauteur:''})
      }

 

      async getType(){
        const res = await API.get('/gettype')
        const data = res.data
       
   
        const options = data.map(d => ({
          "value" : d.libelle_type ,
          "label": d.libelle_type
        }))
   
        this.setState({Type: options})

        this.setState({Largeur:''})
        this.setState({Hauteur:''})
   
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

        handleChange=(e)=>{
          let nam = e.target.name;
                   let val = e.target.value;

                     this.setState({[nam]: val}); 
     
            this.setState({libelle:e.value});
            this.setState({Contact:e.value});
            this.setState({libelle_type:e.value});

            

            sessionStorage.setItem('Largeur',this.state.Largeur);
            sessionStorage.setItem('Hauteur',this.state.Hauteur);

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
            
             console.log('Contact',e.value);
            this.setState({Contact:e.value});
            
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
            
             console.log('dimension',e.value);
            this.setState({dimension:e.value});
            
          }
          handelChange_third=(e)=>{
                  
               
            this.setState({Orientation:this.getOrientation()});
            sessionStorage.setItem('Orientation',e.value);
       }
    render(){
      const dimension = [
            { value: 'Oui', label: 'Oui' },
            { value: 'Non', label: 'Non' },
           
          ]

          const Contact = [
            { value: 'air extérieur', label: 'air extérieur' },
            { value: 'un autre local', label: 'un autre local' },
           
          ]

          const Type_Ouverture = [
            { value: 'automatique commandée', label: 'automatique commandée' },
            { value: 'ouverture manuelle', label: 'ouverture manuelle' },
           
          ]

          const Isolation = [
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

           <fieldset className='Porte'>
                <legend>Porte : </legend>

                <div className="newUserItem">
                    <label>Orientation :</label>
                    <Select  className="select" options={this.state.Orientation}  selected={sessionStorage.getItem('Orientation')} onChange={this.handelChange_third}/>
         
                </div>

                <div className="newUserItem">
                    <label>Type d'ouverture de la porte :</label>
                    <Select  className="select" options={Type_Ouverture}  onChange={this.handleChange}/>
                </div>

                <div className="newUserItemE">
                    <label>Isolation par rideau d'air :</label>
                    <Select   options={Isolation}   />
                </div>




               
                <h2 className="select">Température du local en contact :</h2>
                <div className="newUserItem">
                    <label>Contact externe :</label>
                    <Select  className="select" defaultValue={sessionStorage.getItem('disbalePorte')==='un autre local'? Contact[1]:Contact[0]} options={Contact}  onChange={this.handleChange_first.bind(this) } />
                </div>
                <div className="newUserItemE">
                     <label>Si "un autre local"  :</label>
                     <input type="text" placeholder="Si un autre local"  
                     name="local"  disabled={sessionStorage.getItem('disbalePorte')!=='un autre local'} onChange={this.handleChange} />
                </div>
                <div className="newUserItem">
                    <label>Dimension Normalisée :</label>
                    <Select className="select" defaultValue={sessionStorage.getItem('disbaleLargLong')==='Non'? dimension[1]:dimension[0]}   onChange={this.handleChange_Second.bind(this)}  options={dimension}   />
                </div>
                <div className="newUserItem">
                     <label>Largeur (m) :</label>
                     <input type="Number" placeholder="Largeur (m)"value={sessionStorage.getItem('Largeur')}  disabled={sessionStorage.getItem('disbaleLargLong')!=='Non'}  onChange={this.handleChange} 
                     name="Largeur"   />
                </div>
                <div className="newUserItemE">
                     <label>Hauteur (m) :</label>
                     <input type="Number" placeholder="Hauteur (m)"  value={sessionStorage.getItem('Hauteur')} disabled={sessionStorage.getItem('disbaleLargLong')!=='Non'}  onChange={this.handleChange} 
                     name="Hauteur"  />
                </div> <br/>



                <fieldset  className="compo">
                    <legend>Composition </legend>
                <h3 className="select">Surface externe :</h3>
                <div className="newUserItem">
                    <label>Type :</label>
                    <Select  className="select"  options={this.state.Type} onChange={this.handleChange.bind(this)}  />
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
                    <Select className="select"  options={this.state.Type} onChange={this.handleChange.bind(this)}  />
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

                <h3 className="select"> Isolant :</h3>
               
                <div className="newUserItem">
                    <label>Matériaux :</label>
                    <Select  className="select" options={this.state.Materiaux} onChange={this.handleChange.bind(this)}  />
                </div>
                <div className="newUserItemE ">
                     <label>Epaisseur (mm)  :</label>
                     <input type="Number" placeholder="Epaisseur (mm)"  
                     name="Ep"  />
                </div>
                </fieldset>

             

           </fieldset>
           <a href="/plancher"><button   className="newUserButton">Retour  </button></a>
        
           <a href="/ResumeChambre"><button   className="newUserButton">Resume Chambre  </button></a>


       
        </div>
    )
}
     }

   
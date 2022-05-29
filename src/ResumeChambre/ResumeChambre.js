import React from 'react'


import '../ResumeChambre/chambre.css'
import  chambre from "../assets/chambre.bmp.png"


export default function ResumeChambre() {
   

       


    
    
    return (
        
       
        <div  >
            <h1>Résumé de la géometrie de la chambre froide</h1><br></br>
            <div className='panneaux'>
                     <label className='newUserItem'>Epaisseur panneaux sandwich :</label><br></br>
                     <input type='number' className='Epaisseur' value={sessionStorage.getItem('Epaisseur')}/>
                 </div>
                
            <div className='chambre' >
                 <img src={chambre} alt="chambre" />
                 <div className='longueur'>
                     <label className='newUserItem'>Longueur (m) :</label><br></br>
                     <input type='number' className='Longueur'  value={sessionStorage.getItem('Longueur')}/>
                 </div>
                 </div>
                 <div className='largeur'>
                     <label className='newUserItem'>Largeur (m)  :</label><br></br>
                     <input type='number' className='Largeur' value={sessionStorage.getItem('LongueurM')}/>
                 </div>
                 <div className='hateur'>
                     <label className='newUserItem' >Hateur (m)  :</label><br></br>
                     <input type='number' className='hateur' value={sessionStorage.getItem('Hauteur')}/>
                 </div>
                 <from>
                 
                 <fieldset className='field'>
                     <legend>Porte :</legend>
                     <div className="newUserItem">
                      <label>orientation :</label>
                     <input type="text"  value={sessionStorage.getItem('Orientation')}/>
                 </div> <br/>
                     <div className="newUserItem">
                    <label>Largeur (m) :</label>
                    <input type="text" value={sessionStorage.getItem('Largeur')}  />
                </div>
                <div className="newUserItemE">
                     <label>Hauteur (m):</label>
                     <input type="Number"
                     name="Hauteur" value={sessionStorage.getItem('Hauteur')}  />
                </div>
                 
                 </fieldset>



                 <fieldset className='fieldsds'>
                     <legend>Plancher (mm) :</legend>
                     
                     <div className="newUserItem">
                    <label>Vide sanitaire :</label>
                    <input type="text"  />
                </div>
                 </fieldset>
    
                 </from>
                 
                 <a href="/porte"><button   className="newUserButton">Retour  </button></a>
            </div>
        
       
    )
}
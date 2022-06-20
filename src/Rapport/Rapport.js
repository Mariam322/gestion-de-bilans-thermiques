
import React,  { Component } from 'react';
import './Rapport.css'
import  logo from "../assets/lOGO.JPG"
class Rapport extends Component {
    constructor(props) {
      super(props)} 


      render(){
      return(
        <div>
            <img  src={logo} alt={logo} className='imag'  ></img>
            <div>

                <h1 className='titreR'>Rapport de calcul de la chambre froide </h1>
                <hr ></hr>
            </div>
            <br></br><br></br>

            <div>
              <div>
              <label>Dossier N° :</label>
              <input className='inpD' type="text"></input><br></br>

              <label>Nom du client :</label>
              <input className='inpN' type="text"></input><br></br>

              <label>Prénom du client :</label>
              <input  className='inpP' type="text"></input><br></br>

              <label>Société :</label>
              <input  className='inpS' type="text"></input><br/>

              <label>Adresse du client :</label>
              <input className='inp' type="text"></input><br/>
              </div> <br></br><br/>


              <div>
              <label>Code Postal :</label>
              <input  className='inp' type="text"></input><br></br>

              <label>Ville :</label>
              <input className='inpV' type="text"></input><br></br>

              <label>Tel :</label>
              <input  className='inpT' type="text"></input><br></br>

              <label>E-mail :</label>
              <input className='inpM'  type="text"></input><br></br>

              </div>




              <div className='date'>
              <label> Date :</label>
              <input type="date"></input>

              <div className='paysFax'>
              <label>Pays :</label>
              <input type="text"></input><br></br>
              <label>Fax :</label>
              <input clasName='inpF'type="text"></input><br></br>
              </div>

              </div> 
              <hr className='ligne'></hr>

            </div>

              <label>Ville :</label>
              <input type="text"></input><br></br>
              <div className='milieu'>
              <label> Latitude :</label>
              <input className='inplar' type="text"></input><br></br>
              </div>

              <fieldset>
                <legend>Dimension</legend>

                <label>Longueur (m) :</label>
              <input type="text"></input><br></br>
              <div className='milieu'>
              <label> Largeur (m) :</label>
              <input type="text"></input><br></br>
              </div>
              <div className='extr'>
              <label> Largeur (m) :</label>
              <input type="text"></input><br></br>
              </div> 

              <label>Surface (m²) :</label>
              <input type="text"></input><br></br>
              </fieldset>

              <fieldset>
                <legend>Températures (°C):</legend>
                <label>Interne: </label>
              <input type="text"></input><br></br>
              <div className='milieu'>
              <label> Externe:</label>
              <input className='Externe'type="text"></input><br></br>
              </div>

              </fieldset>
<br/>

              <fieldset>
               
                <label>Produit à stocker: </label>
              <input  className='PS'type="text"></input><br></br>

              <label>Masse à stocker (Tonne): </label>
              <input type="text"></input><br></br>

              <div className='milieuP'>
              <label> Flux journalier (Tonne/jour):</label>
              <input type="text"></input><br></br>
              <label>Fluide Frigorigène: </label>
              <input className='FF' type="text"></input><br></br>
              </div>

              </fieldset>
              <hr className='lig2'></hr>
              <label className='type'>Type de chambre froide :</label><br></br>
              <input className='typeC' size='30'></input>
              <br></br>
              <fieldset>
                <legend>Bilan frigorifique: </legend>
                <table>
                  <tr>
                    <td>Charge</td>
                    <td>Puissance(W) </td>
                    <td>%</td>
                  </tr>
                  <tr>
                    <td>Charge à travers les parois</td>
                    <td><input ></input></td>
                    <td><input ></input></td>
                  </tr>
                  <tr>
                    <td>Charge par renouvellement d'air</td>
                    <td><input ></input></td>
                    <td><input ></input></td>
                  </tr>
                </table>
              </fieldset>
              <hr className='lig2'></hr>
              <fieldset>
                <legend>Remarques</legend>
              </fieldset>
              <fieldset>
                <legend>Cachet et signature</legend>
              </fieldset>
              <button className='imprimer' >Imprimer</button>

              

              

            <div>


            </div>
            
          

   
            

        </div>

      );}}
      export default Rapport;
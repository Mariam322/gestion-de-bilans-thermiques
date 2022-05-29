import React from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import  { useState } from "react";
import '../Style/Auth.css'


export default function SignIn() {
const [nomReg, setnomReg] =useState("");
const [prenomReg, setprenomReg] =useState("");
const [sexeReg, setsexReg] =useState("");
const [routeReg, setrouteReg] =useState("");
const [villeReg, setvilleReg] =useState("");
const [codeReg, setcodeReg] =useState("");
const [telReg, settelReg] =useState("");
const [loginReg, setloginReg] =useState("");
const [mailReg, setmailReg] =useState("");
const [motepassReg, setmotepassReg] =useState("");


const register = () =>{
    Axios.post("http://localhost:4000/Create",{
        nom:nomReg,
        prenom:prenomReg,
        sexe:sexeReg,
        Route:routeReg,
        ville:villeReg,
        code_postal:codeReg,
        telephone:telReg,
        login:loginReg,
        mail:mailReg,
        motdepass:motepassReg,
        

    }).then(()=>{
        alert("successfuly");
    });
};
return (
  <div className="text-center m-5-auto">
      
      
      <form  >
      <h5>S'inscrire</h5> <br/>
      <p>
              <label>nom</label><br/>
              <input type="text" 
              onChange={(e)=>{
                  setnomReg(e.target.value);
              }}
              
              name="nom" required />
          </p><br/>

          <p>
              <label>prenom</label><br/>
              <input type="text" 
              onChange={(e)=>{
                  setprenomReg(e.target.value);
              }}
              name="prenom" required />
          </p><br/>
          <p>
              <label>sexe</label><br/>
              <input type="text"
              onChange={(e)=>{
                  setsexReg(e.target.value);
              }}
               name="sexe" required />
          </p><br/>

          <p>
              <label>Route</label><br/>
              <input type="text" 
              onChange={(e)=>{
                  setrouteReg(e.target.value);
              }}
              name="Route" required />
          </p><br/>
          <p>
              <label>Ville</label><br/>
              <input type="text" 
              onChange={(e)=>{
                  setvilleReg(e.target.value);
              }}name="ville" required />
          </p><br/>
          <p>
              <label>code postal</label><br/>
              <input type="text" 
              onChange={(e)=>{
                  setcodeReg(e.target.value);
              }}
              name="code_postal" required />
          </p><br/>

          <p>
              <label>Telephone</label><br/>
              <input type="text" 
              onChange={(e)=>{
                  settelReg(e.target.value);
              }}
              name="telephone" required />
          </p><br/>
          <p>
              <label>Login</label><br/>
              <input type="text"
              onChange={(e)=>{
                  setloginReg(e.target.value);
              }}
               name="login" required />
          </p>
         
        
          <p>
              <label>E-mail</label><br/>
              <input type="email" 
              onChange={(e)=>{
                  setmailReg(e.target.value);
              }}
              name="email" required />
          </p>
          <p>
              <label>Mot de passe</label><br/>
              <input type="password"
              onChange={(e)=>{
                  setmotepassReg(e.target.value);
              }}
               name="motdepass" required />
          </p>
          <p>
              <input type="checkbox" name="checkbox" id="checkbox" required /> <span>J'accepte toutes  <a href="https://google.com" target="_blank" rel="noopener noreferrer">les conditions d'utilisation</a></span>.
          </p>
          <p>
              <button id="sub_btn" onClick={register} type="submit">Enregistrer</button>
          </p>
      </form>
      <footer>
          <p><Link to="/">Back to Homepage</Link>.</p>
      </footer>
  </div>
)

}
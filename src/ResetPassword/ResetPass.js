import React from 'react'
import  { useState } from "react";
import Axios from 'axios';
import pass from "../assets/pass.png";
import Logo from "../assets/lOGO.JPG"
import "./Reset.css"
import Swal from 'sweetalert2';
import {useLocation} from "react-router-dom"
import { useHistory } from "react-router-dom";

export default function ResetPasswordPage() {
    const [motdepass, setmotdepass] = useState("");
    const [motdepass2, setmotdepass2] = useState("");
    let history = useHistory();
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');
    console.log(token)
    const Reset = () => {
        if(motdepass!=motdepass2){
            Swal.fire({
                  
                text: 'Le mot de passe ne correspond pas.',
                icon: 'warning',
                
                confirmButtonColor: 'black',
                
                confirmButtonText: 'OK'
              })
              return
            }
            
            
            Axios.post("http://localhost:4000/update-password",{
                motdepass:motdepass,
                token,
            
        }).then((response) => {
            console.log(response);
        });
        
        Swal.fire({
            text: 'Mot de passe changé avec succés.',
            icon: 'success',
            confirmButtonColor: 'black',
            confirmButtonText: 'OK'
          })
          history.push('/')
         
          
        
    }
  

    
    return (
        <div className="main">
         
         <div >
         <div>
        <img src={Logo} alt="profile" className="logoRM"/>
        </div>
            <h2>Réinitialisez votre mot de passe</h2> <br/>
            
                <p>
                   <h3>Mot de passe </h3><br/>
                   <div className="second-input">
               <img src={pass} alt="pass" className="email"/>
                    <input  type="password" name="motdepass" placeholder='Mot de passe ' onChange={(e)=>{
                        setmotdepass(e.target.value);
                    }}required  className="name"/>  </div>

                    <div className="second-input">
               <img src={pass} alt="pass" className="email"/>
                    <input type="password" name="motdepass" placeholder='Confirmer Mot de passe ' onChange={(e)=>{
                        setmotdepass2(e.target.value);
                    }}required  className="name"/>  </div>


                    
                </p> <br/>
              
                <p>
                    <button id="sub_btn" onClick={Reset} type="submit">Enregistrer</button>
                </p>
                <br/>
            
            </div>
            
        </div>
    )
}
import React from 'react'
import  { useState } from "react";
import Axios from 'axios';
import pass from "../assets/pass.png";
import Logo from "../assets/lOGO.JPG"
export default function ResetPasswordPage() {
    const [motdepass, setmotdepass] = useState("");
  
  
    const Reset = () => {
        Axios.post("http://localhost:4000/update-password",{
            motdepass:motdepass,
            
        }).then((response) => {
            console.log(response);
        });

       


    }
    
    return (
        <div className="main">
         
         <div >
         <div>
        <img src={Logo} alt="profile" className="logo"/>
        </div>
            <h2>Réinitialisez votre mot de passe</h2> <br/>
            
                <p>
                   <h3>Mot de passe </h3><br/>
                   <div className="second-input">
               <img src={pass} alt="pass" className="email"/>
                    <input type="password" name="motdepass"  onChange={(e)=>{
                        setmotdepass(e.target.value);
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
import React from 'react'
import  { useState } from "react";
import Axios from 'axios';

import '../Style/Auth.css'


export default function ResetPassword() {
    const [motdepass, setmotdepass] = useState("");
  
    const Reset = () => {
        Axios.get("http://localhost:4000/Reset-Password",{
            motdepass:motdepass
        }).then((response) => {
            console.log(response);
        });

       


    }
    
    return (
        <div className="main">
         
         <div >

            <h2>Réinitialisez votre mot de passe</h2> <br/>
            
                <p>
                   <h3></h3> Mot de passe <br/>
                    <input type="password" name="motdepass"  onChange={(e)=>{
                        setmotdepass(e.target.value);
                    }}required />
                </p> <br/>
                <p>
                    <button id="sub_btn" onClick={Reset}type="submit">Enregistrer</button>
                </p>
                <br/>
            
            </div>
            
        </div>
    )
}
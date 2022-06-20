import React from 'react'

import  { useState } from "react";
import Axios from 'axios';
import '../ForgetPassword/forget.css'
import  email from "../assets/Login.jpg"
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";
import Logo from "../assets/lOGO.JPG"
export default function ForgetPasswordPage() {
    const [mail, setEmail] = useState("");
    let history = useHistory();
    const ForgotPassword = () => {
        Axios.post("http://localhost:4000/forgot",{
            mail:mail
        }).then((response) => {
            console.log(response);
    
            if(response.data.message == 'Le lien de réinitialisation du mot de passe a été envoyé à votre adresse e-mail'){
                // alert('Please enter Username and Password!')
                   Swal.fire({
  
text: 'Le lien de réinitialisation du mot de passe a été envoyé à votre adresse e-mail',
icon: 'success',

confirmButtonColor: 'black',

confirmButtonText: 'OK'
})
return
               }
              
              

              
              

               if(response.data.message == 'Impossible de trouver un compte correspondant à cette adresse e-mail'){
                // alert('Please enter Username and Password!')
                   Swal.fire({
  
text: 'Impossible de trouver un compte correspondant à cette adresse e-mail',
icon: 'warning',

confirmButtonColor: 'black',

confirmButtonText: 'OK'
})
return
               }
              
              

              
              
            
          
          }
          )};
    
    return (
      
        <div className="main">
            
        <div  >
        <div>
        <img src={Logo} alt="profile" className="logo"/>
        </div>
            <h1>Réinitialisez votre mot de passe</h1> <br></br>
            <h3>Entrez votre adresse e-mail et nous vous enverrons un nouveau mot de passe</h3><br/>
                
            <div>
                 <img src={email} alt="email" className="email"/>
                 <input type="email"name="mail" onChange={(e)=>{
                        setEmail(e.target.value);
                    }}required 
                 
                 
                 placeholder="Email" className="name"/>
               </div>
                 
                <p>
     <button id="sub_btn"onClick={ForgotPassword} type="submit">Envoyer un e-mail de réinitialisation du mot de passe</button>
                </p>
                <br/>
                <footer>
               
            </footer>
            </div>
            
        </div>
       
    )
}
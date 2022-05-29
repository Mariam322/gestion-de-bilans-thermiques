import React from 'react'
import { Link } from 'react-router-dom'
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
        }).then((msg) => {
            console.log(msg);
            if (msg == 'Incorrect Username and/or Password!'){
                //alert('Incorrect Username and/or Password!');
                Swal.fire({
                 
                text: 'Incorrect Username and/or Password!',
                icon: 'warning',
                
                confirmButtonColor: 'black',
               
                confirmButtonText: 'OK'
                })
                
              }else{
               if(msg == 'Please enter Username and Password!'){
                // alert('Please enter Username and Password!')
                   Swal.fire({
  
text: 'Please enter Username and Password!',
icon: 'warning',

confirmButtonColor: 'black',

confirmButtonText: 'OK'
})
               }
               else{
                history.push('/Account')
               }
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
                <p>Première fois?  <Link to="/signIn">Créer compte</Link>.</p>
               
            </footer>
            </div>
            
        </div>
       
    )
}
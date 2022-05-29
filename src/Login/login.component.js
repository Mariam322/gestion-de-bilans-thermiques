import React from 'react'
import { Link } from 'react-router-dom';
import  { useState } from "react";
import Axios from 'axios';
import '../Login/Login.css';
import profile from "../assets/user2.png";
import  email from "../assets/Login.jpg"
import pass from "../assets/pass.png";
import Logo from "../assets/lOGO.JPG"
import Swal from 'sweetalert2';
import { Redirect } from 'react-router';
import client from"../Client/ClientForm.component";

import { Route } from 'devextreme-react/map';
import { useHistory } from "react-router-dom";



function Login() {
    const [login, setlogin] = useState("");
    const [motdepass, setmotepass] = useState("");
  
    let history = useHistory();

  
    const fnlogin =()=>{
        
        Axios.post("http://localhost:4000/loogin" ,{
            login: login,
            motdepass: motdepass,
            roles:'',
          })
          .then ((response) => {
             
              console.log(response);
              console.log(response.data)
              sessionStorage.setItem('userId',response.data[0].id);
              if (response.data == 'Incorrect Username and/or Password!'){
                //alert('Incorrect Username and/or Password!');
                Swal.fire({
                 
                text: 'Incorrect Username and/or Password!',
                icon: 'warning',
                
                confirmButtonColor: 'black',
               
                confirmButtonText: 'OK'
                })
                
              }else{
               if(response.data == 'Please enter Username and Password!'){
                // alert('Please enter Username and Password!')
                   Swal.fire({
  
text: 'Please enter Username and Password!',
icon: 'warning',

confirmButtonColor: 'black',

confirmButtonText: 'OK'
})
               }
               else if (response.data[0].roles=='Admin'){
                history.push('/Account_Admin')
               }
               else if (response.data[0].roles=='Empolye'){
                history.push('/Account_User')
               }
              }

              
              
            
          
          }
          )};
   

    return (
  
      <div className="main">
       <div className="sub-main">
         <div>
           <div className="imgs">
             <div className="container-image">
               <img src={Logo} alt="profile" className="profile"/>
  
             </div>

           </div>
           <div>
              <br/>
             
               <img src={email} alt="email" className="email"/>
               
               <input className="name" type="text"
                 onChange={(e)=>{
                  setlogin(e.target.value);
              }} 
               
               placeholder="Login" />
             
             <div className="second-input">
               <img src={pass} alt="pass" className="email"/>
               
               <input 
               className="name"
                type="password" 
                  onChange={(e)=>{
                      setmotepass(e.target.value);
                  }} 
               placeholder="mot de passe" />
             </div>
             
            <div className="login-button">
            <button className="button"   onClick={fnlogin}>Login</button>
            </div> <br/> 
             
              <p className="link">
                <a href="/forget-password">Mot de passe oublié?</a><br/>
                
              </p><br/>
              
             
   
           </div>
         </div>
  
  
       </div>
      </div>
      
    );
  }

export default Login;      /* Swal.fire({
  title: 'Are you sure?',
text: 'User will have Admin Privileges',
icon: 'warning',
showCancelButton: true,
confirmButtonColor: '#3085d6',
cancelButtonColor: '#d33', 
confirmButtonText: 'Yes!'
})*/
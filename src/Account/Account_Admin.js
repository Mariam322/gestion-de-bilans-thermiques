import React from 'react';

import profile from "../assets/user2.png";
import projet from "../assets/projet.png";
import clients from "../assets/client2.jpg";
import users from "../assets/users+.png";
import devis from "../assets/Devis.jpg";
import { Link } from 'react-router-dom';



export default function Account_Admin() {
    
    return(
     
        <div>
      
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>

          <br/>
        <div class="row row-cols-1 row-cols-md-2 g-4" style={{marginTop:'10px',marginLeft:'-60px'}}>
     
  <div class="col" >
    <div class="card" style={{border: "2px  solid " ,borderRadius: "20px",width: "500px",marginLeft:'130px'}} >
    <Link to="/Profil">
      <img src={profile} alt="profile" style={{width:200 ,marginLeft:'140px'}} />
      </Link>
      <div class="card-body">
        <h5 class="card-title" style={{marginLeft:'200px'}}>Profil</h5>
       
      </div>
    </div>
  </div>
  <div class="col">
  
    <div class="card" style={{border: "2px  solid " ,borderRadius: "20px",width: "500px",marginLeft:'70px'}}>
    <Link to="/Project-list">
      <img src={projet} class="card-img-top" alt="projet" style={{width:200 ,marginLeft:'140px'}}/> 
      </Link>
      <div class="card-body">
        <h5 class="card-title" style={{marginLeft:'200px'}}>Projets</h5>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card"  style={{border: "2px  solid " ,borderRadius: "20px",width: "500px",marginLeft:'130px'}}>
    <Link to="/Client">
      <img src={clients} class="card-img-top" alt="clients" style={{width:200 ,marginTop:'5px',marginLeft:'140px'}} />
      </Link>
      <div class="card-body">
        <h5 class="card-title" style={{marginTop:'-10px',marginLeft:'190px'}}>Clients</h5>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card"  style={{border: "2px  solid " ,borderRadius: "20px",width: "500px",marginLeft:'70px'}}>
      <Link to="/User-list">
      <img src={users} class="card-img-top" alt="users" style={{width:170 ,marginTop:'10px',marginLeft:'140px'}}/>
      </Link>
      <div class="card-body">
        <h5 class="card-title" style={{marginLeft:'200px'}}>Users</h5>
      </div>
    </div>
  </div>

  <div class="col" >
    <div class="card" style={{border: "2px  solid " ,borderRadius: "20px",width: "500px",marginLeft:'450px'}} >
    <Link to="/Deviss">
      <img src={devis} alt="devis" style={{width:200 ,marginLeft:'140px'}} />
      </Link>
      <div class="card-body">
        <h5 class="card-title" style={{marginLeft:'200px'}}>Devis</h5>
       
      </div>
    </div>
  </div>
</div>
</div>

    )
}
import React, { useState,useEffect } from "react";
import '../Navbar/Nav.css'
import API from '../Api/Api';
import  lOGO from "../assets/lOGO.JPG";
import styled from "styled-components";
import user from '../assets/user2.png'
import logOut from "../assets/Lougout.png";
import Axios from 'axios';
import { get } from "jquery";
const NavEmploye = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  
  const id = sessionStorage.getItem('userId');
  Axios.get("http://localhost:4000/getnomuser/" +id , {
    nom: nom,
    prenom:prenom
  }).then ((response) => {
    
    localStorage.setItem('nomUser',response.data[0].nom);
    localStorage.setItem('prenomuser',response.data[0].prenom) ; // nom=response.data[0].nom;
    
    setnom(response.data[0].nom)
    setprenom(response.data[0].prenom)

      console.log(response.data[0].nom);
      console.log(response.data[0].prenom)
    })
  
  return (
    <Nav className="navb">
    <Logo href="">
    <img src={lOGO} alt="lOGO" className="logoF"/>
      <p style={{marginLeft:"75px",marginTop:"-60px"}}> Froid<span>industriel </span> </p>
    </Logo>
    <Hamburger onClick={() => setIsOpen(!isOpen)}>
      <span />
      <span />
      <span />
    </Hamburger>
    <Menu isOpen={isOpen}>
      <MenuLink href="/Account_User">Accueil</MenuLink>
      <MenuLink href="/Project-list">Projets</MenuLink>
     
      <MenuLink href="/Client">Clients</MenuLink>
      </Menu>
      <div class="navbar">
 
  <div class="dropdown">
    <button class="dropbtn" > <input className='User' value={nom+ ' ' +prenom}  readonly ></input>
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <a href="/Profil"> <img src={user} alt={user} style={{width:"20px",marginTop:"-2px",justifycontent: "space-between"}} className="user"></img>Profil</a>
      <a href="/"><img src={logOut} alt={logOut} style={{width:"20px",marginTop:"-4px",justifycontent: "space-between"}} className="logout"/>Déconnecter</a>

    </div>
  </div>
</div>
    </Nav>
  );
};

export default NavEmploye;

const MenuLink = styled.a`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #67bc98;
  transition: all 0.3s ease-in;
  font-size: 0.9rem;
  &:hover {
    color: gray;
  }
`;

const Nav = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color:black;
  
`;

const Logo = styled.a`
  padding: 1rem 0;
  color: white;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;
 
  span {
    font-weight: 300;
    font-size: 1.3rem;
  }
  &:hover {
    color: gray;
  }

`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
    width: 100%;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background: #7b7fda;
    margin-bottom: 4px;
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;

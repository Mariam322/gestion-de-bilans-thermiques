import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from "./Login/login.component";
import SignIn from './NewUser/signup.component';
import ForgetPassword from './ForgetPassword/forgetPass.component';
import PrivateRoute from './components/PrivateRoute';

import ClientForm from './Client/ClientForm.component';
import projectList from './ProjectList/ProjectList.component';
import listUser from './User/listUser.component';
import test from '../src/test';
import Account_Admin from'./Account/Account_Admin';
import Account_User from'./Account/Account_User';
import ResetPasswordPage from './ResetPassword/ResetPass';
import Mur1 from './Geometrie_de_la_chambre/Mur1';
import Mur2 from './Geometrie_de_la_chambre/Mur2';
import Mur3 from './Geometrie_de_la_chambre/Mur3';
import Mur4 from './Geometrie_de_la_chambre/Mur4';
import Plafond from'./Geometrie_de_la_chambre/Plafond';
import Profil from './Profil/Profil';
import Plancher from './Geometrie_de_la_chambre/¨Plancher';
import ville from './Ville/Ville';
import Porte from './Geometrie_de_la_chambre/Porte'
import Navbar from './Navbar/Nav'
import Produit from './Produit/Produit';
import ResumeChambre from'./ResumeChambre/ResumeChambre'
import Deviss from './Devis/Deviss'
import Facture from './Facture/Facture'
import Nav from './Navbar/Nav'


export default function App() {
    return (
        <Router>
            <div>
                <Switch>
               
                    <Route  exact path="/" component={ Login } />
                    <Route path="/signIn" component={ SignIn } />
                    <Route path="/forget-password" component={ ForgetPassword } />
                    <Route path="/client" component={ ClientForm } />
                    <Route path="/Project-list" component={ projectList } />
                    <Route path="/User-list" component={ listUser } />
                    <Route path="/test" component={ test } />
                    <Route path="/Account_Admin"  component={ Account_Admin } />
                    <Route path="/Account_User"  component={ Account_User } />
                    <Route path="/Profil" component={ Profil } />
                    <Route path="/ResetPassword" component={ ResetPasswordPage }/>
                    <Route path="/ville" component={ ville }/>
                    <Route path="/Mur_1" component={ Mur1 }/>
                    <Route path="/Mur_2" component={Mur2}/>
                    <Route path="/Mur_3" component={ Mur3 }/>
                    <Route path="/Mur_4" component={ Mur4 }/>
                    <Route path="/Plafond" component={ Plafond }/>
                    <Route path="/Plancher" component={ Plancher }/>
                 <Route path="/Porte" component={ Porte }/>
                 <Route path="/Produit" component={ Produit }/>
                 <Route path="/ResumeChambre" component={ ResumeChambre }/>
              

                 <Route path="/Deviss" component={ Deviss }/>
                 <Route path="/Facture" component={ Facture }/>
                 <Route path="/Nav" component={ Nav }/>

                    
                 
                  
                </Switch>
                
            </div>
        </Router>
    )
}

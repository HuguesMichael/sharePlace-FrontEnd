import React,{useContext} from "react";
import "./LiensNavigation.css"; // Importation du fichier CSS
import { NavLink } from "react-router-dom"; // Importation de NavLink pour la navigation  
import { AuthContext } from "../context/auth-context"; // Importation du contexte d'authentification

const LiensNavigation = props => {  
    const auth = useContext(AuthContext); // Utilisation du contexte d'authentification
    return (
        <ul className="liens-navigation">
            <li className="liens-navigation__element">
                <NavLink to="/" exact> 
                   Tous les Utilisateurs
                </NavLink>
            </li>
            {auth.isLoggedIn && ( // Si l'utilisateur est connecté ce lien s'affiche "/u1/places/"
            <li className="liens-navigation__element">
                <NavLink to={`utilisateur/${auth.userId}/places/`} exact> 
                    Mes lieux    
                </NavLink>
            </li>)}
            {auth.isLoggedIn && ( // Si l'utilisateur est connecté ce lien s'affiche    
            <li className="liens-navigation__element">
                <NavLink to="/places/nouvelle" exact> 
                    Ajouter lieu
                </NavLink>
            </li>)}
            {!auth.isLoggedIn && ( // Si l'utilisateur n' est connecté pas ce lien s'affiche
            <li className="liens-navigation__element">
                <NavLink to="/authentification" exact> 
                    Authentification
                </NavLink>
            </li>)}
            {auth.isLoggedIn && ( // Si l'utilisateur est connecté ce lien s'affiche
            <li>
                <button className="liens-navigation__element" onClick={auth.logout}> 
                    Déconnexion
                </button>
            </li>)}
        </ul>
    );
} 

export default LiensNavigation;
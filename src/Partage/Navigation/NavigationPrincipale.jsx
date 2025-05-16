import React,{useState} from "react";
import EntetePrincipale from "./EntetePrincipale";
import "./NavigationPrincipale.css"; // Importation du fichier CSS
import { Link } from "react-router-dom"; // Importation de Link pour la navigation
import LiensNavigation from "./LiensNavigation"; // Importation du composant LiensNavigation
import TiroirLateral from "./TiroirLateral";
import ToileFond from "../composants/UIElements/ToileFond"; // Importation du composant ToileFond
const NavigationPrincipale = props => {      
    const [TiroirEstOuvert, setTiroirEstOuvert] = useState(false); // État pour gérer l'ouverture et la fermeture du tiroir latéral
    const TiroirOuvert = () => {
        setTiroirEstOuvert(true); // Ouvre le tiroir latéral
    }  
     
    const TiroirFerme = () => {
        setTiroirEstOuvert(false); // Inverse l'état du tiroir
    }
    return (
        <React.Fragment>
        {TiroirEstOuvert && <ToileFond onClick={TiroirFerme}/>} {/* Toile de fond pour fermer le tiroir latéral */}
        <TiroirLateral show={TiroirEstOuvert} onClick={TiroirFerme}> 
            <nav className="navigation-principae-tiroir-nav">
            <LiensNavigation/> {/* Utilisation du composant LiensNavigation */}
            </nav>
        </TiroirLateral>  
       
        <EntetePrincipale>
           <button className="navigation-principale__button" onClick={TiroirOuvert}> 
            <span />
            <span />    
            <span />
           </button>
              <h1 className="navigation-principale__titre">
               VosPlaces
                </h1>
              <nav className="navigation-principale__navigation-nav">

                    <LiensNavigation /> {/* Utilisation du composant LiensNavigation */}
                
                </nav>
        </EntetePrincipale>
        </React.Fragment>
    ); 
}

export default NavigationPrincipale;
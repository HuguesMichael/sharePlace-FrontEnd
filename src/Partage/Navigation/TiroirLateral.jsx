import React,{useRef} from "react";
import "./TiroirLateral.css"; // Importation du fichier CSS
import ReactDOM from "react-dom"; // Importation de ReactDOM pour le rendu du composant
import {CSSTransition} from 'react-transition-group'; // Importation de react-transition-group si nécessaire

const TiroirLateral = props => { 
    const nodeRef = useRef(null); 
    const contenuTiroir = 
    <CSSTransition 
    in={props.show} timeout={200} 
    classNames="slide-in-left" // Animation de transition sont définies dans le fichier CSS index.css
    mountOnEnter
    unmountOnExit
    nodeRef={nodeRef} // Référence au nœud DOM pour la transition
    > 
    <aside className="tiroir-lateral" onClick={props.onClick}>{props.children}</aside>{/* Contenu du tiroir latéral, qui est passé en tant qu'enfant au composant */}
    </CSSTransition>
    
    return ReactDOM.createPortal(contenuTiroir, // Contenu du tiroir latéral
        document.getElementById("crochet-Tiroir") // Élément DOM où le tiroir sera monté
        );
}
export default TiroirLateral;
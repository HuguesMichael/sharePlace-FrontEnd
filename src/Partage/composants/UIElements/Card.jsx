import react from 'react';
import "./Card.css"; // Importation du fichier CSS
const Card = props => {
    return (
        <div className={`card ${props.className}`} style={props.style}>
            {props.children}
        </div>
    );
}
export default Card; // Exportation du composant Card
import react from "react";
import "./ItemUtilisateur.css"; // Importation du fichier CSS
import Avatar from "../../Partage/composants/UIElements/Avatar"; // Importation du composant Avatar
import { Link } from "react-router-dom"; // Importation de Link pour la navigation
import Card from "../../Partage/composants/UIElements/Card"; // Importation du composant Card
// Importation de la feuille de style CSS pour le composant ItemUtilisateur
const ItemUtilisateur = props => {
    return (
        <li className="item-utilisateur" >
            {/* Utilisation de Link pour naviguer vers la page de l'utilisateur */}
            <Card className="item-utilisateur__content">
            <Link to={`utilisateur/${props.id}/places`} className="item-utilisateur__link">
            <div className="item-utilisateur__image">
                <Avatar image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.nom} />
            </div>
            <div className="item-utilisateur__info">
               <a href=""><h2>{props.nom}</h2></a> 
                <h3>{props.nombreDePlaces} {props.nombreDePlaces <=1? "place" :"places"}</h3>
                {/* Ajoutez ici d'autres informations sur l'utilisateur */}
            </div>
            </Link>
            </Card>
        </li>
    );
}
export default ItemUtilisateur;
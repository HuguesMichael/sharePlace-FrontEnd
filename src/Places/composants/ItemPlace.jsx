import react,{useState,useContext} from "react";
import "./ItemPlace.css";
import { useHistory } from "react-router-dom"; // Importation de useHistory pour la navigation
import Card from "../../Partage/composants/UIElements/Card";
import Button from "../../Partage/composants/FormElements/Button";
import Modal from "../../Partage/composants/UIElements/Modal";
import ErrorModal from "../../Partage/composants/UIElements/ErrorModal";
import LoadingSpinner from "../../Partage/composants/UIElements/LoadingSpinner"; // Importation du composant de chargement
import { useHttpClient } from "../../Partage/hooks/http-hook"; 
import React from "react";
import Map from "../../Partage/composants/UIElements/Map"; // Importation du composant Map
import { AuthContext } from "../../Partage/context/auth-context"; // Importation du contexte d'authentification


const ItemPlace = props => {
    const history = useHistory(); // Utilisation de useHistory pour la navigation
    const auth=useContext(AuthContext); // Utilisation du contexte d'authentification
    const {isLoading, error, sendRequest, clearError} = useHttpClient(); // Utilisation du hook pour les requêtes HTTP
    const [VoirCarte, setVoirCarte] = useState(false); // Etat pour afficher ou masquer le modal
    const [VoirConfirmationModal, setVoirConfirmationModal] = useState(false); // Etat pour afficher ou masquer le modal de suppression
     // Logique pour modifier la place   
     const ouvrirCarteHandler = () => {
        setVoirCarte(true); // Ouvre le modal
    };
    const fermerCarteHandler = () => { 
        setVoirCarte(false); // Ferme le modal
    }
    // Logique pour supprimer la place
    const ouvrirConfirmationModalHandler = () => {  
        setVoirConfirmationModal(true); // Ouvre le modal de suppression

    };
    const fermerConfirmationModalHandler = () => {
        setVoirConfirmationModal(false); // Ferme le modal de suppression

    }
    const confirmerSuppressionHandler =  async () => {
        setVoirConfirmationModal(false);
        try {
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`, 
                'DELETE',
                {
                 Authorization: 'Bearer ' + auth.token // on envoie le token d'authentification pour vérifier que l'utilisateur est bien authentifié  
                }
                   ); // Envoie une requête DELETE pour supprimer la place
            props.onDelete(props.id); // Appelle la fonction de suppression passée en props
           // history.push(`/utilisateur/${auth.userId}/places`);
        } catch (err) {
            
        }
      

    }

     return <React.Fragment>  
        <ErrorModal error={error} onClear={clearError} /> {/* Affiche le modal d'erreur si une erreur se produit */}
       
    <Modal
        show={VoirCarte} // Affiche le modal si l'état est vrai
        onCancel={fermerCarteHandler} // Ferme le modal lorsque l'utilisateur clique en dehors de celui-ci
        header={props.address} // Titre du modal
        footer={<Button inverse onClick={fermerCarteHandler}>FERMER</Button>} // Bouton pour fermer le modal    
        contentClass="item-place__modal-content" // Classe CSS pour le contenu du modal
        headerClass="item-place__modal-header" // Classe CSS pour l'en-tête du modal
        footerClass="item-place__modal-actions" // Classe CSS pour le pied de page du modal
        > {/* Affichage de la carte sans utiliser le composant Map  mais plutot une iframe */}
         <div className="map-container" style={{padding:"5px"}}>
          <iframe title="map" width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
          src={'https://maps.google.com/maps?q=' + props.coordonnees.lat.toString() + ',' + props.coordonnees.lng.toString() + '&t=&z=15&ie=UTF8&iwloc=&output=embed'}>
         </iframe><script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=5a33be79e53caf0a07dfec499abf84b7b481f165'></script>
        </div>
        {/* Utilisation du composant Map pour afficher la carte 
          mais une erreur s'affiche dans la console: "Uncaught TypeError: Cannot read properties of undefined (reading 'Map')"
          Il faut s'assurer que la bibliothèque OpenLayers est correctement importée et que le composant Map est bien configuré.
        */}
        {/*<div className="map-container" >
          <Map center={props.coordonnees} zoom={16} /> 
        </div>*/}

        </Modal>

        <Modal
        show={VoirConfirmationModal} // Affiche le modal si l'état est vrai
         onCancel={fermerConfirmationModalHandler} // Ferme le modal lorsque l'utilisateur clique en dehors de celui-ci
        header="Etes vous sûr(e)?"  // Titre du modal
        footer={<React.Fragment>
                 <Button inverse onClick={fermerConfirmationModalHandler}>NON</Button>
                 <Button danger onClick={confirmerSuppressionHandler}>OUI</Button> 
                 </React.Fragment> 
                 }     
        contentClass="item-place__modal-content" // Classe CSS pour le contenu du modal
        headerClass="item-place__modal-header" // Classe CSS pour l'en-tête du modal
        footerClass="item-place__modal-actions" // Classe CSS pour le pied de page du modal
        > 
           <h1> Voulez-Vous vraiment supprimer cette place?</h1>
        </Modal>
        
     <li className="item-place">  
    <Card className="item-place__card"> 
    {isLoading && <LoadingSpinner asOverlay />} {/* Affiche le spinner de chargement si isLoading est vrai */}
    {/* Modal pour afficher la carte */}
        <div className="item-place__image">
            <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.title} /> 
        </div>
        <div className="item-place__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
        </div>
        <div className="item-place__actions">
            <Button inverse onClick={ouvrirCarteHandler} >VOIR SUR LA CARTE</Button> 
            {auth.userId===props.creatorId &&<Button to={`/places/${props.id}`}>Modifier</Button>}
            {auth.userId===props.creatorId &&<Button danger onClick={ouvrirConfirmationModalHandler}> Supprimer</Button>}
            </div>
        </Card>
    </li>
    </React.Fragment>; 
}

export default ItemPlace;
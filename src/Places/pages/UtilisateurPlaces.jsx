import React, {useState,useEffect} from "react";
import ListePlaces from "../composants/ListePlaces";
import {useParams} from "react-router-dom";
import { useHttpClient } from "../../Partage/hooks/http-hook"; // Importation du hook pour les requêtes HTTP
//import { AuthContext } from "../../Partage/context/auth-context"; // Importation du contexte d'authentification
//import { useContext } from "react"; // Importation de useContext pour utiliser le contexte d'authentification
import ErrorModal from "../../Partage/composants/UIElements/ErrorModal";
import LoadingSpinner from "../../Partage/composants/UIElements/LoadingSpinner"; // Importation du composant de chargement

const UtilisateurPlaces = () => {
    //const [places, setPlaces] = useState([]);
    const {userId} = useParams(); // Récupération de l'ID de l'utilisateur à partir des paramètres de l'URL
    const {isLoading, error, sendRequest, clearError} = useHttpClient(); // Utilisation du hook pour les requêtes HTTP
    //const auth = useContext(AuthContext); // Utilisation du contexte d'authentification
    const [loadedPlaces, setLoadedPlaces] = useState([]); // État pour stocker les places chargées
    useEffect(() => {
    const fetchPlaces = async () => {
    try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`); // Requête pour récupérer les places de l'utilisateur
        setLoadedPlaces(responseData.places); // Mise à jour de l'état avec les places récupérées
    } catch (error) {
        }
        }
        fetchPlaces(); // Appel de la fonction pour charger les places
    },[sendRequest, userId]); // Dépendances du useEffect pour recharger les places si l'utilisateur change
   
     const deletePlaceHandler = (deletedPlaceId) => {
        setLoadedPlaces((prevPlaces) => prevPlaces.filter(place => place.id !== deletedPlaceId)); // Mise à jour de l'état pour supprimer la place supprimée
    }

    return <React.Fragment>
         <ErrorModal error={error} onClear={ clearError}/>
      {isLoading && (
        <div className="center">
            <LoadingSpinner asOverlay />
        </div> ) }
       
     {!isLoading && loadedPlaces && <ListePlaces
        items={loadedPlaces}
        onCreatePlace={() => {}}
        onDeletePlace={deletePlaceHandler} // Fonction de suppression passée en props
        onEditPlace={() => {}}
        onViewMap={() => {}} 
        />}
        </React.Fragment>
}   

export default UtilisateurPlaces;
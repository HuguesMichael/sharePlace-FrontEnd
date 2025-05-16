import React, {useEffect, useState} from 'react';
import ListeUtilisateurs from '../composants/ListeUtilisateurs'; // Importation du composant ListeUtilisateurs
import ErrorModal from '../../Partage/composants/UIElements/ErrorModal';
import LoadingSpinner from '../../Partage/composants/UIElements/LoadingSpinner';
import {useHttpClient} from '../../Partage/hooks/http-hook'; // Importation du hook useHttpClient
const Utilisateur = () => {
  
  const [loadedUsers, setloadedUsers] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient(); // Utilisation du hook useHttpClient
  useEffect(()=>{   // Il n'est pas conseillé d'utiliser async directement dans le fonction parmètre de useEffect
     const fetchUsers = async () => {
     try {
           const donneesResponse=  await sendRequest(process.env.REACT_APP_BACKEND_URL+"/users/");
             setloadedUsers(donneesResponse.users);
     } catch (error) {
     
     }}
     fetchUsers(); // Appel de la fonction fetchUsers
     
    } ,[sendRequest]); // Le tableau de dépendances est vide, donc useEffect ne s'exécute qu'une seule fois lors du premier rendu du composant

 
  return (
   <React.Fragment>
     <ErrorModal error={error} onClear={clearError}/>
      {isLoading&& 
      <div className="center ">
         <LoadingSpinner asOverlay/>
       </div>}
{!isLoading && loadedUsers && <ListeUtilisateurs utilisateurs={loadedUsers}/>}
   </React.Fragment>
  );
}
export default Utilisateur;
import React from "react";
import "./ListeUtilisateurs.css"; // Importation du fichier CSS
import ItemUtilisateur from "./ItemUtilisateur"; // Importation du composant ItemUtilisateur
import Card from "../../Partage/composants/UIElements/Card";
 // Importation du composant Card

const ListeUtilisateurs = props => {   
  if(props.utilisateurs.length === 0) {
    return <Card>
       <h2 className="liste-utilisateurs__fallback">Aucun utilisateur trouvé.</h2>
         </Card>
    ;
  }
  return (
    <ul className="liste-utilisateurs">
      {props.utilisateurs.map(utilisateur => (
          <ItemUtilisateur
            key={utilisateur.id}
            id={utilisateur.id}
            nom={utilisateur.nom}
            image={utilisateur.image}
            nombreDePlaces={utilisateur.places.length}
            // Ajoutez ici d'autres informations sur l'utilisateur
          />
    
      ))}
    </ul>
  );
}
export default ListeUtilisateurs;
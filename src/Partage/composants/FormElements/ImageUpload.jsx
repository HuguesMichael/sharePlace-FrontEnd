import React, { useRef, useState, useEffect } from "react";
import "./ImageUpload.css"; // Importation du fichier CSS
import Button from "./Button"; // Importation du composant Button

const ImageUpload = props => {
    const fichierChoisiRef = useRef(); // Création d'une référence pour l'input de type file
    const [imageChoisie, setImageChoisie] = useState(); // État pour stocker l'image choisie
    const [previewUrl, setPreviewUrl] = useState(); // État pour stocker l'URL de prévisualisation de l'image
    const [isValid, setIsValid] = useState(false); // État pour valider l'image choisie


    const ChoisirHandler = event => { // Fonction pour gérer le moment où l'utilisateur choisit une image
        let fichierSelectionne; // Variable pour stocker le fichier choisi
        let fileIsValid = false; // Variable pour valider le fichier choisi
        if(event.target.files && event.target.files.length === 1) { // Vérifie si un fichier a été choisi
             fichierSelectionne=event.target.files[0]; // Récupère le fichier choisi
            setImageChoisie(fichierSelectionne); // Met à jour l'état avec le fichier choisi
            setIsValid(true); // Met à jour l'état de validité
            fileIsValid = true; // Met à jour la variable de validité
            // Sort de la fonction si un fichier est choisi
           // setPreviewUrl(URL.createObjectURL(event.target.files[0])); // Crée une URL de prévisualisation pour l'image choisie
        }
        else {
            setIsValid(false); // Met à jour l'état de validité si aucun fichier n'est choisi
            fileIsValid = false; // Met à jour la variable de validité
        }
       props.onInput(props.id, fichierSelectionne, fileIsValid); // Appelle la fonction onInput passée en props avec l'ID, le fichier choisi et la validité
    }

    useEffect(() => { // Utilise useEffect pour mettre à jour l'URL de prévisualisation lorsque l'image choisie change
        if(!imageChoisie) { // Vérifie si aucune image n'est choisie
            return; // Sort de la fonction si aucune image n'est choisie    
        }
        const fileReader = new FileReader(); // Crée un nouvel objet FileReader. Cet API est intégré dans le navigateur et permet de lire le contenu des fichiers
        fileReader.onload = () => { // Définit la fonction à exécuter lorsque le fichier est chargé
            setPreviewUrl(fileReader.result); // Met à jour l'état de l'URL de prévisualisation avec le résultat du FileReader
        }
        fileReader.readAsDataURL(imageChoisie); // Lit le fichier choisi en tant qu'URL de données
    }, [imageChoisie]); // Dépendance sur imageChoisie
        
    
    const  choisirImageHandler = () => {  
        
        fichierChoisiRef.current.click(); // Simule un clic sur l'input de type file
    } 
   
    return (
         <div className="form-control"> 
            <input // Input de type file pour sélectionner un fichier
            id={props.id}
            name={props.id} // Attribut name pour l'input
            ref={fichierChoisiRef} // Référence à l'input de type file
            type="file"
            accept=".jpg,.png,.jpeg"
            onChange={ChoisirHandler} // Appel de la fonction onInput passée en props
            style={{display:"none"}} // Masquer l'input de type file  
            /> 
            <div className={`image-upload ${props.center && "center"}`}>
                <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl} alt="Aperçu" />}
                    {!previewUrl && <p>Veuillez choisir une image.</p>}
               </div> 
            </div>
            <Button type="button" inverse onClick={choisirImageHandler}>Choisir une image</Button> {/* Appel de la fonction onButtonClick passée en props */}
            {!isValid && <p className="error-text">{props.error}</p>} {/* Affichage d'un message d'erreur si une erreur est présente */} 

        </div>
        
           


    )
}

export default ImageUpload; // Exportation du composant ImageUpload
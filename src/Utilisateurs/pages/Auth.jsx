import React,{useState,useContext} from 'react';
import "../../Places/pages/PlaceForm.css";
import Input from '../../Partage/composants/FormElements/Input';
import Button from '../../Partage/composants/FormElements/Button';
import ImageUpload from '../../Partage/composants/FormElements/ImageUpload';
import ErrorModal from '../../Partage/composants/UIElements/ErrorModal';
import LoadingSpinner from '../../Partage/composants/UIElements/LoadingSpinner';
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../Partage/Util/validators'; // on importe la fonction validate qui va nous permettre de valider notre input
import {useForm} from '../../Partage/hooks/Form-hooks'; // on importe le hook useForm qui va nous permettre de gérer l'état de mon formulaire
import { useHttpClient } from '../../Partage/hooks/http-hook';
import "./Auth.css";
import Card from '../../Partage/composants/UIElements/Card';
import { AuthContext } from '../../Partage/context/auth-context'; // on importe le contexte d'authentification



const Auth = () => {  
  const auth = useContext(AuthContext); // on utilise le contexte d'authentification pour gérer l'état de mon formulaire
  const [isLoginMode, setIsLoginMode] = useState(true); // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation
   const {isLoading, error, sendRequest, clearError}=useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
        { // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation
            email: { // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation   
                value: '', // valeur initiale de l'input, si elle n'est pas fournie, on met une chaîne vide
                isValid: false // validité initiale de l'input, si elle n'est pas fournie, on met false
            },
            motdepasse: { // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation
                value: '', // valeur initiale de l'input, si elle n'est pas fournie, on met une chaîne vide
                isValid: false // validité initiale de l'input, si elle n'est pas fournie, on met false
            },   
        }, // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation
        false // on initialise l'état de mon formulaire avec les inputs et la validité
    ); // on utilise le hook useForm pour gérer l'état de mon formulaire

    const swicthModeHandler = () => { // fonction qui va gérer le changement de mode entre connexion et inscription
      if(!isLoginMode){ // si le mode de connexion est faux
            setFormData( 
              {
                ...formState.inputs, // on utilise le spread operator pour garder l'état précédent et mettre à jour la valeur
                nom: undefined,
                image: undefined // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation
            },
              formState.inputs.email.isValid && formState.inputs.motdepasse.isValid
              // on met à jour la validité de mon formulaire
            )} else{

            setFormData( // on met à jour l'état de mon formulaire
              {
                ...formState.inputs, // on utilise le spread operator pour garder l'état précédent et mettre à jour la valeur
                nom: { // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation
                    value: '', // valeur initiale de l'input, si elle n'est pas fournie, on met une chaîne vide
                    isValid: false // validité initiale de l'input, si elle n'est pas fournie, on met false
                },
                image: { // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation
                    value: null, // valeur initiale de l'input, si elle n'est pas fournie, on met une chaîne vide
                    isValid: false // validité initiale de l'input, si elle n'est pas fournie, on met false
                }
              },
              false // on initialise l'état de mon formulaire avec les inputs et la validité
            ) // on utilise le hook useForm pour gérer l'état de mon formulaire
            }
      
         setIsLoginMode(prevMode => !prevMode); // on inverse le mode de connexion
      
        }
    
    const compteSubmitHandler = async event => { // fonction qui va gérer la soumission de mon formulaire
        event.preventDefault(); // on empêche le comportement par défaut du formulaire
        // on va récupérer les valeurs de mon formulaire et les envoyer à mon API en backend
       
    

      if(isLoginMode){
        /*------------------------------ Code pour login ------------------------*/    
        try {
         const donneesResponse= await sendRequest(
            process.env.REACT_APP_BACKEND_URL+"/users/login",
            'POST',
            {
             'Content-Type': 'application/json'// sans ceci notre backend ne saura pas quel type de données il reçoit
           },
           JSON.stringify({
             email:formState.inputs.email.value,
             motdepasse: formState.inputs.motdepasse.value
           })
        )
            auth.login(donneesResponse.userId, donneesResponse.token); // on utilise le hook useContext pour gérer l'état de mon formulaire
          
        } catch (err) {
          //console.log(error);
        }  
      } else{
        /*------------------------------ Code pour signup ------------------------*/
        try {
          // ici on n' a pas utilisé le format JSON car on envoie une image
        // donc on utilise le format FormData pour envoyer les données du formulaire
        // c'est une API deja intégrée dans le navigateur qui nous permet de créer un objet FormData

          const formData = new FormData(); // on crée un nouvel objet FormData pour envoyer les données du formulaire
          formData.append('email', formState.inputs.email.value); // on ajoute l'email à l'objet FormData
          formData.append('nom', formState.inputs.nom.value); // on ajoute le nom à l'objet FormData
          formData.append('motdepasse', formState.inputs.motdepasse.value); // on ajoute le mot de passe à l'objet FormData 
          formData.append('image', formState.inputs.image.value); // on ajoute l'image à l'objet FormData
        
          const donneesResponse=  await sendRequest(
            process.env.REACT_APP_BACKEND_URL+"/users/signup",   // fetch === Aller chercher
            'POST',
            undefined, // on ne met pas de headers car on envoie une image
            formData // on envoie l'objet FormData à notre API
           )
           auth.login(donneesResponse.userId, donneesResponse.token); // on utilise le hook useContext pour gérer l'état de mon formulaire
        } catch (err) {
          
          //console.log(error);
        }
       } 
     
       
    } 
   

    return <React.Fragment>
      <ErrorModal error={error} onClear={ clearError}/>
      <Card className="authentication"> {/* on utilise la classe auth pour styliser mon formulaire */}
        {isLoading&&<LoadingSpinner asOverlay/>}
        {isLoginMode ? <h2> Connexion obligatoire </h2> : <h2> Inscription obligatoire </h2>} {/* on affiche le titre en fonction du mode de connexion */}
     <form className="place-form" onSubmit={compteSubmitHandler} 
        > 
       { !isLoginMode && <Input
         id="nom"
          element="input" 
          type="text" 
          label="Nom*"
           placeholder="Votre nom" 
            validators={[VALIDATOR_REQUIRE]} // ceci est un tableau de validations. Ici nous validons que le champ taille au moins 5 caractères
            errorText="Veuillez entrer un nom valide" // message d'erreur si l'utilisateur ne respecte pas la validation
            onInput={inputHandler} // onInput est une fonction qui sera appelée lors de la saisie de l'utilisateur
          />}
          {!isLoginMode && <ImageUpload center id="image" onInput={inputHandler}/>}
        <Input
         id="email"
          element="input" 
          type="email" // type de l'input, ici c'est un email
          label="E-mail*"
           placeholder="Votre email" 
            validators={[VALIDATOR_EMAIL]} // ceci est un tableau de validations. Ici nous validons que le champ est requis
            errorText="Veuillez entrer une adresse email valide" // message d'erreur si l'utilisateur ne respecte pas la validation
            onInput={inputHandler} // onInput est une fonction qui sera appelée lors de la saisie de l'utilisateur
          />
           <Input
          id="motdepasse"
          element="input"
          type="password" // type de l'input, ici c'est un mot de passe 
          label="Mot de passe*"
           placeholder="Mot de passe" 
            validators={[VALIDATOR_MINLENGTH(8)]} // ceci est un tableau de validations. Ici nous validons que le champ taille au moins 5 caractères
            errorText="Veuillez entrer un mot de passe (au moins 8 caractères)" // message d'erreur si l'utilisateur ne respecte pas la validation
            onInput={inputHandler} // onInput est une fonction qui sera appelée lors de la saisie de l'utilisateur
            // onInput est une fonction qui sera appelée lors de la saisie de l'utilisateur
          />
           <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode?'CONNEXION':'INSCRIPTION'}
           </Button>  
           </form>
          <React.Fragment> 
          {isLoginMode && <a href="/motPasseOublie">Mot de passe oublié </a>} 
          <Button inverse onClick={swicthModeHandler}> {/* on utilise le bouton inverse pour changer de mode */}
             SWITCH A {!isLoginMode?'CONNEXION':'INSCRIPTION'}
            </Button> {/* on utilise le bouton inverse pour changer de mode */}
            </React.Fragment>
           
        </Card>
        </React.Fragment>
}
export default Auth;
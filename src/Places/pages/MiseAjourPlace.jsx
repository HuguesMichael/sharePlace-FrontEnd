import React, { useEffect, useState } from 'react';
import "./MiseAjourPlace.css";
import "./PlaceForm.css";
import { useParams, useHistory } from 'react-router-dom';
import Input from '../../Partage/composants/FormElements/Input';
import Button from '../../Partage/composants/FormElements/Button';
import { useForm } from '../../Partage/hooks/Form-hooks'; // on importe le hook useForm qui va nous permettre de gérer l'état de mon formulaire
import Card from '../../Partage/composants/UIElements/Card';
import ErrorModal from '../../Partage/composants/UIElements/ErrorModal';
import LoadingSpinner from '../../Partage/composants/UIElements/LoadingSpinner'; // on importe le composant LoadingSpinner qui va nous permettre de gérer le chargement de notre formulaire
import { useHttpClient } from '../../Partage/hooks/http-hook';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../Partage/Util/validators'; // on importe la fonction validate qui va nous permettre de valider notre input
import { useContext } from 'react'; // on importe le hook useContext qui va nous permettre de gérer le contexte d'authentification
import { AuthContext } from '../../Partage/context/auth-context'; // on importe le contexte d'authentification  


const MiseAjourPlace = () => {
    const auth = useContext(AuthContext); // on utilise le contexte d'authentification pour gérer l'état de mon formulaire
    const history = useHistory(); // on utilise le hook useHistory pour rediriger l'utilisateur vers une autre page
    const { isLoading, error, sendRequest, clearError } = useHttpClient(); // on utilise le hook useHttpClient pour gérer les requêtes HTTP
    const [identifiedPlace, setidentifiedPlace] = useState(); // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation
    const placeId = useParams().placeId; // Récupération de l'ID de la place depuis l'URL

    {/* pour un depart on met value='' et isValid=false pour patientier que le chargement des bonnes valeurs
        depuis la base de données et une fois cela fais on utilisera setDataform pour mettre les bonnes valeurs
        on fait cela car les hooks ne peuvent pas être utilisés dans une condition, 
        donc on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation
    */}

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false // validité initiale de l'input, si elle n'est pas fournie, on met false
        },
        description: {
            value: '',
            isValid: false // validité initiale de l'input, si elle n'est pas fournie, on met false
        }
    }, false)

    useEffect(() => { // useEffect est un hook qui permet de gérer les effets de bord dans un composant fonctionnel
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`); // on envoie une requete pour recuperer la place
                setidentifiedPlace(responseData.place);
                setFormData({
                    title: {
                        value: responseData.place.title, // valeur initiale provenant de la place identifiee après la requete de selection
                        isValid: true // on met la validité de l'input à true car on a déjà une valeur valide
                    },
                    description: {
                        value: responseData.place.description, // valeur initiale provenant de la place identifiee après la requete de selection
                        isValid: true // on met la validité de l'input à true car on a déjà une valeur valide
                    }
                }, true) // on met l'état de mon formulaire à false car le chargement est terminé
                // on utilise la fonction setFormData pour mettre à jour l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation 
            } catch (err) {
            }
        }
        fetchPlace();
    }, [sendRequest, placeId, setFormData]); // on utilise le hook useEffect pour mettre à jour l'état de mon formulaire lorsque la place identifiée change

    if (isLoading) {
        return <div className='center'>
            <h2><LoadingSpinner asOverlay /></h2>
        </div>;
    }

    if (!identifiedPlace && !error) { // Si la place n'est pas trouvée, on affiche un message d'erreur
        return (
            <div className='center'>
                <Card>
                    <h2>Place non trouvée </h2>
                </Card>
            </div>
        );
    }

    const placeUpdateSubmitHandler = async event => { // fonction qui sera appelée lors de la soumission du formulaire
        event.preventDefault(); // on empêche le rechargement de la page lors de la soumission du formulaire    
        try {
            // ici on peut envoyer une requête HTTP pour mettre à jour la place dans la base de données
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`, 'PATCH', 
                { // on envoie une requete pour mettre à jour la place
                'Content-Type': 'application/json', // on envoie les données au format JSON
                 Authorization: 'Bearer ' + auth.token // on envoie le token d'authentification pour vérifier que l'utilisateur est bien authentifié
                 },
                JSON.stringify({ // on convertit les données en JSON
                    title: formState.inputs.title.value, // on récupère la valeur de l'input title
                    description: formState.inputs.description.value, // on récupère la valeur de l'input description
                }))

            history.push(`/utilisateur/${auth.userId}/places`); // on redirige l'utilisateur vers la page d'accueil après la soumission du formulaire
        } catch (error) {
        }
    }

    return (
        <React.Fragment>
            {<ErrorModal error={error} onClear={clearError} />}
            {!isLoading && identifiedPlace && <form className="place-form" onSubmit={placeUpdateSubmitHandler}> {/* onSubmit est une fonction qui sera appelée lors de la soumission du formulaire */}
                <Input
                    id="title"
                    element="input"
                    type="text" // type de l'input
                    label="Titre"
                    placeholder="Titre de la place"
                    validators={[VALIDATOR_REQUIRE()]} // ceci est un tableau de validations. Ici nous validons que le champ est requis
                    errorText="Veuillez entrer un titre valide" // message d'erreur si l'utilisateur ne respecte pas la validation
                    onInput={inputHandler} // onInput est une fonction qui sera appelée lors de la saisie de l'utilisateur
                    initialValue={formState.inputs.title.value} // valeur de l'input correspondant à la place identifiée
                    initialValid={formState.inputs.title.isValid} // validité de l'input
                />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    placeholder="Description de la place"
                    validators={[VALIDATOR_MINLENGTH(5)]} // ceci est un tableau de validations. Ici nous validons que le champ taille au moins 5 caractères
                    errorText="Veuillez entrer une description valide (au moins 5 caractères)" // message d'erreur si l'utilisateur ne respecte pas la validation
                    onInput={inputHandler} // onInput est une fonction qui sera appelée lors de la saisie de l'utilisateur
                    initialValue={formState.inputs.description.value} // valeur du textarea correspondant à la place identifiée
                    initialValid={formState.inputs.description.isValid} // validité de l'input
                />
                <Button type="submit" disabled={!formState.isValid}>Mettre à jour</Button>
            </form>}
        </React.Fragment>
    )
}
export default MiseAjourPlace;

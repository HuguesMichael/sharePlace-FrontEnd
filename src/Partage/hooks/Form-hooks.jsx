import { useCallback,useReducer } from "react";

const formReducer = (state, action) => { // fonction de mon réducteur qui va gérer l'état gnéral de mon formulaire
    switch (action.type) {  
        case 'INPUT_CHANGE':
            let formValid = true; // on cree une variable booleen que nous mettons à true
            for(const inputId in state.inputs){ // on parcourt les inputs de mon formulaire
                if(!state.inputs[inputId]){ // si l'inputId n'existe pas
                    continue; // on passe à l'itération suivante
                }
            if(inputId === action.inputId){ // si l'inputId est égal à l'inputId de l'action
            formValid = formValid && action.isValid; // on met à jour la validité de mon formulaire
        } else {
            formValid = formValid && state.inputs[inputId].isValid; // on met à jour la validité de mon formulaire
        }
    }   
            return { // on retourne un nouvel état
                ...state, // on utilise le spread operator pour garder l'état précédent et mettre à jour la valeur
                inputs: { // on met à jour les inputs de mon formulaire 
                    ...state.inputs, // on utilise le spread operator pour garder l'état précédent et mettre à jour la valeur
                    [action.inputId]: { // on met à jour l'inputId de mon formulaire  
                        value: action.value, // on met à jour la valeur de l'input
                        isValid: action.isValid // on met à jour la validité de l'input
                    }  
                },
                isValid: formValid // on met à jour la validité de mon formulaire
            };

        case 'SET_DATA': // action pour mettre à jour les données du formulaire
            return { // on retourne un nouvel état
                inputs: action.inputs, // on met à jour les inputs de mon formulaire
                isValid: action.isValid // on met à jour la validité de mon formulaire
            };
        default:
            return state; // on retourne l'état précédent
    }
}   
// le réducteur est une fonction qui prend l'état actuel et une action, et retourne un nouvel état
 export const useForm = ( initialInputs, initialFormValidity) => {
    // Utilisation de useReducer pour gérer l'état du formulaire
    const [formState, dispatch] = useReducer(formReducer, { // on utilise le hook useReducer pour gérer l'état de mon formulaire    
        inputs:initialInputs, // on initialise l'état de mon formulaire avec les inputs du formulaire qui seront necessaire pour la validation
        isValid: initialFormValidity // on initialise l'état de mon formulaire avec les inputs et la validité
    }); 
    const inputHandler = useCallback((id, value, isValid) => { // ces trois paramètres sont passés par le composant Input
        dispatch({ // on utilise la fonction dispatch pour mettre à jour l'état de mon formulaire
            type: 'INPUT_CHANGE', // type d'action
            value: value, // valeur de l'input
            isValid: isValid, // validité de l'input
            inputId: id // id de l'input
        }); // on utilise la fonction dispatch pour mettre à jour l'état de mon formulaire
    }, []); // useCallback est un hook qui permet de mémoriser une fonction et de ne pas la recréer à chaque rendu du composant
    
    const setFormData = useCallback((inputData, formValidity) => { // fonction qui permet de mettre à jour l'état de mon formulaire
        dispatch({ // on utilise la fonction dispatch pour mettre à jour l'état de mon formulaire
            type: 'SET_DATA', // type d'action
            inputs: inputData, // inputs de mon formulaire
            isValid: formValidity // validité de mon formulaire
        }); // on utilise la fonction dispatch pour mettre à jour l'état de mon formulaire
    }, []); // useCallback est un hook qui permet de mémoriser une fonction et de ne pas la recréer à chaque rendu du composant

    return [formState, inputHandler, setFormData]; // on retourne l'état de mon formulaire et la fonction inputHandler

 }
    
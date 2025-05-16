import React,{useReducer,useEffect} from 'react';
import "./Input.css";
import { validate } from '../../Util/validators'; // on importe la fonction validate qui va nous permettre de valider notre input

//fonction de mon réducteur qui va gérer l'état de mon input
// le réducteur est une fonction qui prend l'état actuel et une action, et retourne un nouvel état
const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return { 
                ...state, // on utilise le spread operator pour garder l'état précédent et mettre à jour la valeur
                value: action.val, // on met à jour la valeur de l'input
                isValid: validate(action.val, action.validators)// on met à jour la validité de l'input
            };
        case 'TOUCH':
            return { // on met à jour l'état de l'input
                ...state, // on utilise le spread operator pour garder l'état précédent et mettre à jour la valeur
                isTouched: true // on met à jour l'état de l'input
            };
        default:
            return state;
    }
}

const Input = (props) => {  
    // Utilisation de useReducer pour gérer l'état du champ d'entrée
 const [inputState, dispatch] = useReducer(inputReducer,
        {
            value:props.initialValue || '', // valeur initiale de l'input, si elle n'est pas fournie, on met une chaîne vide
            isValid: props.initialValid || false, // validité initiale de l'input, si elle n'est pas fournie, on met false
            isTouched: false // état initial du champ d'entrée
        }); 
         // useReducer est un hook qui permet de gérer l'état d'un composant de manière plus complexe que useState      // Appel de useReducer pour initialiser le réducteur
     // Le premier argument est la fonction de réducteur, le deuxième est l'état initial
    // inputState est l'état actuel du champ d'entrée, dispatch est la fonction pour mettre à jour cet état
    // inputReducer est la fonction qui gère les actions sur l'état du champ d'entrée et renvoie un nouvel état
   const {value,isValid,isTouched} = inputState; // on utilise la décomposition pour récupérer la valeur et la validité de l'input
    const {rows,id, label, type, placeholder,onInput } = props;
   // Utilisation de useEffect pour gérer les effets secondaires
    useEffect(() => { // useEffect est un hook qui permet de gérer les effets secondaires dans un composant fonctionnel
            onInput(id,value,isValid); // Appel de la fonction onInput avec l'id, la valeur et la validité du champ d'entrée    
           }, [id,value,isValid,onInput]); // Le tableau de dépendances indique quand l'effet doit être


    const changeHandler = (event) => { // Fonction de gestion des changements d'entrée
        dispatch({ // Appel de dispatch pour mettre à jour l'état
            type: 'CHANGE', // Type d'action
            val: event.target.value, // Nouvelle valeur de l'entrée
            validators: props.validators // Validateurs passés en tant que props
        });
    }
    const touchHandler = (event) => { // Fonction de gestion des événements de perte de focus
        dispatch({ // Appel de dispatch pour mettre à jour l'état
            type: 'TOUCH' // Type d'action
        });
    }


   
    const element= props.element === 'input' 
    ? (<input 
        id={id} 
        type={type} 
        placeholder={placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
        /> )
    : (<textarea 
        id={id} 
        rows={rows || 3} 
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
    
        />);
    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched &&
                'form-control--invalid'}`}>
            {/* form-control est une classe CSS qui va nous permettre de styliser notre input */}
            {/* form-control--invalid est une classe CSS qui va nous permettre de styliser notre input si il n'est pas valide */}
            {/* on utilise une expression ternaire pour ajouter la classe form-control--invalid si l'input n'est pas valide */}
            {/* on utilise une expression ternaire pour ajouter la classe form-control--invalid si l'input n'est pas valide */} 
            <label htmlFor={id} className="input-label">{label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched &&<p>{props.errorText}</p>}
        </div>
    );
}
export default Input;
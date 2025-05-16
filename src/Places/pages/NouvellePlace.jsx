import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'; // on importe le hook useHistory pour rediriger l'utilisateur vers une autre page
import "./PlaceForm.css";
import Input from '../../Partage/composants/FormElements/Input';
import Button from '../../Partage/composants/FormElements/Button';
import ImageUpload from '../../Partage/composants/FormElements/ImageUpload';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../Partage/Util/validators'; // on importe la fonction validate qui va nous permettre de valider notre input
import { useForm } from '../../Partage/hooks/Form-hooks'; // on importe le hook useForm qui va nous permettre de gérer l'état de mon formulaire
import { useHttpClient } from '../../Partage/hooks/http-hook';
import { AuthContext } from '../../Partage/context/auth-context'; // on importe le contexte d'authentification
import ErrorModal from '../../Partage/composants/UIElements/ErrorModal';
import LoadingSpinner from '../../Partage/composants/UIElements/LoadingSpinner'; // on importe le composant ErrorModal qui va nous permettre de gérer les erreurs

const NouvellePlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient(); // on utilise le hook useHttpClient pour gérer les requêtes HTTP
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      adress: {
        value: '',
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      },
      lat: {
        value: '',
        isValid: false
      },
      lng: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.adress.value);
      formData.append('image', formState.inputs.image.value);
      formData.append('lat', formState.inputs.lat.value);
      formData.append('lng', formState.inputs.lng.value);
    

      await sendRequest(
        process.env.REACT_APP_BACKEND_URL+"/places",
        "POST",
        {
          Authorization: 'Bearer ' + auth.token,
        },
        formData
      );
      history.push("/");
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input
          id="title"
          element="input"
          label="Titre"
          placeholder="Titre de la place"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Veuillez entrer un titre valide"
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          placeholder="Description de la place"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Veuillez entrer une description valide (au moins 5 caractères)"
          onInput={inputHandler}
        />
        <Input
          id="adress"
          element="input"
          label="Adresse"
          placeholder="Adresse de la place"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Veuillez entrer une adresse valide"
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
        />
        <Input
          id="lat"
          element="input"
          label="latitude"
          placeholder="latitude de la place"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Veuillez entrer une latitude valide"
          onInput={inputHandler}
        />
        <Input
          id="lng"
          element="input"
          label="longitude"
          placeholder="longitude de la place"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Veuillez entrer une longitude valide"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Ajouter
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NouvellePlace;

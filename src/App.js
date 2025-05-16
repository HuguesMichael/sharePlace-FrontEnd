import React, {Suspense} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
//import Utilisateur from './Utilisateurs/pages/Utilisateur';
//import UtilisateurPlaces from './Places/pages/UtilisateurPlaces';
//import NouvellePlace from './Places/pages/NouvellePlace'; // Importation de la page NouvellePlace
//import MiseAjourPlace from './Places/pages/MiseAjourPlace'; // Importation de la page MiseAjourPlace
import NagitionPrincipale from './Partage/Navigation/NavigationPrincipale';
//import Auth from './Utilisateurs/pages/Auth'; // Importation de la page Auth
import MotPasseOublie from './Utilisateurs/pages/MotPasseOublie';
import { AuthContext } from './Partage/context/auth-context'; // Importation du contexte d'authentification
import useAuth from './Partage/hooks/auth-hook'; // Importation du hook d'authentification
import LoadingSpinner from './Partage/composants/UIElements/LoadingSpinner';

const Utilisateur = React.lazy(() => import('./Utilisateurs/pages/Utilisateur')); 
// Importation de la page Utilisateur de manière dynamique
// Utilisation de React.lazy pour le chargement dynamique de la page Utilisateur
// Cela permet de réduire la taille du bundle initial et d'améliorer les performances de l'application
// en ne chargeant le code de la page Utilisateur que lorsque cela est nécessaire
// React.lazy est une fonction qui permet de charger des composants de manière asynchrone

const NouvellePlace = React.lazy(() => import('./Places/pages/NouvellePlace')); 
const UtilisateurPlaces = React.lazy(() => import('./Places/pages/UtilisateurPlaces'));
const MiseAjourPlace = React.lazy(() => import('./Places/pages/MiseAjourPlace'));
const Auth = React.lazy(() => import('./Utilisateurs/pages/Auth')); 

const App = () => {
  const { token, login, logout, userId } = useAuth(); // Utilisation du hook d'authentification pour récupérer le token, la fonction de connexion et de déconnexion, et l'ID utilisateur
  
  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Utilisateur />
        </Route>
        <Route path="/utilisateur/:userId/places" exact>
          <UtilisateurPlaces />
        </Route>
        <Route path="/places/nouvelle" exact>
          <NouvellePlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <MiseAjourPlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Utilisateur />
        </Route>
        <Route path="/utilisateur/:userId/places" exact>
          <UtilisateurPlaces />
        </Route>
        <Route path="/authentification" exact>
          <Auth />
        </Route>
        <Route path="/motPasseOublie" exact>
          <MotPasseOublie />
        </Route>
        <Redirect to="/authentification" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token, // !! si nous avons un token, alors ce n'est pas null mais true
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <NagitionPrincipale />
        <main>
          <div className="contenu-principal"> 
            <Suspense fallback={
              <div className='center'> 
                 <LoadingSpinner />
              </div>}>
            {routes}
            </Suspense>
            </div>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

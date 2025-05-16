import { useState, useCallback, useEffect } from 'react';

let logoutTimer; // Variable pour stocker le timer de déconnexion
// on utilise une variable globale pour stocker le timer de déconnexion
// car on ne peut pas utiliser useState pour stocker une variable qui n'est pas un état

export default function useAuth() {

const [token, setToken] = useState(null); // État pour stocker le token d'authentification
  const [userId, setUserId] = useState(null);
  const [expirationDate, setExpirationDate] = useState(); // État pour stocker la date d'expiration du token

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000*60*60); // Durée de vie du token (1 heure)
    setExpirationDate(tokenExpirationDate); // Mise à jour de la date d'expiration
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(), // Conversion de la date d'expiration en chaîne ISO
        // une chaîne ISO est une chaîne de caractères qui représente une date au format ISO 8601
        // ce format est utilisé pour représenter des dates et des heures de manière standardisée
      })
    ); // Stockage du token, de l'ID  utilisateur et de la date d'expiration dans le localStorage
  }, []);


   useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData')); // Récupération des données stockées dans le localStorage
    if (storedData && 
      storedData.token && 
      new Date(storedData.expiration) > new Date()  // Vérification de la validité du token (s'il n'est pas expiré)
    ) { 
      login(storedData.userId, storedData.token, new Date (storedData.expiration)); // Si des données sont trouvées, on appelle la fonction login
    }
  }, [login]); // On passe la fonction login comme dépendance pour éviter les avertissements de React
  // On utilise useEffect pour charger les données de l'utilisateur à partir du localStorage lors du premier rendu du composant
  // On utilise JSON.parse pour convertir la chaîne JSON en objet JavaScript

  const logout = useCallback(() => {
    setToken(null);
     setExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData'); // Suppression des données du localStorage lors de la déconnexion
  }, []);

 useEffect(() => {
    if (token && expirationDate) {
      const remainingTime = expirationDate.getTime() - new Date().getTime(); // Calcul du temps restant avant l'expiration du token
      logoutTimer = setTimeout(logout, remainingTime); // Définition d'un timer pour la déconnexion automatique
    } else {
      clearTimeout(logoutTimer); // Si le token n'est pas valide, on annule le timer
    }
  }, [token, logout, expirationDate]); // On passe le token et la fonction logout comme dépendances pour éviter les avertissements de React
  // On utilise useEffect pour gérer le timer de déconnexion automatique

return { token, login, logout, userId}; // Retourne le token, la fonction de connexion, la fonction de déconnexion, l'ID utilisateur et la date d'expiration

}
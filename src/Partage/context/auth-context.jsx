import { createContext } from "react";


// Le contexte d'authentification est créé pour gérer l'état de connexion de l'utilisateur
// je peux l'utiliser pour partager l'état de connexion entre les composants sans avoir à le passer manuellement
export const AuthContext=createContext({
    isLoggedIn: false, 
    userId: null,
    token: null,
    login: () => {}, 
    logout: () => {}
});
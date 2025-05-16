import {useState,useCallback, useRef, useEffect} from 'react';


export const useHttpClient =  ()=>{

  const [isLoading, setIsLoading] =useState(false);
  const [error, setError]=useState();
  const activeHttpRequests=useRef([]); // tableau qui va contenir tous les requêtes en cours
  // useRef ne change pas entre les re-rendus, il est persistant entre les re-rendus
  

  const sendRequest = useCallback(async (url, method='GET', headers, body=null)=>{
    let donneesResponse;
    setIsLoading(true);
    const httpAbortCtrl = new AbortController();
    activeHttpRequests.current.push(httpAbortCtrl); // on ajoute le controleur de la requete en cours dans le tableau des requetes en cours
    // on utilise le controleur pour annuler la requete si elle est en cours
   try {
   const response= await  fetch(url,{  // fetch === Aller chercher
     method, 
     body, 
     headers:headers || undefined,
     signal:httpAbortCtrl.signal // ceci permet de lier AbortController à cette requete 
    });
      donneesResponse = await response.json();
      activeHttpRequests.current= activeHttpRequests.current.filter(reqCtrl => reqCtrl!==httpAbortCtrl);
   // ceci permet de conserver tous les controleurs, à l'exception de celui qui a été utilise dans cette demande
   // Autrement dit, on supprime le controleur de la requete en cours  si elle est terminée ou interrompuee
   if(!response.ok){
    //console.log(donneesResponse.message); // on met à jour l'état d'erreur avec le message d'erreur de la réponse
    throw new Error(donneesResponse.message); 
 }   
    setIsLoading(false);
    return donneesResponse;
   } catch (err) {
    if(err.name !== 'AbortError'){
      setError(err.message);
     throw err;
     } // on ne met pas à jour l'état d'erreur si la requete a été annulée
   } finally {
    setIsLoading(false);
   }
   

  }, []);

  const clearError =()=>{
    setError(null);

  }
  useEffect(()=>{ // ceci permet d'annuler toutes les requetes en cours lorsque le composant est démonté
    return ()=>{
        activeHttpRequests.current.forEach(abortCtrl=>abortCtrl.abort());
    }
  },[]);

  return {isLoading, error, sendRequest, clearError};

};
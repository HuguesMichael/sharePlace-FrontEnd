import React,{useRef} from "react";
import "./Modal.css";
import ReactDom from 'react-dom';
import ToileFond from './ToileFond';
import {CSSTransition} from 'react-transition-group';

const ModalOverlay = props => {
    
    const contenu = (
        <div className={`modal ${props.className}`} style={props.style}>  
        <header className={`modal__header ${props.headerClass}`}>
            <h2>{props.header}</h2>
        </header>
        <form className="modal__content" onSubmit={props.onSubmit ? props.onSubmit : 
            (e) => e.preventDefault()}
        >
            <div className={`modal__content ${props.contentClass}`}>
                {props.children} {/* Contenu du modal, passé en tant qu'enfant */}
            </div>
        </form>
        <footer className={`modal__footer ${props.footerClass}`}>
            {props.footer}
            
        </footer>
        </div>
    )
    return  ReactDom.createPortal(contenu, document.getElementById('crochet-Modal')) // On utilise createPortal pour créer un portail qui permet de rendre le contenu du modal dans un autre endroit du DOM, ici dans l'élément avec l'id 'crochet-Modal';  
    }

const Modal = props => {  
    const nodeRef = useRef(null); 
    return <React.Fragment>
        {props.show && <ToileFond onClick={props.onCancel} />} {/* Si props.show est vrai, on affiche le fond */}
        <CSSTransition 
            in={props.show} 
            timeout={200} 
            classNames="modal" 
            mountOnEnter 
            unmountOnExit
            nodeRef={nodeRef} // Référence au nœud DOM pour la transition
        ><ModalOverlay {...props} /></CSSTransition> {/* ...props permet de passer tous les props de Modal à ModalOverlay */}
            
    </React.Fragment>
    
}
export default Modal;
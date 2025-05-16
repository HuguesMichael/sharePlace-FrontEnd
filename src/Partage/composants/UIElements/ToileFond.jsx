import React from 'react';
import ReactDOM from 'react-dom';
import './ToileFond.css';

 const ToileFond = props => { 
  return ReactDOM.createPortal(
    <div className="ToileFond" onClick={props.onClick}></div>,
    document.getElementById('crochet-ToileFond')
  );
}
export default ToileFond ;

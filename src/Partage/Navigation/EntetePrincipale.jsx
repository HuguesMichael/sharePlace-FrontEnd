import React from "react";
import "./EntetePrincipale.css"; // Importation du fichier CSS

const EntetePrincipale = props => {
    return (
        <header className="entete-principale">
            {props.children}
        </header>
    );
}

export default EntetePrincipale;
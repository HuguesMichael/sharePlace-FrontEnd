import "./ListePlaces.css";
import Card from "../../Partage/composants/UIElements/Card";
import ItemPlace from "./ItemPlace";
import Button from "../../Partage/composants/FormElements/Button";

const ListePlaces = props => {
    if(props.items.length === 0) { 
      return <div className="liste-places-center">
        <Card>
          <h2>Aucune place trouvée. Voulez-vous en creer une?</h2>
          <Button inverse to="/places/nouvelle">Partager une place</Button>  
        </Card>
        </div>;
    }
    return (
        <ul className="liste-places">
            {props.items.map(place => {
                return (
                    <ItemPlace
                        key={place.id}
                        id={place.id}
                        image={place.image}
                        title={place.title}
                        description={place.description}
                        address={place.address}
                        creatorId={place.creator}
                        coordonnees={place.localisation}
                        onDelete={props.onDeletePlace} // Fonction de suppression passée en props
                    />
                );
            })}
        </ul>
    );
                    
}
export default ListePlaces;
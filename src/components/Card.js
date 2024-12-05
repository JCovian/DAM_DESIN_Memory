import cardReversed from '../img/card-reversed.jpg';

export const Card = ({ card, onClick }) => {

    //Ruta donde están las imagenes, asi el JSON solo tiene el nombre del fichero
    const loadImage = require.context('../img', true);

    return (
        <div className="col border-1 pb-4">
            <div className="card" style={{ width: "14rem", cursor: "pointer" }} onClick={ onClick }>
                <img src={
                    //Si la carta está volteada o emparejada muestra el anverso, en caso contrario el reverso
                    card.flipped || card.matched ? loadImage(`./${card.imagen}.jpg`) : cardReversed } className="card-img-top" alt="Imagen de carta" />
            </div>
        </div>
    )
};
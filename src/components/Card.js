import React from 'react'
import cardReversed from '../img/card-reversed.jpg'

export const Card = ({id, type, img, flipCard}) => {
    return (
        <div className="col border-1 pb-4">
            <div className="card" style={{ width: "18rem" }}>
                <img src={ img } class="card-img-top" alt="Imagen de carta" />
            </div>
        </div>
    )
}

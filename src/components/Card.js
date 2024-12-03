import React from 'react'
import cardReversed from './img/card-reversed.jpg'

export default function card() {
  return (
    <div className="col border-1">
        <div className="card" style={{ width: "18rem" }}>
        <img src={cardReversed} class="card-img-top" alt="Imágen de carta" />
        </div>
    </div>
  )
}

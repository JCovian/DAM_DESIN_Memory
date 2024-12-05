import { useEffect, useState } from 'react';
import { Card } from './components/Card';
import { MixCards } from './helpers/MixCards';
import cardsData from './json/Baraja.json';

function App() {

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  //const [newFlippedCards, setNewFlippedCards] = useState([]);
  //const [newCard, setNewCard] = useState([]);
  const [matchedCouples, setMatechedCouples] = useState(0);

  //Inicializa y baraja las cartas al montar el componente
  useEffect(() => {
    const mixedCards = MixCards([...cardsData]);
    setCards(mixedCards);
    //console.log(cards);
  }, []);

  //Muestra un mensaje al completar el juego
  useEffect(() => {
    if (matchedCouples === (cards.length / 2) && (cards.length > 0)) {
      alert("¡FELICIDADES! Has completado el juego");
    }
  }, [matchedCouples]);

  //Verifica que las dos cartas volteadas coinciden
  /*
  useEffect(() => {
    if(flippedCards.length === 2) {
      if(flippedCards[0].tipo === flippedCards[1].tipo) {
        console.log("MATCH");
        setTimeout(() => matchCards(flippedCards), 1000);
      } else {
        console.log("Cartas recien volteadas:" + flippedCards);
        console.log("NO MATCH");
        setTimeout(() => unflipCards(flippedCards), 1000);
      }
    }
  },[flippedCards, cards])*/

  
  /* Manejador del clic */
  const handleCardClick = (card) => {
    //Evita que más de dos cartas se volteen a la vez o que las volteadas ya esté emparejadas
    console.log("handle flippedArray length=>" + flippedCards.length);

    if (flippedCards.length === 2 || card.flipped || card.matched) return;

    console.log("Entra en la lógica del manejador");

    //Añade carta recién volteada
    const newFlippedCards = [...flippedCards, card];
    //setFlippedCards((c) => [...c, card])
    //setNewFlippedCards = [...flippedCards, card];
    //Le cambia flipped a true a esta carta (card)
    const newCard = cards.map(c => c.id === card.id ? { ...c, flipped: true } : c);
    setFlippedCards(newFlippedCards);
    setCards(newCard);

    //console.log(card);
    //console.log("Cambia flipped a true: ");
    //console.log(cards);
    //console.log(flippedCards);
    
    if(newFlippedCards.length === 2) {
      if(newFlippedCards[0].tipo === newFlippedCards[1].tipo) {
        console.log("MATCH");
        setTimeout(() => matchCards(newFlippedCards), 1000);
      } else {
        console.log("Cartas recien volteadas:" + newFlippedCards);
        console.log("NO MATCH");
        setTimeout(() => unflipCards(newFlippedCards), 1000);
      }
    }
  };

  const matchCards = (flippedCards) => {
    const newCard = cards.map(c => flippedCards.includes(c) ? {...c, matched: true } : c);
    setCards(newCard);
    setFlippedCards([]);
    setMatechedCouples(matchedCouples + 1);
  };

  const unflipCards = (flippedCards) => {
    const newCard = cards.map(c => flippedCards.includes(c) ? { ...c, flipped: false } : c);
    setCards(newCard);
    setFlippedCards([]);
  };
  

  return (
    <div className="container-fluid">

      { /*Cabecera*/}
      <header className="text-center border-bottom py-2 my-2">
        <h1>Memory Card App V0.1α</h1>
        <h3>Parejas logradas: {matchedCouples}</h3>
        {/*<button>REINICIAR</button>*/}
      </header>

      {/* Tablero */}
      <section className="container mt-1 text-center">
        <div className="row row-cols-lg-4 row-cols-md-4 row-cols-2" >
          { /*Cartas*/}
          {
            cards.map((card) => (
              <Card key={ card.id } card={ card } onClick={ () => handleCardClick (card) } />
            ))
          }
        </div>

      </section>

      { /*Pie de página*/}
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="mb-0 text-muted">&copy; 2024 JCovian</p>
        <p className="mb-0 text-muted">Módulo Diseño de Interfaces - DAM Distancia CIFP Avilés</p>
      </footer>

    </div>
  );
};

export default App;
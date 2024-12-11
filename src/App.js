import { useEffect, useState } from 'react';
import { Card } from './components/Card';
import { MixCards } from './helpers/MixCards';
import cardsData from './json/Baraja.json';

function App() {

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCouples, setMatechedCouples] = useState(0);
  const [tries, setTries] = useState(0);
  const [activeCard, setActiveCard] = useState([]);
  const [firstCard, setFirstCard] = useState([]);

  //Inicializa y baraja las cartas al montar el componente
  useEffect(() => {
    const mixedCards = MixCards([...cardsData]);
    setCards(mixedCards);
  }, []);

  //Muestra un mensaje al completar el juego y lo resetea
  useEffect(() => {
    if (matchedCouples === (cards.length / 2) && (cards.length > 0)) {
      alert("¡FELICIDADES! Has completado el juego");
    }
  }, [matchedCouples]);

  //Añade la carta recien volteada al array de recien volteadas (solo puede contener 2)
  const flipCard = (card) => {
    if (flippedCards.length < 2 && !flippedCards.includes(card)) {
      setFlippedCards((i) => [...i, card]);
      setActiveCard(card);
    }
  }

  useEffect(() => {
    const newFlippedCards = [...flippedCards];
    const newActiveCard = cards.map(i => i.id === activeCard.id ? { ...i, flipped: true } : i);

    if (flippedCards.length === 1) {
      //Actualiza primera carta volteada
      setCards(newActiveCard);
      //Guarda copia de la primera carta volteada para más tarde
      setFirstCard(activeCard);
    }

    if (flippedCards.length === 2) {
      //Actualiza segunda carta volteada
      setCards(newActiveCard);
      setTries(tries + 1);

      if (newFlippedCards[0].tipo === newFlippedCards[1].tipo) {
        //Marca las cartas como emparejadas
        matchCards(newFlippedCards);
        //Borra la primera carta guardada, ya no hace falta
        setFirstCard([]);
      } else {
        //No coinciden las cartas, se espera un segundo y se voltean
        setTimeout(() => unflipCards(newFlippedCards), 1000);
      };
    };
  }, [flippedCards]);

  //Marca las cartas como emparejadas
  const matchCards = (flippedCards) => {
    const newCard = cards.map(i => flippedCards.includes(i) ? { ...i, matched: true } : i);
    setCards(newCard);
    setFlippedCards([]);
    setMatechedCouples(matchedCouples + 1);
  };

  //Función que pone las cartas boca abajo
  const unflipCards = (flippedCards) => {
    //Voltea la segunda carta seleccionada
    let newCard = cards.map(i => flippedCards.includes(i) ? { ...i, flipped: false } : i);
    setCards(newCard);
    //Voltea la primera carta seleccionada
    newCard = cards.map(i => i.id === firstCard.id ? { ...i, flipped: false } : i);
    setCards(newCard);

    setFlippedCards([]);
    setFirstCard([]);
  };

  return (
    <div className="container-fluid">

      { /*Cabecera*/}
      <header className="text-center border-bottom py-2 my-2 alert alert-primary">
        <h1>Memory Card App V0.1&beta;</h1>
        <h3>Parejas logradas: {matchedCouples} - Intentos: {tries} </h3>
        {/*<button>REINICIAR</button>*/}
      </header>

      {/* Tablero */}
      <section className="container mt-1 text-center">
        <div className="row row-cols-lg-8 row-cols-md-4 row-cols-2" >
          { /*Cartas*/}
          {
            cards.map((card) => (
              <Card key={card.id} card={card} onClick={() => flipCard(card)} />
            ))
          }
        </div>
      </section>

      { /*Pie de página*/}
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top alert alert-primary">
        <p className="mb-0 text-muted">&copy; 2024 JCovian</p>
        <p className="mb-0 text-muted">Módulo Diseño de Interfaces - DAM Distancia CIFP Avilés</p>
      </footer>
    </div>
  );
};

export default App;
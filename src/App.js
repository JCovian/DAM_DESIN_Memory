import { useEffect, useState } from 'react';
import { Card } from './components/Card';
import { MixCards } from './helpers/MixCards';
import cardsData from './json/Baraja.json';

function App() {

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCouples, setMatechedCouples] = useState(0);
  const [activeCard, setActiveCard] = useState([]);
  const [firstCard, setFirstCard] = useState([]);

  //Inicializa y baraja las cartas al montar el componente
  useEffect(() => {
    const mixedCards = MixCards([...cardsData]);
    setCards(mixedCards);
  }, []);

  //Muestra un mensaje al completar el juego
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
      console.log("Carta pinchada: ");
      console.log(card);
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

      if (newFlippedCards[0].tipo === newFlippedCards[1].tipo) {
        console.log("MATCH");
        setTimeout(() => matchCards(newFlippedCards), 1000);
        setFirstCard([]);
      } else {
        console.log("Cartas no coinciden ");
        console.log(newFlippedCards);
        console.log("NO MATCH");
        setTimeout(() => unflipCards(newFlippedCards), 1000);
      };
    };
  }, [flippedCards]);

  const matchCards = (flippedCards) => {
    const newCard = cards.map(i => flippedCards.includes(i) ? { ...i, matched: true } : i);
    //console.log("match array: ");
    //console.log(newCard);
    setCards(newCard);
    setFlippedCards([]);
    setMatechedCouples(matchedCouples + 1);
  };

  const unflipCards = (flippedCards) => {
    console.log("contenido flippercards unFlip");
    console.log(flippedCards);
    
    //const newCard = cards.map(i => flippedCards.includes(i) ? { ...i, flipped: false } : i);
    //setCards(newCard);
    //const newCard = cards.map(i => i.id === flippedCards.id ? { ...i, flipped: false } : i);
    let newCard = cards.map(item => flippedCards.includes(item) ? { ...item, flipped: false } : item);
    setCards(newCard);
    console.log("contenido firstCard");
    console.log(firstCard);
    newCard = cards.map(item => item.id === firstCard.id ? { ...item, flipped: false } : item);
    setCards(newCard);
    
    //const newCard = cards.map(item1 => flippedCards.find(item2 => item1.id === item2.id) ? item1.flipped = false: item1);
    //const newCard = flippedCards.map(item => return{ {...item, flipped: false}});

    //const newActiveCard = cards.map(i => i.id === activeCard.id ? { ...i, flipped: true } : i);
    
  
    console.log("contenido newCard en unFlip")
    console.log(newCard);
    //setCards(newCard);
    setFlippedCards([]);
    setFirstCard([]);
    
    console.log("UnFlip cards: ");
    console.log(cards);
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
              <Card key={card.id} card={card} onClick={() => flipCard(card)} />
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
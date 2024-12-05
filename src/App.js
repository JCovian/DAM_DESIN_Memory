import { useEffect, useState } from 'react';
import { Card } from './components/Card';
import { MixCards } from './helpers/MixCards';
import cardsData from './json/Baraja.json';

function App() {

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCouples, setMatechedCouples] = useState(0);

  useEffect(() => {
    //Inicializa y baraja las cartas al montar el componente
    const mixedCards = MixCards([...cardsData]);
    setCards(mixedCards);
    //console.log(cards);
  }, []);

  
  /* Manejador del clic */
  const handleCardClick = (card) => {
    //Evita que más de dos cartas se volteen a la vez o que las volteadas ya esté emparejadas
    console.log("handle =>" + card.matched);
    if (flippedCards.length === 2 || card.flipped || card.matched) return;

    const newFlippedCards = [...flippedCards, card];
    const newCards = cards.map(c => c.id === card.id ? { ...c, flipped: true } : c);

    setFlippedCards(newFlippedCards);
    setCards(newCards);
    

    if(newFlippedCards.length === 2) {
      if(newFlippedCards[0].tipo === newFlippedCards[1].tipo) {
        console.log(newFlippedCards);
        setTimeout(() => matchCards(newFlippedCards), 1000);
      } else {
        console.log(newFlippedCards);
        setTimeout(() => unflipCards(newFlippedCards), 1000);
      }
    }
  };

  const matchCards = (flippedCards) => {
    const newCards = cards.map(c => flippedCards.includes(c) ? {...c, matched: true} : c);
    setCards(newCards);
    setFlippedCards([]);
    setMatechedCouples(matchedCouples + 1);
  };

  const unflipCards = (flippedCards) => {
    const newCards = cards.map(c => flippedCards.includes(c) ? { ...c, flipped: false} : c);
    setCards(newCards);
    setFlippedCards([]);
  };
  

  return (
    <div className="container-fluid">

      { /*Cabecera*/}
      <header className="text-center border-bottom py-2 my-2">
        <h1>Memory Card App V0.1α</h1>
        {/*<button>REINICIAR</button>*/}
      </header>

      {/* Tablero */}
      <section className="container mt-1 text-center">
        <div className="row row-cols-lg-4 row-cols-md-4 row-cols-2" >
          { /*Cartas*/}
          {
            cards.map((card) => (
              <Card key={ card.id } card={ card } onClick={ handleCardClick } />
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
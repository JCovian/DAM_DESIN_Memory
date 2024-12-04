import { useEffect, useState } from 'react';
import { Card } from './components/Card';
import { MixCards } from './helpers/MixCards';

const loadImage = require.context('./img', true);


function App() {

  const [mano, setMano] = useState([]);

  const cards = [
    {
      'id': 'a1',
      'tipo': 'a',
      'imagen': 'cardA'
    },
    {
      'id': 'a2',
      'tipo': 'a',
      'imagen': 'cardA'
    },
    {
      'id': 'b1',
      'tipo': 'b',
      'imagen': 'cardB'
    },
    {
      'id': 'b2',
      'tipo': 'b',
      'imagen': 'cardB'
    },
    {
      'id': 'c1',
      'tipo': 'c',
      'imagen': 'cardC'
    },
    {
      'id': 'c2',
      'tipo': 'c',
      'imagen': 'cardC'
    },
    {
      'id': 'd1',
      'tipo': 'd',
      'imagen': 'cardD'
    },
    {
      'id': 'd2',
      'tipo': 'd',
      'imagen': 'cardD'
    }
  ]



  useEffect(() => {
    //Baraja las cartas al montar el componente
    const mixedCards = MixCards(cards);
    //setMano = mixedCards;
  }, []);

  return (
    <div className="container-fluid">

      { /*Cabecera*/}
      <header className="text-center">
        <h1>Memory Card App V0.1α</h1>
      </header>

      {/* Tablero */}
      <section className="container mt-1 text-center">
        <div className="row row-cols-lg-4 row-cols-md-4 row-cols-2">

          { /*Cartas*/}

          {
            cards.map(element => {
              return <Card id = { element.id } type = { element.tipo } img = { loadImage(`./${ element.imagen }.jpg`) } flipCard = { false } />
            })
          }
          
        </div>
      </section>

      { /*Pie de página*/}
      <footer className="footer-basic-centered text-center">
        <p className="footer-company-motto">JCovian</p>
        <p className="footer-derechos">Todos los derechos reservados &copy; 2024</p>
      </footer>

    </div>
  );
}

export default App;
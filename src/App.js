import cardReversed from './img/card-reversed.jpg'

function App() {
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
          <div className="col border-1">
            <div className="card" style={{ width: "18rem" }}>
              <img src={cardReversed} class="card-img-top" alt="Imágen de carta" />
            </div>
          </div>
          <div className="col border-1">
            <div className="card" style={{ width: "18rem" }}>
              <img src={cardReversed} class="card-img-top" alt="Imágen de carta" />
            </div>
          </div>
          <div className="col border-1">
            <div className="card" style={{ width: "18rem" }}>
              <img src={cardReversed} class="card-img-top" alt="Imágen de carta" />
            </div>
          </div>
          <div className="col border-1">
            <div className="card" style={{ width: "18rem" }}>
              <img src={cardReversed} class="card-img-top" alt="Imágen de carta" />
            </div>
          </div>
          <div className="col border-1">
            <div className="card" style={{ width: "18rem" }}>
              <img src={cardReversed} class="card-img-top" alt="Imágen de carta" />
            </div>
          </div>
          <div className="col border-1">
            <div className="card" style={{ width: "18rem" }}>
              <img src={cardReversed} class="card-img-top" alt="Imágen de carta" />
            </div>
          </div>
          <div className="col border-1">
            <div className="card" style={{ width: "18rem" }}>
              <img src={cardReversed} class="card-img-top" alt="Imágen de carta" />
            </div>
          </div>
          <div className="col border-1">
            <div className="card" style={{ width: "18rem" }}>
              <img src={cardReversed} class="card-img-top" alt="Imágen de carta" />
            </div>
          </div>

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
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts }
  from "../services/apiService";

function Home() {
  const [showOferta, setShowOferta] = useState(true);
  const [products, setProducts] =
    useState([]);

  const destacados = products
    .filter(p => p.offer_price)
    .slice(0, 4);


  // 👇 Auto-cerrar mensaje de oferta después de 5 segundos
  useEffect(() => {

    cargarProductos();

    if (showOferta) {

      const timer =
        setTimeout(() => {

          setShowOferta(false);

        }, 5000);

      return () =>
        clearTimeout(timer);
    }

  }, [showOferta]);

  const cargarProductos =
    async () => {

      try {

        const data =
          await getProducts();

        setProducts(data);

      } catch (error) {

        console.log(error);

      }
    };

  return (
    <div>

      {/* HERO CON BANNER */}
      <div className="bg-dark text-white text-center p-5 position-relative overflow-hidden hero-glow">
        <h1 className="display-4 fw-bold">TechNova Store</h1>
        <p className="lead">
          Innovación tecnológica para tu día a día. Equipos confiables, asesoría experta y precios competitivos.
        </p>
        <Link to="/productos" className="btn btn-primary btn-lg mt-3">
          Explora nuestros productos
        </Link>

        {/* MENSAJE DE OFERTA EN ESQUINA */}
        {showOferta && (
          <div className="position-absolute top-0 end-0 m-3 p-3 bg-danger text-white rounded shadow d-flex align-items-center" style={{ maxWidth: "250px" }}>
            <div className="flex-grow-1">
              ¡Descuentos especiales en laptops y accesorios!
            </div>
            <button
              className="btn btn-sm btn-light ms-2"
              onClick={() => setShowOferta(false)}
            >
              ✖
            </button>
          </div>
        )}
      </div>

      <div className="container mt-5">

        {/* QUIÉNES SOMOS */}
        <section className="mb-5">
          <h3 className="mb-3">¿Quiénes somos?</h3>
          <p>
            TechNova es una tienda tecnológica peruana enfocada en brindar soluciones digitales modernas.
            Nos especializamos en laptops, smartphones y accesorios de alta calidad, ofreciendo productos
            originales con garantía y soporte personalizado.
          </p>
        </section>

        {/* MISIÓN Y VISIÓN */}
        <section className="mb-5 row">
          <div className="col-md-6 mb-3">
            <h4>Misión</h4>
            <p>
              Brindar tecnología accesible y confiable que impulse el desarrollo académico y profesional de nuestros clientes.
            </p>
          </div>
          <div className="col-md-6 mb-3">
            <h4>Visión</h4>
            <p>
              Ser líderes en el mercado tecnológico del sur del Perú, destacando por innovación y servicio.
            </p>
          </div>
        </section>

        {/* OTROS TEMAS RELACIONADOS */}
        <section className="mb-5">
          <h4>Otros temas</h4>
          <ul>
            <li><strong>Ofertas y promociones:</strong> Descuentos especiales en productos seleccionados.</li>
            <li><strong>Productos destacados:</strong> Laptops, smartphones y accesorios más vendidos.</li>
            <li><strong>Valores corporativos:</strong> Calidad, confiabilidad y atención personalizada.</li>
            <li><strong>Soporte y asesoría:</strong> Asistencia técnica y orientación para elegir el producto adecuado.</li>
            <li><strong>Innovación:</strong> Incorporamos lo último en tecnología y tendencias del mercado.</li>
          </ul>
        </section>

        {/* 🆕 CÓMO COMPRAR */}
        <section className="mb-5">
          <h4>¿Cómo comprar?</h4>
          <div className="row mt-3">
            <div className="col-md-3 text-center">
              <div className="card p-3 shadow-sm h-100">
                <h5>1️⃣</h5>
                <p>Explora nuestros productos y elige el que deseas.</p>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="card p-3 shadow-sm h-100">
                <h5>2️⃣</h5>
                <p>Agrega el producto al carrito.</p>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="card p-3 shadow-sm h-100">
                <h5>3️⃣</h5>
                <p>Completa tus datos y selecciona el método de pago.</p>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="card p-3 shadow-sm h-100">
                <h5>4️⃣</h5>
                <p>Recibe tu comprobante y disfruta tu compra.</p>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTOS DESTACADOS */}
        <section className="mb-5">
          <h4>Productos destacados</h4>
          <div className="row mt-3">
            {destacados.map(p => (
              <div key={p.id} className="col-md-3 mb-4">
                <div className="card h-100 shadow-sm">
                  <Link to={`/producto/${p.id}`}>
                    <img src={p.img_url} className="card-img-top" alt={p.name} />
                  </Link>
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title">{p.name}</h6>
                    <p className="card-text text-truncate">{p.description}</p>
                    {p.offer_price ? (
                      <div>
                        <span className="text-danger fw-bold">S/ {p.offer_price}</span>{" "}
                        <small className="text-muted text-decoration-line-through">S/ {p.price}</small>
                      </div>
                    ) : (
                      <div>S/ {p.price}</div>
                    )}
                    <Link to={`/producto/${p.id}`} className="btn btn-primary mt-auto">
                      Ver producto
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section className="mb-5">
          <h4>Testimonios</h4>
          <div className="row mt-3">
            <div className="col-md-4 mb-3">
              <div className="card p-3 shadow-sm h-100">
                <p>"Excelente atención y productos de alta calidad. Recomiendo TechNova 100%."</p>
                <small className="text-muted">- Juan P., Arequipa</small>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card p-3 shadow-sm h-100">
                <p>"Compré mi laptop aquí y funciona de maravilla. Precios competitivos y confiables."</p>
                <small className="text-muted">- Carla M., Arequipa</small>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card p-3 shadow-sm h-100">
                <p>"Atención personalizada y rápida respuesta a mis dudas. Muy recomendables."</p>
                <small className="text-muted">- Luis R., Arequipa</small>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
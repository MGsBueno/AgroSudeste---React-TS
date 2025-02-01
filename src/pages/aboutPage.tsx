import { Link } from "react-router-dom";
import agroImage from "../assets/logo.webp"; // Imagem relacionada ao tema agro

const SobrePage = () => {
  return (
    <>
      {/* Seção de herói com imagem de fundo, usando Bootstrap */}
      <div
        className="hero-section text-white text-center py-5"
        style={{
          backgroundImage: `url(${agroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2
          className="display-4 fw-bold"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", // Adiciona sombra preta ao redor do texto
          }}
        >
          Sobre o Agro Sudeste
        </h2>
      </div>
      <p className="fw-bold text-center py-5">
        Conectando produtores e consumidores de produtos agrícolas de qualidade
        do sudeste.
      </p>
      {/* Conteúdo principal da página */}
      <div className="container my-5">
        <div className="mb-4">
          <h5 className="fw-bold">Quem Somos</h5>
          <hr />
          <p>
            O Agro Sudeste é um marketplace inovador que conecta produtores e
            consumidores de produtos agrícolas no sudeste do Brasil. Nossa
            missão é oferecer produtos frescos, orgânicos e de qualidade,
            promovendo o desenvolvimento do setor agropecuário e impulsionando o
            agronegócio na região.
          </p>
        </div>

        {/* Missão, Visão e Valores - Acordeões lado a lado */}
        <div className="row">
          <div className="col-md-4">
            <div className="accordion" id="accordionMissao">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingMissao">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseMissao"
                    aria-expanded="true"
                    aria-controls="collapseMissao"
                  >
                    Missão
                  </button>
                </h2>
                <div
                  id="collapseMissao"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingMissao"
                  data-bs-parent="#accordionMissao"
                >
                  <div className="accordion-body">
                    Proporcionar aos consumidores acesso a produtos agrícolas
                    frescos e de alta qualidade, ao mesmo tempo em que apoiamos
                    os produtores locais e sustentáveis.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="accordion" id="accordionVisao">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingVisao">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseVisao"
                    aria-expanded="false"
                    aria-controls="collapseVisao"
                  >
                    Visão
                  </button>
                </h2>
                <div
                  id="collapseVisao"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingVisao"
                  data-bs-parent="#accordionVisao"
                >
                  <div className="accordion-body">
                    Ser referência no mercado de produtos agrícolas do sudeste,
                    oferecendo uma plataforma inovadora, segura e eficiente para
                    compras e vendas de produtos agropecuários.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="accordion" id="accordionValores">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingValores">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseValores"
                    aria-expanded="false"
                    aria-controls="collapseValores"
                  >
                    Valores
                  </button>
                </h2>
                <div
                  id="collapseValores"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingValores"
                  data-bs-parent="#accordionValores"
                >
                  <div className="accordion-body">
                    <ul>
                      <li>Qualidade e confiança em nossos produtos</li>
                      <li>Valorização dos produtores locais</li>
                      <li>Sustentabilidade e respeito ao meio ambiente</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Imagem ilustrativa sobre o agro */}
        <div className="my-5 d-flex justify-content-center">
          <img
            src={agroImage}
            alt="Agro Sudeste"
            className="img-fluid rounded shadow-sm"
            style={{
              maxHeight: "400px",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Informações adicionais */}
        <div className="bg-light p-4 rounded shadow-sm">
          <h6 className="fw-bold">Nosso Compromisso</h6>
          <p>
            O Agro Sudeste está comprometido em promover uma cadeia de
            abastecimento mais justa, onde os pequenos e médios produtores
            possam se destacar, garantindo um ambiente econômico saudável para
            todos os envolvidos.
          </p>
        </div>
      </div>
    </>
  );
};

export default SobrePage;

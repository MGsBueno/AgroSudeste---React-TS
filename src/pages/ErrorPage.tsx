import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";

interface AxiosError {
  response?: {
    data: any;
    status: number;
    statusText: string;
  };
  request?: any;
  config?: {
    baseURL: string;
    method: string;
    url: string;
  };
  message?: string;
}

const ErrorPage = () => {
  const error = useRouteError() as AxiosError; // cast para AxiosError

  return (
    <>
      <NavBar />
      <div className="container mt-3">
        <h5>Página de Erro</h5>
        <hr className="mt-1" />
        {isRouteErrorResponse(error) ? (
          "Página requisitada inválida"
        ) : error.response ? (
          <div>
            <h6>Mensagem do servidor:</h6>
            <pre style={{ marginBottom: "0px" }}>
              {JSON.stringify(error.response.data, null, 2)}
            </pre>
          </div>
        ) : error.request ? (
          <div>
            <h6>Erro de requisição:</h6>
            <p>A requisição foi feita, mas não houve resposta do servidor.</p>
            {error.config ? (
              <div>
                <p>
                  <strong>URL Base:</strong> {error.config.baseURL}
                  <br />
                  <strong>Método:</strong> {error.config.method}
                  <br />
                  <strong>URL:</strong> {error.config.url}
                  <br />
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div>
            <h6>Mensagem do erro:</h6>
            <p>{error.message || "Erro desconhecido"}</p>
          </div>
        )}
      </div>
    </>
  );
};
export default ErrorPage;

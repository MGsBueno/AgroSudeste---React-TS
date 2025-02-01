import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import loginIcon from "../assets/skin/login.png";
import useEfetuarLogin from "../hooks/useEfetuarLogin";
import TokenResponse from "../interfaces/TokenResponse";
import Usuario from "../interfaces/Usuario";
import useUsuarioStore from "../store/useUsuarioStore";

const schema = z.object({
  conta: z.string().min(1, { message: "A conta deve ser informada." }),
  senha: z.string().min(1, { message: "A senha deve ser informada." }),
});

type FormLogin = z.infer<typeof schema>;

const LoginForm = () => {
  const setUsuarioLogado = useUsuarioStore((s) => s.setUsuarioLogado);
  const setTentouLogar = useUsuarioStore((s) => s.setTentouLogar);
  const tentouLogar = useUsuarioStore((s) => s.tentouLogar);

  const { mutate: efetuarLogin,
          error: errorLogin} = useEfetuarLogin();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setFocus("conta");
    setTentouLogar(false);
    setUsuarioLogado("");
  }, []);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<FormLogin>({ resolver: zodResolver(schema) });

  const submit = ({ conta, senha }: FormLogin) => {
    const usuario: Usuario = { conta, senha };

    efetuarLogin(usuario, {
      onSuccess: (tokenResponse: TokenResponse) => {
        if (tokenResponse.token.length > 0) {
          setUsuarioLogado(conta);
          if (location.state && location.state.from) {
              navigate(location.state.from);
          }
          else {
            navigate("/");
          }
        }
        else {
          setTentouLogar(true);
          setUsuarioLogado("");
        }
      }
    })
  };

  if (errorLogin) throw errorLogin;

  return (
    <>
      {tentouLogar && (
        <div className="alert alert-danger fw-bold" role="alert">
          Login inválido!
        </div>
      )}
      <form autoComplete="off" onSubmit={handleSubmit(submit)}>
        <div className="row mb-2">
          <label htmlFor="conta" className="col-lg-1 fw-bold mb-2">
            Conta
          </label>
          <div className="col-lg-5">
            <input
              {...register("conta")}
              type="text"
              id="conta"
              className={
                errors.conta
                  ? "form-control form-control-sm is-invalid"
                  : "form-control form-control-sm"
              }
            />
            <div className="invalid-feedback">{errors.conta?.message}</div>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="senha" className="col-lg-1 fw-bold mb-2">
            Senha
          </label>
          <div className="col-lg-5">
            <input
              {...register("senha")}
              type="password"
              id="senha"
              className={
                errors.senha
                  ? "form-control form-control-sm is-invalid"
                  : "form-control form-control-sm"
              }
            />
            <div className="invalid-feedback">{errors.senha?.message}</div>
          </div>
        </div>

        <div className="row">
          <div className="offset-lg-1 col-lg-5">
            <button type="submit" className="btn btn-outline-primary">
              <img src={loginIcon} /> Entrar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;

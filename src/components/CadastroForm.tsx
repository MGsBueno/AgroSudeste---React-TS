import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import CadastroIcon from "../assets/skin/login.png";
import useEfetuarCadastro from "../hooks/usEfetuarCadastro";
import Usuario from "../interfaces/Usuario";
import useUsuarioStore from "../store/useUsuarioStore";

const schema = z.object({
  conta: z.string().min(1, { message: "A conta deve ser informada." }),
  senha: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }), // Regra de segurança mínima
});

type FormCadastro = z.infer<typeof schema>;

const CadastroForm = () => {
  const setUsuarioLogado = useUsuarioStore((s) => s.setUsuarioLogado);
  const setTentouCadastrar = useUsuarioStore((s) => s.setTentouLogar);
  const tentouCadastrar = useUsuarioStore((s) => s.tentouLogar);

  const { mutate: efetuarCadastro, error: errorCadastro } =
    useEfetuarCadastro();
  const navigate = useNavigate();

  // Inicializa o form e usa o setFocus após a renderização
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<FormCadastro>({ resolver: zodResolver(schema) });

  useEffect(() => {
    setFocus("conta");
    setTentouCadastrar(false);
    setUsuarioLogado("", ""); // Evitar mudanças de estado fora do corpo do render
  }, [setTentouCadastrar, setUsuarioLogado, setFocus]);

  const submit = ({ conta, senha }: FormCadastro) => {
    const usuario: Usuario = { conta, senha };

    efetuarCadastro(usuario);
  };

  if (errorCadastro) {
    // Tratamento de erro, você pode passar uma mensagem mais específica
    console.error("Erro no cadastro: ", errorCadastro);
  }

  return (
    <>
      {tentouCadastrar && (
        <div className="alert alert-danger fw-bold" role="alert">
          Erro no cadastro!
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
            <button type="submit" className="btn btn-outline-success">
              <img src={CadastroIcon} alt="Cadastro" /> Cadastrar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CadastroForm;

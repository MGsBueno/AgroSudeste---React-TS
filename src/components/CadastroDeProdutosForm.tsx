import { useEffect } from "react";
import { useForm } from "react-hook-form";
import databaseAdd from "../assets/skin/database_add.png";
import databaseEdit from "../assets/skin/database_edit.png";
import databaseCancel from "../assets/skin/multiply.png";
import useCadastrarProduto from "../hooks/useCadastrarProduto";
import Categoria from "../interfaces/Categoria";
import Produto from "../interfaces/Produto";
import { z } from "zod";
import dataValida from "../util/dataValida";
import { zodResolver } from "@hookform/resolvers/zod";
import useProdutosStore from "../store/useProdutosStore";
import dayjs from "dayjs";
import useAlterarProduto from "../hooks/useAlterarProduto";

const categoriaValida = (categoria: string) => {
  return categoria != "0";
};

const regexData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
const regexImagem = /^[a-z]+\.(gif|jpg|png|bmp)$/;
const schema = z.object({
  nome: z
    .string()
    .min(1, { message: "O nome deve ser informado." })
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
  descricao: z.string().min(1, { message: "A descrição deve ser informada." }),
  categoria: z
    .string()
    .refine(categoriaValida, { message: "A categoria deve ser informada." }),
  data_cadastro: z
    .string()
    .min(1, { message: "A data de cadastro deve ser informada." })
    .regex(regexData, { message: "Data inválida." })
    .refine(dataValida, { message: "Data inválida." }),
  preco: z
    .number({ invalid_type_error: "O preço deve ser informado." })
    .min(0.1, { message: "O preço deve ser maior ou igual a R$ 0.10" }),
  qtd_estoque: z
    .number({
      invalid_type_error: "A quantidade em estoque deve ser informada.",
    })
    .min(0, { message: "A quantidade em estoque deve ser maior do que zero." }),
  imagem: z
    .string()
    .min(1, { message: "A imagem deve ser informada." })
    .regex(regexImagem, { message: "Nome de imagem inválido." }),
  disponivel: z.boolean(),
});

// interface ProdutoForm {
//   nome: string;
//   descricao: string;
//   categoria: number;
//   data_cadastro: string;
//   preco: number;
//   qtd_estoque: number;
//   imagem: string;
//   disponivel: boolean;
// }

type ProdutoForm = z.infer<typeof schema>;

const CadastroDeProdutosForm = () => {
  const produtoSelecionado = useProdutosStore((s) => s.produtoSelecionado);
  const setProdutoSelecionado = useProdutosStore(
    (s) => s.setProdutoSelecionado
  );

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    formState: { isSubmitSuccessful, errors },
  } = useForm<ProdutoForm>({ resolver: zodResolver(schema) });

  // console.log(register("nome"));

  const { mutate: cadastrarProduto, error: errorCadastrarProduto } =
    useCadastrarProduto();
  const { mutate: alterarProduto, error: errorAlterarProduto } =
    useAlterarProduto();

  // Esse useEffect é executado sempre que o produtoSelecionado muda.
  useEffect(() => {
    console.log("produtoSelecionado executado");
    setFocus("nome");
    reset();
    if (produtoSelecionado.id) {
      setValue("nome", produtoSelecionado.nome);
      setValue("descricao", produtoSelecionado.descricao);
      setValue("categoria", String(produtoSelecionado.categoria.id));
      setValue(
          "data_cadastro",
          dayjs(produtoSelecionado.dataCadastro).format("DD/MM/YYYY")
      );
      setValue("preco", produtoSelecionado.preco);
      setValue("qtd_estoque", produtoSelecionado.qtdEstoque);
      setValue("imagem", produtoSelecionado.imagem);
      setValue("disponivel", produtoSelecionado.disponivel);
    }
  }, [produtoSelecionado]);

  // Esse useEffect é executado sempre que o form é montado e
  // sempre que o formulário é submetido. Para evitar o reset()
  // quando o form é montado podemos acrescentar o comando
  // if (isSubmitSuccessful) abaixo.
  useEffect(() => {
    console.log("isSubmitSuccessful executado");
    setFocus("nome");
    if (isSubmitSuccessful) {
      reset();
      setProdutoSelecionado({} as Produto);
    }
  }, [isSubmitSuccessful]);

  // Esse useEffect é executado sempre que a página é montada.
  // Ele retorna uma cleanup function que é executada sempre
  // que a página é desmontada.
  useEffect(() => {
    console.log("[] executado");
    return () => {
      // setFocus("nome");
      setProdutoSelecionado({} as Produto);
    }
  }, []);

  // useEffect(() => {
  //   setFocus("nome");
  //   reset();
  //   if (produtoSelecionado.id) {
  //     setValue("nome", produtoSelecionado.nome);
  //     setValue("descricao", produtoSelecionado.descricao);
  //     setValue("categoria", String(produtoSelecionado.categoria.id));
  //     setValue(
  //       "data_cadastro",
  //       dayjs(produtoSelecionado.dataCadastro).format("DD/MM/YYYY")
  //     );
  //     setValue("preco", produtoSelecionado.preco);
  //     setValue("qtd_estoque", produtoSelecionado.qtdEstoque);
  //     setValue("imagem", produtoSelecionado.imagem);
  //     setValue("disponivel", produtoSelecionado.disponivel);
  //   }
  // }, [produtoSelecionado]);
  //
  // useEffect(() => {
  //   setFocus("nome");
  //   reset();
  //   setProdutoSelecionado({} as Produto);
  // }, [isSubmitSuccessful]);

  //   const nomeRef = useRef<HTMLInputElement>(null);
  //   const descricaoRef = useRef<HTMLInputElement>(null);

  //   const submit = (event: FormEvent) => {
  //     event.preventDefault();
  //     console.log({nome: nomeRef.current!.value, descricao: descricaoRef.current!.value});
  //   }

  const submit = ({
    nome,
    descricao,
    categoria,
    data_cadastro,
    preco,
    qtd_estoque,
    imagem,
    disponivel,
  }: ProdutoForm) => {
    const produto: Produto = {
      nome: nome,
      descricao: descricao,
      categoria: { id: parseInt(categoria) } as Categoria,
      dataCadastro: new Date(
        data_cadastro.substring(6, 10) +
          "-" +
          data_cadastro.substring(3, 5) +
          "-" +
          data_cadastro.substring(0, 2)
      ),
      preco: preco,
      qtdEstoque: qtd_estoque,
      imagem: imagem,
      disponivel: disponivel,
    };
    if (produtoSelecionado.id) {
      produto.id = produtoSelecionado.id;
      alterarProduto(produto);
    } else {
      cadastrarProduto(produto);
    }
  };

  if (errorCadastrarProduto) throw errorCadastrarProduto;
  if (errorAlterarProduto) throw errorAlterarProduto;

  return (
    <form onSubmit={handleSubmit(submit)} autoComplete="off">
      <div className="row">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="nome" className="col-xl-2 fw-bold">
              Nome
            </label>
            <div className="col-xl-10">
              <input
                // ref={nomeRef}
                {...register("nome")}
                type="text"
                id="nome"
                className={
                  errors.nome
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.nome?.message}</div>
              {/* {errors.nome ? <p className="text-danger">{errors.nome.message}</p> : ""} */}
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="descricao" className="col-xl-3 fw-bold">
              Descrição
            </label>
            <div className="col-xl-9">
              <input
                // ref={descricaoRef}
                {...register("descricao")}
                type="text"
                id="descricao"
                className={
                  errors.descricao
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">
                {errors.descricao?.message}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-1">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="categoria" className="col-xl-2 fw-bold">
              Categoria
            </label>
            <div className="col-xl-10">
              <select
                {...register("categoria")}
                id="categoria"
                className={
                  errors.categoria
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              >
                <option value="0">Selecione uma categoria</option>
                <option value="1">Fruta</option>
                <option value="2">Legume</option>
                <option value="3">Verdura</option>
              </select>
              <div className="invalid-feedback">
                {errors.categoria?.message}
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="data_cadastro" className="col-xl-3 fw-bold">
              Data Cadastro
            </label>
            <div className="col-xl-9">
              <input
                {...register("data_cadastro")}
                type="text"
                id="data_cadastro"
                className={
                  errors.data_cadastro
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">
                {errors.data_cadastro?.message}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-1">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="preco" className="col-xl-2 fw-bold">
              Preço
            </label>
            <div className="col-xl-10">
              <input
                {...register("preco", { valueAsNumber: true })}
                type="number"
                step="0.01"
                min="0"
                id="preco"
                className={
                  errors.preco
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.preco?.message}</div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="qtd_estoque" className="col-xl-3 fw-bold">
              Estoque
            </label>
            <div className="col-xl-9">
              <input
                {...register("qtd_estoque", { valueAsNumber: true })}
                type="number"
                min="0"
                id="qtd_estoque"
                className={
                  errors.qtd_estoque
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">
                {errors.qtd_estoque?.message}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-1">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="imagem" className="col-xl-2 fw-bold">
              Imagem
            </label>
            <div className="col-xl-10">
              <input
                {...register("imagem")}
                type="text"
                id="imagem"
                className={
                  errors.imagem
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.imagem?.message}</div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row mb-2">
            <div className="offset-xl-3 col-xl-9">
              <div className="form-check pl-0 mt-xl-0 mt-2">
                <input
                  {...register("disponivel")}
                  type="checkbox"
                  id="disponivel"
                  className="form-check-input"
                />
                <label htmlFor="disponivel" className="form-check-label">
                  Disponível?
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*
       Aqui entra o restante do form
      */}

      <div className="row mb-5">
        <div className="col-xl-6">
          <div className="row">
            <div className="col-xl-10 offset-xl-2 d-flex flex-row">
              <button
                id="botao"
                type="submit"
                style={{width: "100px"}}
                className="btn btn-primary btn-sm d-flex align-items-center me-3"
              >
                {produtoSelecionado.id ? (
                  <>
                    <img src={databaseEdit} className="me-1" /> Alterar
                  </>
                ) : (
                  <>
                    <img src={databaseAdd} className="me-1" /> Cadastrar
                  </>
                )}
              </button>
              <button
                id="botao"
                type="button"
                onClick={() => setProdutoSelecionado({} as Produto)}
                className="btn btn-primary btn-sm d-flex align-items-center "
              >
                <img src={databaseCancel} className="me-1" /> Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default CadastroDeProdutosForm;

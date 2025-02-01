import Categoria from "./Categoria";

interface Produto {
    id?: number;
    imagem: string;
    categoria: Categoria;
    nome: string;
    descricao: string;
    disponivel: boolean;
    dataCadastro: Date;
    qtdEstoque: number;
    preco: number;  
}
export default Produto;
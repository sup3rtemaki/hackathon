import { Carrinho } from "./carrinho.model";

export class Venda{
    constructor(
        public cpf_cliente:string,
        public id_venda:string,
        public total:number,
        public vendedor:string,
        public produtos:Carrinho[],
        public dataVenda: string

    ){}
}
export class Produto{
    constructor(
        public produto: string,
        public tamanho_num: string,
        public fornecedor: string,
        public preco_compra: number,
        public preco_venda: number,
        public codigo:string,
        public estoque:number
    ){}
}
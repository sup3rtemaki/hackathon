import { Produto } from '../shared/produto.model'
import * as firebase from 'firebase'

export class ProdutoService{

    constructor(){}

    public cadastrarProduto(produto: Produto){
        firebase.database().ref(`produto/${btoa(produto.codigo)}`).set(produto)
            .then(() => console.log('foi'))
            .catch((erro: Error) => console.log(erro))
    }

    
    
}
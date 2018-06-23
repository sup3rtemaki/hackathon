import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../shared/cliente.model'
import { NgForm } from '@angular/forms'
import { Produto } from '../shared/produto.model'
import { Carrinho } from '../shared/carrinho.model'
import * as firebase from 'firebase'
import { Venda } from '../shared/venda.model';

@Component({
  selector: 'app-cadastrarvenda',
  templateUrl: './cadastrarvenda.component.html',
  styleUrls: ['./cadastrarvenda.component.css']
})
export class CadastrarvendaComponent implements OnInit {

  @ViewChild('formulario') public formulario: NgForm
  public clientes: Cliente[] = new Array()
  public clientesFiltro: Cliente[] = new Array()

  //Estado atual do formulário: Válido ou Inválido, para controle de exibição
  public formEstado: string = 'disabled'
  //Verificar se dados foram enviados, ou seja, se o cadastro foi salvo
  public dadosEnviados: number = 0

  public produtos: Produto[] = new Array()
  public produtosFiltro: Produto[] = new Array()

  public produtosCarrinho: Produto[] = new Array()
  public valortotal:number=0.0;

 public cliente: string
 public vendedor: string
 public dataVenda:string

  constructor() { }

  ngOnInit() {
    var cliente: Cliente 
     //Pegando todos clientes do banco de dados
     firebase.database().ref(`Cliente`).once('value', (snapshot: any) => {
       snapshot.forEach((childSnapshot: any) => {
        cliente = childSnapshot.val();
         var length = this.clientes.push(cliente);
       });
       this.clientesFiltro = this.clientes
     });

     var produto: Produto 
     //Pegando todos clientes do banco de dados
     firebase.database().ref(`produto`).once('value', (snapshot: any) => {
       snapshot.forEach((childSnapshot: any) => {
        produto = childSnapshot.val();
         var length = this.produtos.push(produto);
       });
       this.produtosFiltro = this.produtos
     });
  }

  //realiza a busca atraves do texto digitado
  public buscaNome(stringBusca: Event): void{
    var textoBusca: string = (<HTMLInputElement>stringBusca.target).value
    this.produtosFiltro= new Array()
    for(var i=0; i<this.produtos.length; i++){
      //ignora case
      if(this.produtos[i].produto.toLowerCase().indexOf(textoBusca.toLowerCase()) != -1) var length = this.produtosFiltro.push(this.produtos[i]);
    }
  }

  public buscarTodos(){
    var produto: Produto
    this.produtos = new Array()
    //Pegando todos clientes do banco de dados
    this.produtosFiltro= new Array()
    firebase.database().ref(`produto`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        produto = childSnapshot.val();
        var length = this.produtos.push(produto);
      });
      this.produtosFiltro = this.produtos
      console.log(this.produtos)
    });
  }

  public addProduto(produto:Produto){
    var length = this.produtosCarrinho.push(produto);
    this.valortotal=produto.preco_venda+this.valortotal;

  }

  public excluirProduto(produto:Produto){
    var produtos: Produto[] = new Array()
    var aux: number = 0
    for (var produtoaux of this.produtosCarrinho){
      if(aux==1 || produtoaux.codigo != produto.codigo){
        var length = produtos.push(produtoaux);
      }else{
        aux = 1
      }
    }
    this.produtosCarrinho = produtos
    this.valortotal=this.valortotal-produto.preco_venda;
    
  }

  public atualizarCliente(cliente: Event): void{
    this.cliente = (<HTMLInputElement>cliente.target).value
    console.log(this.cliente)
  }

  public atualizarVendedor (vendedor: Event): void{
    this.vendedor =  (<HTMLInputElement>vendedor.target).value
    console.log(this.vendedor)
  }
  public atualizarData (dataVenda: Event): void{
    this.dataVenda =  (<HTMLInputElement>dataVenda.target).value
    console.log(this.dataVenda)
  }
  public finalizarCompra( ){
    var aux: number=0
    var carrinho: Carrinho[] = new Array()
    for (var produtoaux of this.produtosCarrinho){
      var verifica: number=0;
      for (var carrinhoaux of carrinho){
        if(produtoaux.codigo == carrinhoaux.codigo){
          carrinhoaux.quantidade = carrinhoaux.quantidade +1
          verifica = 1
        }
        
      }
      if(verifica==0){
        var prodespecial:Carrinho = new Carrinho(produtoaux.codigo, 1)
        var length = carrinho.push(prodespecial);
      }
    }
    var carrinhosAux = carrinho
    console.log(carrinho.values)   
    var idVenda: string = btoa (this.cliente.concat(this.dataVenda.concat(this.vendedor)))
    var compra: Venda = new Venda(this.cliente, idVenda, this.valortotal, this.vendedor, carrinho,this.dataVenda)
    //salvando os dados no banco de dado, passando o cpf como chave primária em base 64
    firebase.database().ref(`Venda/${btoa(idVenda)}`).set(compra).then(() => {
      this.dadosEnviados = 1
    })
  }

  
}

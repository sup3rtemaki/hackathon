import { Component, OnInit } from '@angular/core';
import { Produto } from '../shared/produto.model'
import * as firebase from 'firebase'
import jsPDF from 'jspdf'
// import * as fs  from 'fs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editarProduto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarprodutoComponent implements OnInit {

  //Array para pegar todos os cliente
  public produtos: Produto[] = new Array()
  public produtosFiltro: Produto[] = new Array()
  public exibicao: number = 0;

  constructor() { }

  ngOnInit() {
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

  public formulario: FormGroup = new FormGroup({
    'precoVista': new FormControl(null),
    'precoPrazo': new FormControl(null),
    'num_parcelas': new FormControl(null),
    'valor_parcelas': new FormControl(null),
    'taxa_juros': new FormControl(null),
    'outro_encargo': new FormControl(null)

  })

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

  public excluirProduto(produto:Produto){
    firebase.database().ref(`produto/${btoa(produto.codigo)}/`).remove()
    this.buscarTodos()

  }

  public gerarEtiqueta(){
    console.log(this.formulario.value);
    
    var doc = new jsPDF();
    doc.text(20, 20, `Preço a vista: `+this.formulario.value.precoVista);
    doc.text(20, 30, `Preço a prazo: `+this.formulario.value.precoPrazo);
    doc.text(20, 40, `Numero de parcelas: `+this.formulario.value.num_parcelas);
    doc.text(20, 50, `Valor da parcelas: `+this.formulario.value.valor_parcelas);
    doc.text(20, 60, `Taxa de juros: `+this.formulario.value.taxa_juros);
    doc.text(20, 70, `Outro encargo: `+this.formulario.value.outro_encargo);

    // Save the PDF
    doc.save('./Test.pdf');
    
  }

  public etiquetaProduto(produto:Produto){
    this.exibicao = 1
  }


}


import { Component, OnInit } from '@angular/core';
import { Venda } from '../shared/venda.model'
import { Produto } from '../shared/produto.model'
import { Carrinho } from '../shared/carrinho.model'
import * as firebase from 'firebase'
import jsPDF from 'jspdf'

@Component({
  selector: 'app-mostrarvendas',
  templateUrl: './mostrarvendas.component.html',
  styleUrls: ['./mostrarvendas.component.css']
})
export class MostrarvendasComponent implements OnInit {

  public vendas: Venda[] = new Array()
  public vendasFiltro: Venda[] = new Array()
  constructor() { }

  ngOnInit() {
    var venda: Venda 
     //Pegando todos clientes do banco de dados
     firebase.database().ref(`Venda`).once('value', (snapshot: any) => {
       snapshot.forEach((childSnapshot: any) => {
        venda = childSnapshot.val();
         var length = this.vendas.push(venda);
       });
       this.vendasFiltro = this.vendas
     });
  }

  public buscaData(stringBusca: Event): void{
    var textoBusca: string = (<HTMLInputElement>stringBusca.target).value
    this.vendasFiltro= new Array()
    for(var i=0; i<this.vendas.length; i++){
      //ignora case
      if(this.vendas[i].dataVenda.toLowerCase().indexOf(textoBusca.toLowerCase()) != -1) var length = this.vendasFiltro.push(this.vendas[i]);
    }
  }

}
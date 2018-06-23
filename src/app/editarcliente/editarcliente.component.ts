import { Component, OnInit } from '@angular/core';
import { Cliente } from '../shared/cliente.model'
import * as firebase from 'firebase'
import * as moment from 'moment'

@Component({
  selector: 'app-editarcliente',
  templateUrl: './editarcliente.component.html',
  styleUrls: ['./editarcliente.component.css']
})
export class EditarclienteComponent implements OnInit {

  //Array para pegar todos os cliente
  public clientes: Cliente[] = new Array()
  public clientesFiltro: Cliente[] = new Array()
  constructor() { }
  n: any

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
  }

  //realiza a busca atraves do texto digitado
  public buscaNome(stringBusca: Event): void{
    var textoBusca: string = (<HTMLInputElement>stringBusca.target).value
    this.clientesFiltro= new Array()
    for(var i=0; i<this.clientes.length; i++){
      //ignora case
      if(this.clientes[i].nome.toLowerCase().indexOf(textoBusca.toLowerCase()) != -1) var length = this.clientesFiltro.push(this.clientes[i]);
    }
  }

  public buscarTodos(){
    var cliente: Cliente
    this.clientes = new Array()
    //Pegando todos clientes do banco de dados
    this.clientesFiltro= new Array()
    firebase.database().ref(`Cliente`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        cliente = childSnapshot.val();
        var length = this.clientes.push(cliente);
      });
      this.clientesFiltro = this.clientes
      console.log(this.clientes)
    });














    
  }

  public excluirCliente(cliente:Cliente){
    firebase.database().ref(`Cliente/${btoa(cliente.cpf)}/`).remove()
    this.buscarTodos()

  }

 


}

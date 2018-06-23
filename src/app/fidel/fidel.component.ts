import { Component, OnInit } from '@angular/core';
import { Cliente } from '../shared/cliente.model'
import * as firebase from 'firebase'
import * as moment from 'moment'

@Component({
  selector: 'app-fidel',
  templateUrl: './fidel.component.html',
  styleUrls: ['./fidel.component.css']
})
export class FidelComponent implements OnInit {
  //Array para pegar todos os cliente
  public clientes: Cliente[] = new Array()
  public clientesFiltro: Cliente[] = new Array()
  constructor() { }
  n: any

  ngOnInit() {
    var cliente: Cliente
    //Pegando todos clientes do banco de dados
    this.clientes = new Array()
    firebase.database().ref('Cliente').once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        cliente = childSnapshot.val();
        

        var day = new Date();
        var dayaux = moment(day).format('YYYY-MM-DD');
        var outra = dayaux.toString()

        console.log('dayaux ', dayaux)
        console.log(cliente.data_nascimento)

        if (cliente.data_nascimento == dayaux) {
          console.log('igual')
          var telefone = cliente.celular
          var length = this.clientes.push(cliente);

         
        }
      });
      this.clientesFiltro = this.clientes
    });
  }

  public parabenizar(cliente:Cliente):void{
    var telefone = cliente.celular
    var uri = "Caro sr/sra " + cliente.nome + " nessa data especial queremos te parabenizar. Voce acaba de ganhar 5% de desconto em toda a loja, venha aproveitar!";
    var res = encodeURI(uri);
    this.n = "https://api.whatsapp.com/send?phone=55" + telefone + "&text=" + res;
    window.location.href = this.n;

  }


}

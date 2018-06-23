import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import {ProdutoService } from '../services/produto.service'
import { Produto } from '../shared/produto.model'

@Component({
  selector: 'app-cadastrarproduto',
  templateUrl: './cadastrarproduto.component.html',
  styleUrls: ['./cadastrarproduto.component.css']
})
export class CadastroProdutosComponent implements OnInit {
  
  public dadosEnviados: number = 0

  constructor(private ProdutoService: ProdutoService) { }
  

  public formulario: FormGroup = new FormGroup({
    'produto': new FormControl(null),
    'tamanho_num': new FormControl(null),
    'fornecedor': new FormControl(null),
    'preco_compra': new FormControl(null),
    'preco_venda': new FormControl(null),
    'codigo': new FormControl(null),
    'estoque': new FormControl(null)

  })


  ngOnInit() {
  }

  public cadastrarProduto():void{
    console.log(this.formulario)
    let produto: Produto = new Produto(this.formulario.value.produto, this.formulario.value.tamanho_num, this.formulario.value.fornecedor,this.formulario.value.preco_compra,this.formulario.value.preco_venda, this.formulario.value.codigo, this.formulario.value.estoque)
    this.ProdutoService.cadastrarProduto(produto)
    this.dadosEnviados = 1
  }

}

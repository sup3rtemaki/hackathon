import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule} from  '@angular/forms'

import { ROUTES } from './app.routes'

import { AppComponent } from './app.component';
import { CadastrarclienteComponent } from './cadastrarcliente/cadastrarcliente.component';
import { EditarclienteComponent } from './editarcliente/editarcliente.component';

//importando o FormsModule, para maior facilidade ao criar os formulários
import { FormsModule } from '@angular/forms'
import { MenuComponent } from './menu/menu.component'
import { CadastrarvendaComponent } from './cadastrarvenda/cadastrarvenda.component'
import { CadastroProdutosComponent } from './cadastrarproduto/cadastrarproduto.component'


import {ProdutoService} from './services/produto.service'
import { EditarprodutoComponent } from './editar-produto/editar-produto.component'
import { MostrarvendasComponent } from './mostrarvendas/mostrarvendas.component'
import { PainelComponent } from './painel/painel.component'
import { TopoComponent } from './topo/topo.component'
import { FidelComponent } from './fidel/fidel.component'

@NgModule({
  declarations: [
    AppComponent,
    CadastrarclienteComponent,
    EditarclienteComponent,
    MenuComponent,
    CadastrarvendaComponent,
    CadastroProdutosComponent,
    EditarprodutoComponent,
    MostrarvendasComponent,
    PainelComponent,
    TopoComponent,
    FidelComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ProdutoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

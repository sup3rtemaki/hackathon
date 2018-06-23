import { Routes } from '@angular/router'


import { CadastrarclienteComponent } from './cadastrarcliente/cadastrarcliente.component'
import { EditarclienteComponent } from './editarcliente/editarcliente.component'
import { MenuComponent } from './menu/menu.component'
import { CadastroProdutosComponent } from './cadastrarproduto/cadastrarproduto.component'
import {EditarprodutoComponent} from './editar-produto/editar-produto.component'
import {CadastrarvendaComponent} from './cadastrarvenda/cadastrarvenda.component'
import { MostrarvendasComponent } from './mostrarvendas/mostrarvendas.component'
import { PainelComponent } from './painel/painel.component'
import { TopoComponent } from './topo/topo.component'
import { FidelComponent} from './fidel/fidel.component'



export const ROUTES: Routes = [
    {path: '', component: MenuComponent },
    {path: 'cadCliente', component: CadastrarclienteComponent },
    {path: 'edtCliente', component: EditarclienteComponent },   
    {path: 'cadProduto', component: CadastroProdutosComponent },
    {path: 'edtProduto', component: EditarprodutoComponent },
    {path: 'cadVenda', component: CadastrarvendaComponent },
    {path: 'edtVenda', component: MostrarvendasComponent },
    {path: 'painel', component: PainelComponent },
    {path: 'topo', component: TopoComponent },
    {path: 'fidel', component: FidelComponent }
    


]
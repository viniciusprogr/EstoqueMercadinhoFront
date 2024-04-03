import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListarProdutosComponent } from './components/listar-produtos/listar-produtos.component';
import { CadastrarProdutosComponent } from './components/cadastrar-produtos/cadastrar-produtos.component';
import { AlterarProdutoComponent } from './components/alterar-produto/alterar-produto.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home',
  },
  {
    path: "home", component: HomeComponent
  },
  {
    path: "produtos", component: ListarProdutosComponent
  },
  {
    path: "produtos/cadastrar", component: CadastrarProdutosComponent
  },
  {
    path: "produtos/:id/alterar", component: AlterarProdutoComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

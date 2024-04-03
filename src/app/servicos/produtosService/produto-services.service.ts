import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.desenv';
import { HttpClient} from '@angular/common/http';

import { Produto } from 'src/app/modulos/produto';
import { Quantidade } from 'src/app/modulos/quantidade';


const APIURL = environment.api_url;

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {

  constructor(private http: HttpClient) {}

  listaProdutos() {
    return this.http.get<Produto>(`${APIURL}/listar`);
  }

  cadastraProduto(produto: Produto) {
    return this.http.post<Produto>(`${APIURL}/cadastro`, produto);
  }

  excluirProduto(id: number) {
    return this.http.delete(`${APIURL}/${id}`);
  }

  alterarProduto(id: number, produtoAtualizado: Produto) {
    return this.http.put(`${APIURL}/${id}/alterar`, produtoAtualizado);
  }

  buscaProdutoPorId(id: number) {
    return this.http.get<Produto>(`${APIURL}/${id}`);
  }

  adicionarQuantidadeEstoque(id: number, quantidadeAlterada: Quantidade) {
    return this.http.put(`${APIURL}/${id}/adicionarQuantidade`, quantidadeAlterada);
  }

  removerQuantidadeEstoque(id: number, quantidadeAlterada: Quantidade) {
    return this.http.put(`${APIURL}/${id}/removerQuantidade`, quantidadeAlterada);
  }

  buscarProdutosPeloNome(nomeProduto: string){
    return this.http.get(`${APIURL}/busca?&nomeProduto=${nomeProduto}`);
  }

  buscaProdutoSemEstoque() {
    return this.http.get(`${APIURL}/semEstoque`);
  }

}

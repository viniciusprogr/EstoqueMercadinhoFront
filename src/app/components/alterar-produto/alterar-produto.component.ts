import { Produto } from '../../modulos/produto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../servicos/produtosService/produto-services.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-alterar-produto',
  templateUrl: './alterar-produto.component.html',
  styleUrls: ['./alterar-produto.component.scss'],
})
export class AlterarProdutoComponent implements OnInit {
  modalVisivel: boolean = false;
  mensagemDoModal: string = '';
  tituloDoModal: string = '';
  alteraProdutoForm!: FormGroup;
  nome!: '';
  quantidade!: '';
  preco!: '';
  produtoId!: number;
  produtoEncontrado!: Produto;

  constructor(
    private produtoService: ProdutoService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location

  ) {}

  ngOnInit(){
    //Armazena o iD do produto
    this.activeRoute.params.subscribe((params) => {
      this.produtoId = params['id'];
    });
    //Buscpa pelo iD do produto
    this.buscaProdutoPorId(this.produtoId);
    this.alteraProdutoForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      quantidade: ['', [Validators.required]],
      preco: ['', [Validators.required]],
    });
  }

  buscaProdutoPorId(id: number) {
    this.produtoService.buscaProdutoPorId(id).subscribe({
      next: (retorno) => {
        this.produtoEncontrado = retorno as Produto;
        if (!this.produtoEncontrado) return;
        this.alteraProdutoForm.get('nome')?.setValue(retorno.nome);
        this.alteraProdutoForm.get('quantidade')?.setValue(retorno.quantidade);
        this.alteraProdutoForm.get('preco')?.setValue(retorno.preco);
      },
      error: (error) => {
        this.tituloDoModal = 'Opa!'
        this.mensagemDoModal = error.error.message;
        this.abrirModal();
      },
    });
  }

  alterarProduto() {
    if (this.alteraProdutoForm.valid) {
      var produtoAlterado = this.alteraProdutoForm.getRawValue() as Produto;
      this.produtoService
        .alterarProduto(this.produtoId, produtoAlterado)
        .subscribe({
          next: () => {
            this.mensagemDoModal = 'Seu produto foi atualizado com sucesso!';
            this.tituloDoModal = 'Deu certo!';
            this.abrirModal();
          },
          error: (error) => {
            this.mensagemDoModal = error.error.message;
            this.tituloDoModal = 'Não foi possivel atualizar o produto';
            this.abrirModal();
          },
        });
    }
  }

  voltarParaLista() {
    this.location.back();
  }

  //MODAIS
  abrirModal() {
    this.modalVisivel = true;
  }
  fecharModal() {
    this.modalVisivel = false;
    this.router.navigate(['produtos']);
  }
}

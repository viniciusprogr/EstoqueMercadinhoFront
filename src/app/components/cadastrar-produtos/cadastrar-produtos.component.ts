import { Produto } from '../../modulos/produto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../servicos/produtosService/produto-services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.scss'],
})
export class CadastrarProdutosComponent implements OnInit {
  modalVisivel: boolean = false;
  mensagemDoModal: string = '';
  tituloDoModal: string = '';
  cadastroProdutoForm!: FormGroup;
  nome!: '';
  quantidade!: '';
  preco!: '';

  constructor(
    private produtoService: ProdutoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    //ARMAZENAMENTO DO ID

    this.cadastroProdutoForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      quantidade: ['', [Validators.required]],
      preco: ['', [Validators.required]],
    });
  }

  //métodos

  cadastraProduto() {
    if (this.cadastroProdutoForm.valid) {
      var produto = this.cadastroProdutoForm.getRawValue() as Produto;
      this.produtoService.cadastraProduto(produto).subscribe({
        next: () => {
          this.mensagemDoModal = 'Seu produto foi cadastrado com sucesso!';
          this.tituloDoModal = 'Deu certo!';
          this.abrirModal();
        },
        error: (error) => {
          this.mensagemDoModal = error.error.message;
          this.tituloDoModal = 'Não foi possivel cadastrar o produto';
          this.abrirModal();
        },
      });
    }
  }

  //MODAIS

  abrirModal() {
    this.modalVisivel = true;
  }

  fecharModal() {
    this.modalVisivel = false;
    this.limpaFormulario();
  }

  //MÉTODOS AUXILIARES

  limpaFormulario() {
    this.cadastroProdutoForm.reset();
  }
}

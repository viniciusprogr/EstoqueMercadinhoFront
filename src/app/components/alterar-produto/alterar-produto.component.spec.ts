import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarProdutoComponent } from './alterar-produto.component';

describe('AlterarProdutoComponent', () => {
  let component: AlterarProdutoComponent;
  let fixture: ComponentFixture<AlterarProdutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlterarProdutoComponent]
    });
    fixture = TestBed.createComponent(AlterarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

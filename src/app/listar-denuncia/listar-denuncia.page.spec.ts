import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarDenunciaPage } from './listar-denuncia.page';

describe('ListarDenunciaPage', () => {
  let component: ListarDenunciaPage;
  let fixture: ComponentFixture<ListarDenunciaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListarDenunciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

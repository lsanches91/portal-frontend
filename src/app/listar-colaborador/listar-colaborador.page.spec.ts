import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarColaboradorPage } from './listar-colaborador.page';

describe('ListarColaboradorPage', () => {
  let component: ListarColaboradorPage;
  let fixture: ComponentFixture<ListarColaboradorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListarColaboradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

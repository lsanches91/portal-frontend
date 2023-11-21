import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarRacaPage } from './listar-raca.page';

describe('ListarRacaPage', () => {
  let component: ListarRacaPage;
  let fixture: ComponentFixture<ListarRacaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListarRacaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarEspeciePage } from './listar-especie.page';

describe('ListarEspeciePage', () => {
  let component: ListarEspeciePage;
  let fixture: ComponentFixture<ListarEspeciePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListarEspeciePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

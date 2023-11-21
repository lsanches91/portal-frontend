import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarColaboradorPage } from './editar-colaborador.page';

describe('EditarColaboradorPage', () => {
  let component: EditarColaboradorPage;
  let fixture: ComponentFixture<EditarColaboradorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarColaboradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

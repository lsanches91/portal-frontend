import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioAdocaoPage } from './formulario-adocao.page';

describe('FormularioAdocaoPage', () => {
  let component: FormularioAdocaoPage;
  let fixture: ComponentFixture<FormularioAdocaoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormularioAdocaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

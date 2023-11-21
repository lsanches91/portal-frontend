import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NomeDaPaginaPage } from './listar-usuario.page';

describe('NomeDaPaginaPage', () => {
  let component: NomeDaPaginaPage;
  let fixture: ComponentFixture<NomeDaPaginaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NomeDaPaginaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

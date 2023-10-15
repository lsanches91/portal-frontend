import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarOngPage } from './cadastrar-ong.page';

describe('CadastrarOngPage', () => {
  let component: CadastrarOngPage;
  let fixture: ComponentFixture<CadastrarOngPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CadastrarOngPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

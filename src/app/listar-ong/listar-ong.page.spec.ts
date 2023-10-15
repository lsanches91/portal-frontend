import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarOngPage } from './listar-ong.page';

describe('ListarOngPage', () => {
  let component: ListarOngPage;
  let fixture: ComponentFixture<ListarOngPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListarOngPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

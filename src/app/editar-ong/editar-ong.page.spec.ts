import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarOngPage } from './editar-ong.page';

describe('EditarOngPage', () => {
  let component: EditarOngPage;
  let fixture: ComponentFixture<EditarOngPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarOngPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

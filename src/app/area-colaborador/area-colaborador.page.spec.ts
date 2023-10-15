import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AreaColaboradorPage } from './area-colaborador.page';

describe('AreaColaboradorPage', () => {
  let component: AreaColaboradorPage;
  let fixture: ComponentFixture<AreaColaboradorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AreaColaboradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

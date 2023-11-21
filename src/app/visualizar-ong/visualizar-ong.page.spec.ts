import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizarOngPage } from './visualizar-ong.page';

describe('VisualizarOngPage', () => {
  let component: VisualizarOngPage;
  let fixture: ComponentFixture<VisualizarOngPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VisualizarOngPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

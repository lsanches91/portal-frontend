import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtivarPage } from './ativar.page';

describe('AtivarPage', () => {
  let component: AtivarPage;
  let fixture: ComponentFixture<AtivarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AtivarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

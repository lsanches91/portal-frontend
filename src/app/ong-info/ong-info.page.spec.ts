import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OngInfoPage } from './ong-info.page';

describe('OngInfoPage', () => {
  let component: OngInfoPage;
  let fixture: ComponentFixture<OngInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OngInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

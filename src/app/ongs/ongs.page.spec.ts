import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OngsPage } from './ongs.page';

describe('OngsPage', () => {
  let component: OngsPage;
  let fixture: ComponentFixture<OngsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OngsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

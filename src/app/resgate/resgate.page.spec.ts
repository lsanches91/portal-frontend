import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ResgatePage } from './resgate.page';

describe('ResgatePage', () => {
  let component: ResgatePage;
  let fixture: ComponentFixture<ResgatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResgatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

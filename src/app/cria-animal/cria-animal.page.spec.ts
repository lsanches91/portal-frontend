import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriaAnimalPage } from './cria-animal.page';

describe('CriaAnimalPage', () => {
  let component: CriaAnimalPage;
  let fixture: ComponentFixture<CriaAnimalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CriaAnimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

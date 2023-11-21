import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvaliarOngsPage } from './avaliar-ongs.page';

describe('AvaliarOngsPage', () => {
  let component: AvaliarOngsPage;
  let fixture: ComponentFixture<AvaliarOngsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AvaliarOngsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

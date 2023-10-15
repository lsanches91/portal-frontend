import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtualizaAnimalPage } from './atualiza-animal.page';

describe('AtualizaAnimalPage', () => {
  let component: AtualizaAnimalPage;
  let fixture: ComponentFixture<AtualizaAnimalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AtualizaAnimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

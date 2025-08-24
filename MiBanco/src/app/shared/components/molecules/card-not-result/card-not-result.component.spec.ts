import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNotResultComponent } from './card-not-result.component';

describe('CardNotResultComponent', () => {
  let component: CardNotResultComponent;
  let fixture: ComponentFixture<CardNotResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNotResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNotResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

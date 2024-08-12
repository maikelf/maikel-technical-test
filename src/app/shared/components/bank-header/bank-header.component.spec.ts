import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankHeaderComponent } from './bank-header.component';

describe('BankHeaderComponent', () => {
  let component: BankHeaderComponent;
  let fixture: ComponentFixture<BankHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

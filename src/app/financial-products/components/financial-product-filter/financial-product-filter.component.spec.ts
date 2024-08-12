import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialProductFilterComponent } from './financial-product-filter.component';
import { By } from '@angular/platform-browser';

describe('FinancialProductsFilterComponent', () => {
  let component: FinancialProductFilterComponent;
  let fixture: ComponentFixture<FinancialProductFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialProductFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialProductFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filter value', () => {
    const spy = jest.spyOn(component.filter, 'emit');
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    const value = 'example';
    input.value = value;
    input.dispatchEvent(new Event('input'));
    expect(spy).toHaveBeenCalledWith(value);
  })
});

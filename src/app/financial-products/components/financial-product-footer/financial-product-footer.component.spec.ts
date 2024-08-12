import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialProductFooterComponent } from './financial-product-footer.component';
import { By } from '@angular/platform-browser';

describe('FinancialProductFooterComponent', () => {
  let component: FinancialProductFooterComponent;
  let fixture: ComponentFixture<FinancialProductFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialProductFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialProductFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit paging size when onChangePaging', () => {
    const spy = jest.spyOn(component.paging, 'emit');
    const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    const newPaging = '20';
    selectElement.value = newPaging;
    selectElement.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalledWith(Number(newPaging));
    expect(component.productsByPage).toBe(Number(newPaging));
  });

  it('should display correct products count', () => {
    component.productsCount = 5;
    fixture.detectChanges();
    const count = fixture.debugElement.query(By.css('.footer-count-text')).nativeElement;
    expect(count.textContent).toContain('5');
  });
});

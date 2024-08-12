import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialDropdowmActionsComponent } from './financial-dropdowm-actions.component';
import { FinancialProductService } from '../../services/financial-product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { compilePipeFromMetadata } from '@angular/compiler';

describe('FinancialDropdowmActionsComponent', () => {
  let component: FinancialDropdowmActionsComponent;
  let fixture: ComponentFixture<FinancialDropdowmActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialDropdowmActionsComponent, HttpClientTestingModule],
      providers: [FinancialProductService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialDropdowmActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toogle status', () => {
    component.open = false;
    fixture.detectChanges();
    let menu = fixture.debugElement.query(By.css('.dropdown-items'));
    expect(menu).toBeFalsy();
    component.toggle();
    fixture.detectChanges();
    menu = fixture.debugElement.query(By.css('.dropdown-items'));
    expect(menu).toBeTruthy();
  });

  it('should emit event is delete confirm', () => {
    const spy = jest.spyOn(component.afterDelete, 'emit');
    component.deleteItemConfirmed('any');
    expect(spy).toHaveBeenCalledWith('any');
    expect(component.openDeleteConfirmDialog).toBeFalsy();
  })
  
  it('Should change openDeleteConfirmDialog', () => {
    component.deleteItem();
    expect(component.openDeleteConfirmDialog).toBeTruthy();
    component.closeDeleteDialog();
    expect(component.openDeleteConfirmDialog).toBeFalsy();
  })

  it('Should open false when close', () => {
    component.close();
    expect(component.open).toBeFalsy();
  })

  it('should call close() when clicked outside the dropdown', () => {
    const spy = jest.spyOn(component, 'close');

    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });

    const outside = document.createElement('div');
    document.body.appendChild(outside);

    outside.dispatchEvent(event);
    expect(spy).toHaveBeenCalled();
  });
});

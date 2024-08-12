import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinancialProductsDeleteComponent } from './financial-products-delete.component';
import { FinancialProductService } from '../../services/financial-product.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('FinancialProductsDeleteComponent', () => {
  let component: FinancialProductsDeleteComponent;
  let fixture: ComponentFixture<FinancialProductsDeleteComponent>;
  let mockFinancialProductService: jest.Mocked<FinancialProductService>;;

  beforeEach(async () => {
    mockFinancialProductService = {
      deleteProduct: jest.fn().mockReturnValue(of(true)),
    }  as unknown as jest.Mocked<FinancialProductService>;

    await TestBed.configureTestingModule({
      imports: [FinancialProductsDeleteComponent, HttpClientModule],
      providers: [{ provide: FinancialProductService, useValue: mockFinancialProductService }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialProductsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event if cancel', () => {
    const spy = jest.spyOn(component.close, 'emit');
    component.cancel();
    expect(spy).toHaveBeenCalled();
  })

  it('should call delete project if confirm and emit value', () => {
    const spyEmit = jest.spyOn(component.confirm, 'emit');
    const spyDelete = jest.spyOn(mockFinancialProductService, 'deleteProduct');
    component.productId = 'any';
    component.deleteProduct();
    expect(spyEmit).toHaveBeenCalledWith('any');
    expect(spyDelete).toHaveBeenCalled();
  })
});

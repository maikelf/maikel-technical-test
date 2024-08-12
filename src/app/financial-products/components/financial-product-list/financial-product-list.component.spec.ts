import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialProductListComponent } from './financial-product-list.component';
import { FinancialProductService } from '../../services/financial-product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('FinancialProductListComponent', () => {
  let component: FinancialProductListComponent;
  let fixture: ComponentFixture<FinancialProductListComponent>;
  let mockService: jest.Mocked<FinancialProductService>;

  beforeEach(async () => {
    mockService = { 
      getProducts: () => of([
        { id: '1', name: 'product name 1', logo: 'product logo 1', description: 'product description 1', date_release: '2024-08-10', date_revision: '2025-08-10' },
        { id: '2', name: 'product name 2', logo: 'product logo 2', description: 'product description 2', date_release: '2024-08-10', date_revision: '2025-08-10' },
        { id: '3', name: 'product name 3', logo: 'product logo 3', description: 'product description 3', date_release: '2024-08-10', date_revision: '2025-08-10' },
        { id: '4', name: 'product name 4', logo: 'product logo 4', description: 'product description 4', date_release: '2024-08-10', date_revision: '2025-08-10' },
        { id: '5', name: 'product name 5', logo: 'product logo 5', description: 'product description 5', date_release: '2024-08-10', date_revision: '2025-08-10' },
        { id: '6', name: 'product name 6', logo: 'product logo 6', description: 'product description 6', date_release: '2024-08-10', date_revision: '2025-08-10' },
        { id: '7', name: 'product name 7', logo: 'product logo 7', description: 'product description 7', date_release: '2024-08-10', date_revision: '2025-08-10' },
        { id: '8', name: 'product name 8', logo: 'product logo 8', description: 'product description 8', date_release: '2024-08-10', date_revision: '2025-08-10' }
      ])
    } as unknown as jest.Mocked<FinancialProductService>;

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: FinancialProductService, useValue: mockService}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call readFinancialProducts on init', () => {
    const spy = jest.spyOn(mockService, 'getProducts');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  })
  
  it('should list products when get data', () => {
    component.readFinancialProducts();
    fixture.detectChanges();
    expect(component.products()).toHaveLength(8);
    expect(component.productListFiltered()).toHaveLength(8);
    expect(component.productsListElements()).toHaveLength(8);
    expect(component.loading).toBe(false);
  });

  it('should update product list filter after filter apply', () => {
    component.ngOnInit();
    component.onFilterApply('name 2');
    expect(component.productListFiltered()).toHaveLength(1);
  });

  it('should update product list elements after paging change', () => {
    component.ngOnInit();
    component.onPagingChange(5);
    expect(component.productsListElements()).toHaveLength(5);
  })

  it('should update product list filter after delete confirm', () => {
    component.ngOnInit();
    component.onDeleteConfirmed('1');
    expect(component.productsListElements()).toHaveLength(7);
  })
});

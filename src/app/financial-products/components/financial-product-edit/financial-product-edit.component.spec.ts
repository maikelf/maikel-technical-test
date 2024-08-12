import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialProductEditComponent } from './financial-product-edit.component';
import { FinancialProductService } from '../../services/financial-product.service';
import { MessageService } from '../../../shared/services/message-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('FinancialProductEditComponent', () => {
  let component: FinancialProductEditComponent;
  let fixture: ComponentFixture<FinancialProductEditComponent>;
  let mockFinancialProductService: jest.Mocked<FinancialProductService>;
  let mockMessageService: jest.Mocked<MessageService>

  beforeEach(async () => {
    mockFinancialProductService = {
      getProducts: () => of([
        { id: 'mk120', name: 'product name 1', logo: 'product logo 1', description: 'product description 1', date_release: '2024-01-30T00:00:00.000+00:00', date_revision: '2025-01-30T00:00:00.000+00:00' },
        { id: 'mk121', name: 'product name 2', logo: 'product logo 2', description: 'product description 2', date_release: '2024-01-30T00:00:00.000+00:00', date_revision: '2025-01-30T00:00:00.000+00:00' },
        { id: 'mk122', name: 'product name 3', logo: 'product logo 3', description: 'product description 3', date_release: '2024-01-30T00:00:00.000+00:00', date_revision: '2025-01-30T00:00:00.000+00:00' }
      ]),
      editProduct: jest.fn().mockReturnValue(of(true)),
    }  as unknown as jest.Mocked<FinancialProductService>;

    mockMessageService = {
      message$: of(null),
      show: jest.fn(),
      hide: jest.fn()
    } as unknown as jest.Mocked<MessageService>;

    await TestBed.configureTestingModule({
      imports: [FinancialProductEditComponent, HttpClientTestingModule],
      providers: [
        { provide: FinancialProductService, useValue: mockFinancialProductService },
        { provide: MessageService, useValue: mockMessageService },
        { 
          provide: ActivatedRoute,
          useValue: { 
            paramMap: of({
              get: (key: string) => { 
                if (key === 'id') { 
                  return 'mk121'
                } return null 
              }}
            )
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set idQuery from params query and call getProduct', () => {
    const spy = jest.spyOn(mockFinancialProductService, 'getProducts')
    component.ngOnInit();
    expect(component.idQuery).toBe('mk121');
    expect(spy).toHaveBeenCalled();
  });

  it('should update form value with product data', () => {
    component.ngOnInit();
    expect(component.productForm).toBeTruthy();
    expect(component.productForm.controls['id'].value).toBe('mk121');
    expect(component.productForm.controls['name'].value).toBe('product name 2');
    expect(component.productForm.controls['description'].value).toBe('product description 2');
    expect(component.productForm.controls['logo'].value).toBe('product logo 2');
    expect(component.productForm.controls['date_release'].value).toBe('2024-01-30');
    expect(component.productForm.controls['date_revision'].value).toBe('2025-01-30');
  });

  it('should call update product and show success msg', () => {
    const spy=jest.spyOn(mockFinancialProductService, 'editProduct');
    component.ngOnInit();
    component.productForm.setValue({
      id: 'mk121',
      name: 'product name 2 edit',
      description: 'product description 2',
      logo: 'product logo 2',
      date_release: '2024-01-30',
      date_revision: '2025-01-30'
    });
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
    expect(mockMessageService.show).toHaveBeenCalledWith('Successfully edited product', 'success');
  });
});

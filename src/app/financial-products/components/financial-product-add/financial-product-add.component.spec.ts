import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialProductAddComponent } from './financial-product-add.component';
import { FinancialProductService } from '../../services/financial-product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from '../../../shared/services/message-service';
import { of } from 'rxjs';

describe('FinancialProductAddComponent', () => {
  let component: FinancialProductAddComponent;
  let fixture: ComponentFixture<FinancialProductAddComponent>;
  let mockFinancialProductService: jest.Mocked<FinancialProductService>;
  let mockMessageService: jest.Mocked<MessageService>

  beforeEach(async () => {
    mockFinancialProductService = {
      checkIdAlreadyExist: jest.fn().mockReturnValue(of(true)),
      addNewProduct: jest.fn().mockReturnValue(of())
    }  as unknown as jest.Mocked<FinancialProductService>;

    mockMessageService = {
      message$: of(null),
      show: jest.fn()
    } as unknown as jest.Mocked<MessageService>;

    await TestBed.configureTestingModule({
      imports: [FinancialProductAddComponent, HttpClientTestingModule],
      providers: [
        { provide: FinancialProductService, useValue: mockFinancialProductService },
        { provide: MessageService, useValue: mockMessageService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.productForm).toBeTruthy();
    expect(component.productForm.controls['id'].value).toBe('');
    expect(component.productForm.controls['name'].value).toBe('');
    expect(component.productForm.controls['description'].value).toBe('');
    expect(component.productForm.controls['logo'].value).toBe('https://i.imghippo.com/files/W4gkq1723349838.jpg');
    expect(component.productForm.controls['date_release'].value).toBe('');
    expect(component.productForm.controls['date_revision'].value).toBe('');
  });

  it('should show error message if ID already exists', () => {
    const product = {
      id: '1u78',
      name: 'product1',
      description: 'product description 1',
      logo: 'https://i.imghippo.com/files/W4gkq1723349838.jpg',
      date_release: '2025-08-10',
      date_revision: '2026-08-10'
    };
    const spy = jest.spyOn(mockFinancialProductService, 'checkIdAlreadyExist');
    const spy2 = jest.spyOn(mockFinancialProductService,  'addNewProduct');
    component.productForm.setValue(product);
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
    expect(mockMessageService.show).toHaveBeenCalledWith('Product id already exist', 'error');
  });
});

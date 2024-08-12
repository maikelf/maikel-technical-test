import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FinancialProductService } from './financial-product.service';
import { FinancialProduct } from '../models/financial-product.model';

describe('FinancialProductService', () => {
    let service: FinancialProductService;
    let httpMock: HttpTestingController;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [FinancialProductService],
      });
  
      service = TestBed.inject(FinancialProductService);
      httpMock = TestBed.inject(HttpTestingController);
    });
  
    afterEach(() => {
      httpMock.verify();
    });
  
    it('should get products from API by GET', () => {
        const mockProducts: FinancialProduct[] = [
          { id: 'key1', name: 'Product 1', description: 'Description 1', date_release: '2024-08-01', date_revision: '2024-08-01', logo: 'logo 1' },
          { id: 'key2', name: 'Product 2', description: 'Description 2', date_release: '2025-08-01', date_revision: '2025-08-01', logo: 'logo 2' },
        ];
      
        service.getProducts().subscribe(products => {
          expect(products.length).toBe(2);
          expect(products).toEqual(mockProducts);
        });
      
        const req = httpMock.expectOne(`${service['apiProductsBaseUrl']}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockProducts);
    });

    it('should send a product to API by POST', () => {
        const newProduct: FinancialProduct = {
          id: 'key3', name: 'Product 3', description: 'Description 3', date_release: '2024-08-10', date_revision: '2025-08-10', logo: 'logo 3'
        };
        const mockProducts: FinancialProduct[] = [newProduct];
      
        service.addNewProduct(newProduct).subscribe(products => {
          expect(products).toEqual(mockProducts);
        });
      
        const req = httpMock.expectOne(`${service['apiProductsBaseUrl']}`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newProduct);
        req.flush(mockProducts);
    });

    it('should update product by PUT', () => {
        const updatedProduct: FinancialProduct = {
          id: 'key1', name: 'Product 1 updated', description: 'Description', date_release: '2024-08-01', date_revision: '2025-08-01', logo: 'logo'
        };
        const mockProducts: FinancialProduct[] = [updatedProduct];
      
        service.editProduct(updatedProduct).subscribe(products => {
          expect(products).toEqual(mockProducts);
        });
      
        const req = httpMock.expectOne(`${service['apiProductsBaseUrl']}`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(updatedProduct);
        req.flush(mockProducts);
    });
});
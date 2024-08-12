import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FinancialProduct } from "../models/financial-product.model"; 

@Injectable({
    providedIn: 'root'
})

export class FinancialProductService {
    private apiProductsBaseUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';

    constructor(private httpClient: HttpClient) {}

    getProducts(): Observable<FinancialProduct[]> {
        return this.httpClient.get<FinancialProduct[]>(`${this.apiProductsBaseUrl}`);
    }

    addNewProduct(product: FinancialProduct): Observable<FinancialProduct[]> {
        return this.httpClient.post<FinancialProduct[]>(`${this.apiProductsBaseUrl}`, product);
    }

    editProduct(product: FinancialProduct): Observable<FinancialProduct[]> {
        return this.httpClient.put<FinancialProduct[]>(`${this.apiProductsBaseUrl}`, product);
    }

    deleteProduct(id: string): Observable<any> {
        return this.httpClient.delete<any>(`${this.apiProductsBaseUrl}/?id=${id}`);
    }

    checkIdAlreadyExist(id: string): Observable<boolean> {
        return this.httpClient.get<boolean>(`${this.apiProductsBaseUrl}/verification?id=${id}`);
    }

}
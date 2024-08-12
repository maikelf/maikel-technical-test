import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialProduct } from '../../models/financial-product.model';
import { FinancialProductService } from '../../services/financial-product.service';
import { FinancialProductFilterComponent } from '../financial-product-filter/financial-product-filter.component';
import { FinancialProductFooterComponent } from '../financial-product-footer/financial-product-footer.component';
import { BankHeaderComponent } from '../../../shared/components/bank-header/bank-header.component';
import { ButtonRouteComponent } from '../../../shared/components/button-route/button-route.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FinancialDropdowmActionsComponent } from '../financial-dropdowm-actions/financial-dropdowm-actions.component';

@Component({
  selector: 'app-financial-product-list',
  standalone: true,
  imports: [ 
    CommonModule,
    NgxSkeletonLoaderModule,
    FinancialProductFilterComponent,
    FinancialProductFooterComponent,
    FinancialDropdowmActionsComponent,
    BankHeaderComponent,
    ButtonRouteComponent
  ],
  templateUrl: './financial-product-list.component.html',
  styleUrl: './financial-product-list.component.css'
})
export class FinancialProductListComponent implements OnInit {
  loading: boolean = false;
  products: WritableSignal<FinancialProduct[]> = signal([])
  productListFiltered: WritableSignal<FinancialProduct[]> = signal([]);
  productsListElements: WritableSignal<FinancialProduct[]> = signal([]);
  
  constructor(private service: FinancialProductService) {}

  ngOnInit(): void {
    this.readFinancialProducts();     
  }

  readFinancialProducts(): void {
    this.loading = true;
    this.service.getProducts()
      .subscribe({
          next: (p: FinancialProduct[]) => {
            this.products.set(p);
            this.productListFiltered.set(p);
            this.productsListElements.set(p);
            this.loading = false;
          },
          error: (err) => console.log(err)
      })
  }

  onFilterApply(input: string): void {
    if (input.length > 3) {
      const f = this.products().filter((e: FinancialProduct) => {
        const content = `${e.name}${e.description}${e.date_release}${e.date_revision}`;
        return content.toLocaleLowerCase().includes(input.trim().toLocaleLowerCase());
      });

      this.productListFiltered.set(f);
      this.productsListElements.set(f);
    } else {
      this.productListFiltered.set(this.products());
      this.productsListElements.set(this.products());
    }
  }

  onPagingChange(itemsCount: number): void {
    const productFilteredStore = this.productListFiltered();
    this.productsListElements.set(productFilteredStore.slice(0, itemsCount));
  }

  onDeleteConfirmed(id: string): void {
    const e = this.productsListElements().filter(e => e.id !== id);
    this.productsListElements.set(e);
  }
}

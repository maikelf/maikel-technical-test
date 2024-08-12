import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-financial-product-footer',
  standalone: true,
  imports: [],
  templateUrl: './financial-product-footer.component.html',
  styleUrl: './financial-product-footer.component.css'
})
export class FinancialProductFooterComponent {
  @Input() productsCount: number = 0;
  @Output() paging = new EventEmitter<number>();
  productsByPage: number = 10;

  onChangePaging(event:Event): void {
    const pagingSize = event.target as HTMLSelectElement;
    this.productsByPage = Number(pagingSize.value);
    this.paging.emit(this.productsByPage);
  }
}

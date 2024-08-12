import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FinancialProductService } from '../../services/financial-product.service';

@Component({
  selector: 'app-financial-products-delete',
  standalone: true,
  imports: [],
  templateUrl: './financial-products-delete.component.html',
  styleUrl: './financial-products-delete.component.css'
})
export class FinancialProductsDeleteComponent {
  @Input() productId: string = '';
  @Input() productName: string = '';
  @Input() isDialogOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<string | null>();

  constructor(private service: FinancialProductService) {}

  cancel() {
    this.close.emit();
  }

  deleteProduct() {
    this.service.deleteProduct(this.productId).subscribe({
      next: () => this.confirm.emit(this.productId),
      error: () => this.confirm.emit(null)
    })
  }
}

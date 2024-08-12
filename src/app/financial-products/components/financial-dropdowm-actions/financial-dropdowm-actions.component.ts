import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FinancialProductsDeleteComponent } from '../financial-products-delete/financial-products-delete.component';

@Component({
  selector: 'app-financial-dropdowm-actions',
  standalone: true,
  imports: [ FinancialProductsDeleteComponent ],
  templateUrl: './financial-dropdowm-actions.component.html',
  styleUrl: './financial-dropdowm-actions.component.css'
})
export class FinancialDropdowmActionsComponent {
  @Input() id: string = '';
  @Input() name: string = '';
  @Output() afterDelete = new EventEmitter<string>();
  open: boolean = false;
  openDeleteConfirmDialog: boolean = false;

  constructor(private route: Router) {}

  toggle() {
    this.open = !this.open
  }

  close() {
    this.open = false;
  }

  goToEdit(id: string) {
    this.route.navigate(['/edit-financial-product', id])
  }

  deleteItem() {
    this.openDeleteConfirmDialog = true;
  }

  closeDeleteDialog() {
    this.openDeleteConfirmDialog = false
  }

  deleteItemConfirmed(event: string | null) {
    this.openDeleteConfirmDialog = false;
    this.afterDelete.emit(event || '');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.close();
    }
  }
}

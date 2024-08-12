import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-financial-product-filter',
  standalone: true,
  imports: [],
  template: `<div class="search-box">
    <input type="text" placeholder="Search..." (input)="onSearchInputChange($event)" class="search-input" />
    </div>  
  `,
  styleUrl: './financial-product-filter.component.css'
})
export class FinancialProductFilterComponent {
  @Output() filter = new EventEmitter<string>();
  
  onSearchInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filter.emit(input.value);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BankHeaderComponent } from '../../../shared/components/bank-header/bank-header.component';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FinancialProductService } from '../../services/financial-product.service';
import { ButtonRouteComponent } from '../../../shared/components/button-route/button-route.component';
import { Message } from '../../models/messages';
import { MessageService } from '../../../shared/services/message-service';
import { Observable } from 'rxjs';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FinancialProduct } from '../../models/financial-product.model';

@Component({
  selector: 'app-financial-product-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BankHeaderComponent,
    CommonModule,
    NgxSkeletonLoaderModule,
    ButtonRouteComponent
  ],
  templateUrl: './financial-product-edit.component.html',
  styleUrl: './financial-product-edit.component.css'
})
export class FinancialProductEditComponent implements OnInit {
  loading: boolean = false;
  idQuery: string | null = '';
  error: boolean = false;
  productForm: FormGroup;
  message: Message | null = null;
  message$: Observable<Message | null>;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private service: FinancialProductService, private messageService: MessageService) {
    this.productForm =  this.fb.group({
      id: new FormControl({value: '', disabled: true}),
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required]],
      date_revision: ['', Validators.required]
    })
    this.id?.disabled;
    this.message$ = this.messageService.message$;
  }

  ngOnInit(): void {
    this.messageService.hide();
    this.loading = true;
    this.error = false;
    this.route.paramMap.subscribe(params => {
      this.idQuery = params.get('id');
      this.service.getProducts()
      .subscribe({
          next: (p: FinancialProduct[]) => {
            let product = p.find((e: FinancialProduct) => e.id === this.idQuery);
            if (product) {
              product.date_release = product.date_release.split('T')[0];
              product.date_revision = product.date_revision.split('T')[0];
              this.productForm.patchValue(product);
            } else {
              this.error = true;
              this.messageService.show('Error getting product', 'error', 0);
            }
            this.loading = false;
          },
          error: (err) => {
            this.loading = false;
            this.error = true;
            this.messageService.show('Error getting product', 'error', 0);
          }
      })
    });

    this.date_release?.valueChanges.subscribe((releaseDate: string) => {
      if (releaseDate) {
        const y = releaseDate.split('-');
        if (y.length === 3) {
          const ny = Number(y[0]) + 1;
          y[0] = ny.toString();
          this.date_revision?.setValue(y.join('-'));
        }
      }
    })
  }

  get id() {
    return this.productForm.get('id');
  }
  
  get name() {
    return this.productForm.get('name');
  }

  get description() {
    return this.productForm.get('description');
  }

  get logo() {
    return this.productForm.get('logo');
  }

  get date_release() {
    return this.productForm.get('date_release');
  }

  get date_revision() {
    return this.productForm.get('date_revision');
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.service.editProduct({...this.productForm.value, id: this.idQuery}).subscribe({
        next: () => this.messageService.show('Successfully edited product', 'success'),
        error: () => this.messageService.show('Error editing product', 'error'),
      })
    }
  }
}

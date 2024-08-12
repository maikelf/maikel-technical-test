import { Component, OnInit } from '@angular/core';
import { BankHeaderComponent } from '../../../shared/components/bank-header/bank-header.component';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { beforeTodayValidator } from '../../validators/custom-validators';
import { FinancialProductService } from '../../services/financial-product.service';
import { ButtonRouteComponent } from '../../../shared/components/button-route/button-route.component';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Message } from '../../models/messages';
import { MessageService } from '../../../shared/services/message-service';

@Component({
  selector: 'app-financial-product-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BankHeaderComponent, ButtonRouteComponent],
  templateUrl: './financial-product-add.component.html',
  styleUrl: './financial-product-add.component.css'
})
export class FinancialProductAddComponent implements OnInit {
  productForm: FormGroup;
  message: Message | null = null;
  message$: Observable<Message | null>;

  constructor(private fb: FormBuilder, private service: FinancialProductService, private messageService: MessageService) {
    this.productForm =  this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['https://i.imghippo.com/files/W4gkq1723349838.jpg', Validators.required],
      date_release: ['', [Validators.required, beforeTodayValidator()]],
      date_revision: ['', Validators.required]
    })
    this.message$ = this.messageService.message$;
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

  ngOnInit(): void {
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

    this.messageService.message$.subscribe((m) => this.message = m);
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.service.checkIdAlreadyExist(this.productForm.value.id)
        .pipe(
          switchMap((idChecked: boolean) => {
            if (!idChecked) {
              return this.service.addNewProduct(this.productForm.value);
            } else {
              this.messageService.show('Product id already exist', 'error');
              return of(null);
            }
          }),
          catchError((err) => {
            this.messageService.show('Error checking product id', 'error');
            return of(null)
          })
        ).subscribe({
          next: (result) => {
            if (result) {
              this.messageService.show('Successfully created product', 'success');
            }
          },
          error: (err) => {
            this.messageService.show('Error creating product', 'error');
          }
        })
    }
  }

  resetForm() {
    this.productForm.reset();
  }

}

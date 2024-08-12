import { Routes } from '@angular/router';
import { FinancialProductListComponent } from './financial-products/components/financial-product-list/financial-product-list.component';
import { FinancialProductAddComponent } from './financial-products/components/financial-product-add/financial-product-add.component';
import { FinancialProductEditComponent } from './financial-products/components/financial-product-edit/financial-product-edit.component';

export const routes: Routes = [
    { path: '', redirectTo: '/financial-products', pathMatch: 'full' },
    { path: 'financial-products', component:FinancialProductListComponent },
    { path: 'new-financial-product', component: FinancialProductAddComponent },
    { path: 'edit-financial-product/:id', component: FinancialProductEditComponent }
];

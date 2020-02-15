import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { CategoryComponent } from './layout/category/category.component';
import { ManageItemsComponent } from './layout/manage-items/manage-items.component';
import { ViewCategoryComponent } from './layout/category/view-category/view-category.component';
import { ViewItemsComponent } from './layout/manage-items/view-items/view-items.component';
import { EditCategoryComponent } from './layout/category/edit-category/edit-category.component';
import { EditItemComponent } from './layout/manage-items/edit-item/edit-item.component';
import { UpdateStockComponent } from './layout/manage-items/update-stock/update-stock.component';
import { CustomerInfoComponent } from './layout/customer-info/customer-info.component';


const routes: Routes = [
  // { path: '', component: LayoutComponent },
  // {
  //   path: 'categories',
  //   component: CategoryComponent,
  //   children: [
  //     // {
  //     //   path: '',
  //     //   component: CategoryComponent
  //     // },
  //     {
  //       path: 'view-categories',
  //       component: ViewCategoryComponent
  //     },
  //     {
  //       path: 'edit-category/:id',
  //       component: EditCategoryComponent
  //     }
  //   ]
  // },
  { path: 'categories', component: CategoryComponent },
  { path: 'view-categories', component: ViewCategoryComponent },
  { path: 'edit-category', component: EditCategoryComponent },
  { path: 'manage-items', component: ManageItemsComponent },
  { path: 'view-items', component: ViewItemsComponent },
  { path: 'edit-item', component: EditItemComponent },
  { path: 'update-stock', component: UpdateStockComponent },
  { path: 'customer-info', component: CustomerInfoComponent },
  { path: '', redirectTo: '/categories', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

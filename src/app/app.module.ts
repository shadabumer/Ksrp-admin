import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/components/sidebar/sidebar.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { CategoryComponent } from './layout/category/category.component';
import { ManageItemsComponent } from './layout/manage-items/manage-items.component';
import { ViewCategoryComponent } from './layout/category/view-category/view-category.component';
import { ViewItemsComponent } from './layout/manage-items/view-items/view-items.component';
import { ConfirmModelComponent } from './layout/components/confirm-model/confirm-model.component';
import { EditCategoryComponent } from './layout/category/edit-category/edit-category.component';
import { EditItemComponent } from './layout/manage-items/edit-item/edit-item.component';
import { UpdateStockComponent } from './layout/manage-items/update-stock/update-stock.component';
import { CustomerInfoComponent } from './layout/customer-info/customer-info.component';
import { FeedbackComponent } from './layout/manage-items/feedback/feedback.component';
import { AddStaffComponent } from './layout/manage-staff/add-staff/add-staff.component';
import { ViewStaffComponent } from './layout/manage-staff/view-staff/view-staff.component';
import { ManageOrdersComponent } from './layout/manage-orders/manage-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    LayoutComponent,
    CategoryComponent,
    ManageItemsComponent,
    ViewCategoryComponent,
    ViewItemsComponent,
    ConfirmModelComponent,
    EditCategoryComponent,
    EditItemComponent,
    UpdateStockComponent,
    CustomerInfoComponent,
    FeedbackComponent,
    AddStaffComponent,
    ViewStaffComponent,
    ManageOrdersComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgbModule,
    DataTablesModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmModelComponent]
})
export class AppModule { }

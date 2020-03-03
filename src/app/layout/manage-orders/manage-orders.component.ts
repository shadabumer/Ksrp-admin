import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Order } from 'src/app/models/order.model';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/shared/orders.service';
import { UsersService } from 'src/app/shared/users.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  isOrdersLoaded: boolean = false;
  dtOptions: DataTables.Settings = {};
  subscription: Subscription[] = [];
  userIds: any[] = [];
  orderStatus: string;


  constructor(private orderService: OrdersService,
    private userService: UsersService) {
    let subscription: Subscription = this.userService.getAllUsers().subscribe((userData: User[]) => {
      console.log('userData:', userData);
      userData.forEach(user => this.userIds.push(user.id));
      console.log('user ids:', this.userIds);
      this.getOrders();
    });
    if (subscription)
      this.subscription.push(subscription);
   }

  ngOnInit() {
    // let subscription: Subscription = this.orderService.getOrders("").subscribe( data => {
    //   console.log('orders data:', data);
    // })
  }

  getOrders() {
    this.userIds.forEach(id => {
      this.orderService.getOrders(id).subscribe( (ordersData: any[]) => {
        ordersData.forEach(order => this.orders.push(order))
        console.log('final orders', this.orders);
        this.isOrdersLoaded = true;
      })
    })
  }

  onSubmit() {
    console.log('orders status:', this.orderStatus);
  }
  ngOnDestroy() {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

}

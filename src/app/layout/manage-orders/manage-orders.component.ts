import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Order } from 'src/app/models/order.model';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/shared/orders.service';
import { UsersService } from 'src/app/shared/users.service';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  isOrdersLoaded: boolean = false;
  dtOptions: DataTables.Settings = {};
  subscriptions: Subscription[] = [];
  userIds: any[] = [];
  orderStatus: string;
  statusForm: FormGroup;

  DifferentStatus = [
    'pending',
    'dispatched',
    'delivered',
    'cancelled'
  ]


  constructor(private orderService: OrdersService,
    private userService: UsersService) {
    let subscription: Subscription = this.userService.getAllUsers().subscribe((userData: User[]) => {
      console.log('userData:', userData);
      userData.forEach(user => this.userIds.push(user.id));
      console.log('user ids:', this.userIds);
      this.getOrders();
    });
    if (subscription)
      this.subscriptions.push(subscription);
   }

  ngOnInit() {
    this.statusForm = new FormGroup({
      'orderStatus': new FormControl(null),
    })
    // let subscription: Subscription = this.orderService.getOrders("").subscribe( data => {
    //   console.log('orders data:', data);
    // })
  }

  getOrders() {
    this.userIds.forEach(id => {
      let subscription: Subscription =  this.orderService.getOrders(id)
      .subscribe( (ordersData: any[]) => {
        ordersData.forEach(order => this.orders.push({...order, userId: id}))
        console.log('final orders', this.orders);
        this.isOrdersLoaded = true;
      })
      if (subscription) { this.subscriptions.push(subscription) }
    })
  }

  onSubmit(order: Order) {
    const updatedStatus = this.statusForm.controls.orderStatus.value
      ? this.statusForm.controls.orderStatus.value
      : order.status;
    
    this.orderService.updateOrderStatus(order.userId, order.id, updatedStatus)
    .then(() => {
      this.isOrdersLoaded = false;
      this.orders = [];
      this.getOrders();
    })

  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

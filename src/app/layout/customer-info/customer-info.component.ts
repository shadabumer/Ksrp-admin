import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/shared/users.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModelComponent } from '../components/confirm-model/confirm-model.component';
import { Address } from 'src/app/models/address.model';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit, OnDestroy {

  users: User[];
  isUsersLoaded: boolean = false;
  dtOptions: DataTables.Settings = {};
  subscriptions: Subscription[] = [];
  currentAddress: Address;

  constructor(public userService: UsersService,
    private modalService: NgbModal) { }

  ngOnInit() {
    let subscription: Subscription = this.userService.getAllUsers()
    .subscribe((users: User[]) => {
      this.users = users;
      this.isUsersLoaded = true;
    })
    if(subscription)
      this.subscriptions.push(subscription);
  }

  viewAddress(user: User) {
   let subscription: Subscription = this.userService.getAddress(user.id)
   .subscribe((address: Address) => {
      this.currentAddress = address;
    });
    if(subscription)
      this.subscriptions.push(subscription);
  }

  deleteModal(user: User) {
    let deleteUser = {
      ...user,
      name: user.firstName + ' ' + user.lastName
    }
    console.log('delete user:', deleteUser)
    const modalRef = this.modalService.open(ConfirmModelComponent);
    modalRef.componentInstance.deleteObject = deleteUser;
    modalRef.componentInstance.deleteTitle = 'User';
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

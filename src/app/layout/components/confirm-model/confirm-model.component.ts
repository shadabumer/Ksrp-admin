import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/shared/category.service';
import { ManageItemsService } from 'src/app/shared/manage-items.service';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-confirm-model',
  templateUrl: './confirm-model.component.html',
  styleUrls: ['./confirm-model.component.scss']
})

export class ConfirmModelComponent implements OnInit {

  @Input() deleteObject: any;
  @Input() deleteTitle: string;

  constructor(public modal: NgbActiveModal,
    public categorySerivce: CategoryService,
    public itemService: ManageItemsService,
    public userService: UsersService) { }

  ngOnInit() {
  }

  confirmDelete(id: string) {
    if (this.deleteTitle === 'Category')
      this.categorySerivce.deleteCategory(id);
    else if (this.deleteTitle === 'Item')
      this.itemService.deleteItem(id);
    else if (this.deleteTitle === 'User')
      this.userService.deleteUser(id);
    else {
      console.log('title not found!');
    }
    this.modal.close('Ok click');
  }

}

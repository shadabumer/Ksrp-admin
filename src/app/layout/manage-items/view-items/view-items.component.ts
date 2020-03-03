import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ManageItemsService } from 'src/app/shared/manage-items.service';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModelComponent } from '../../components/confirm-model/confirm-model.component';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.scss']
})
export class ViewItemsComponent implements OnInit {

  items: Item[];
  isItems: boolean = false;
  dtOptions: DataTables.Settings = {};

  constructor(private itemService: ManageItemsService,
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit() {
    this.itemService.getItems()
      .pipe(map(document => {
        return document.map((changes: any) => {
          return {
            id: changes.payload.doc.id,
            ...changes.payload.doc.data(),
          }
        })
      }))
      .subscribe((itemsList: any) => {
        this.items = itemsList;
        this.isItems = true;
        // console.log('items:', this.items);
      })

  }

  editItem(item: Item) {
    this.router.navigate(['edit-item'], { queryParams: item })
  }

  feedback(item: Item) {
    console.log('feedback is pressed.');
    this.router.navigate(['feedback'], { queryParams: item });
  }

  deleteModal(item: Item) {
    const modalRef = this.modalService.open(ConfirmModelComponent);
    modalRef.componentInstance.deleteObject = item;
    modalRef.componentInstance.deleteTitle = 'Item';
  }

}

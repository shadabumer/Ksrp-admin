import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Item } from 'src/app/models/item.model';
import { ManageItemsService } from 'src/app/shared/manage-items.service';
import { map } from 'rxjs/operators';
import { Stock } from 'src/app/models/stock.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.scss']
})
export class UpdateStockComponent implements OnInit, OnDestroy {
  items: Item[];
  isItems: boolean = false;
  isStockLoaded: boolean = false;
  dtOptions: DataTables.Settings = {};
  stocks: Stock[];
  subscriptions: Subscription[] = [];

  constructor(private itemService: ManageItemsService) { }

  ngOnInit() {
    let itemSubscribe: Subscription = this.itemService.getItems()
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
      });
    this.subscriptions.push(itemSubscribe);

    let stockSubscribe: Subscription = this.getAllStocks().subscribe((stocks: Stock[]) => { 
      this.stocks = stocks;
      this.isStockLoaded = true;
    });
    this.subscriptions.push(stockSubscribe);
  }

  updateStock(id: string, stock: Stock) {
    return this.itemService.updateStock(id, stock);
  }

  getStock(id: string) {
    return this.itemService.getStock(id);
  }
  getAllStocks() {
    return this.itemService.getAllStocks();
  }

  onSubmit(id: string, stockNumber: string) {
    console.log('stock number:', stockNumber);
    if (isNaN(parseInt(stockNumber)) || parseInt(stockNumber) <= 0) {
      return
    }
    let stock: Stock = {
      stock: parseInt(stockNumber)
    };
    this.updateStock(id, stock);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageItemsService } from 'src/app/shared/manage-items.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Item } from 'src/app/models/item.model';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/shared/category.service';
import { map } from 'rxjs/operators';
import { urlValidator } from 'src/app/helpers/imageUrl.validators';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

  currentItem: any;
  categories: Category[];
  itemForm: FormGroup;
  isUpdated: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public itemService: ManageItemsService,
    public categoryService: CategoryService,
    public router: Router
  ) { }

  ngOnInit() {
    this.currentItem = this.route.snapshot.queryParams;
    console.log('currentItem:', this.currentItem);

    //== Fetching all the available categories
    this.categoryService.getCategories()
      .pipe(map((document) => {
        return document.map( (changes: any) => {
          return {
            id: changes.payload.doc.id,
            ...changes.payload.doc.data(),
            // imageUrl: changes.payload.doc.data().imageUrl,
          }
        })
      }))
      .subscribe((categoryList: any) => {
        this.categories = categoryList;
        console.log(this.categories);
      })
    //=== end of fetching categories

    // reactive form control
    this.itemForm = new FormGroup({
      'name': new FormControl(this.currentItem.name, [Validators.required]),
      'imageUrl': new FormControl(this.currentItem.imageUrl, [Validators.required, urlValidator]),
      'categoryId': new FormControl(this.currentItem.categoryId, [Validators.required]),
      'price': new FormControl(this.currentItem.price, [Validators.required]),
      'description': new FormControl(this.currentItem.description, [Validators.required]),
      'category': new FormControl(this.currentItem.category, [Validators.required]),
      'units': new FormControl(this.currentItem.units, [Validators.required]),
      'about': new FormControl(this.currentItem.about, [Validators.required]),
      'status': new FormControl(this.currentItem.status, [Validators.required])
    })
    this.itemForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
    // == form control ends

    // this.itemForm.setValue({
    //   'name': this.currentItem.name
    // })

  }

  get f() { return this.itemForm.controls; }

  changeCategory(e) {
    this.f.categoryId.setValue(e.target.value, {
      onlySelf: true
    })
  }

  onSubmit() {
    // console.log('updated Item:', this.f)
    const selectedCategory = this.categories.find(category => this.f.category.value === category.id)  // getting the selected category from select option
    const newItem: Item = {
      name: this.f.name.value,
      imageUrl: this.f.imageUrl.value,
      categoryId: this.f.category.value,
      category: selectedCategory ? selectedCategory.name: this.currentItem.category,
      price: this.f.price.value,
      description: this.f.description.value,
      units: this.f.units.value,
      about: this.f.about.value,
      status: this.f.status.value,
      amount: 1
    }
    this.itemService.updateItem(this.currentItem.id, newItem)
    .then(success => {
      this.isUpdated = true;
    })
    .catch(error => {
      console.log(error);
    });
    console.log('new item:', newItem);
    console.log('category:', selectedCategory)

  }

}

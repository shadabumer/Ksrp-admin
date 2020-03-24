import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/shared/category.service';
import { map } from 'rxjs/operators';
import { ManageItemsService } from 'src/app/shared/manage-items.service';
import { Item } from 'src/app/models/item.model';
import { urlValidator } from 'src/app/helpers/imageUrl.validators';

@Component({
  selector: 'app-manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.scss']
})
export class ManageItemsComponent implements OnInit {
  itemForm: FormGroup;
  categories: Category[];
  isSubmitted: boolean = false;

  constructor(private categoryService: CategoryService, private itemService: ManageItemsService) { }

  ngOnInit() {
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

    this.itemForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'imageUrl': new FormControl(null, [Validators.required, urlValidator]),
      'categoryId': new FormControl(null),
      'price': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'category': new FormControl(null, [Validators.required]),
      'units': new FormControl(null, [Validators.required]),
      'about': new FormControl(null, [Validators.required]),
      'status': new FormControl(null)
    })
    this.itemForm.statusChanges.subscribe(
      (status) => console.log(status)
    );

    // setting default values
    // this.itemForm.setValue({
    //   'status': true
    // })
  }

  get f() { return this.itemForm.controls; }

  changeCategory(e) {
    this.f.categoryId.setValue(e.target.value, {
      onlySelf: true
    })
  }

  onSubmit() {
    const selectedCategory = this.categories.find(category => this.f.category.value === category.id)  // getting the selected category from select option
    let item: Item = {
      name: this.f.name.value,
      imageUrl: this.f.imageUrl.value,
      categoryId: this.f.category.value,
      category: selectedCategory.name,
      price: this.f.price.value,
      description: this.f.description.value,
      units: this.f.units.value,
      about: this.f.about.value,
      status: true,
      amount: 1
    }
    console.log('product:', item)
    this.itemService.createItem(item).then(success => this.isSubmitted = true);
    this.itemForm.reset();
  }

}

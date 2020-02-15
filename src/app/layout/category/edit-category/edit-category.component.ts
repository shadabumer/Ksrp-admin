import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/shared/category.service';
import { Category } from 'src/app/models/category.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  currentCategory: any;
  categoryForm: FormGroup;

  constructor (
    public route: ActivatedRoute,
    public categoryService: CategoryService,
    public router: Router
  ) { }

  ngOnInit() {
    this.currentCategory = this.route.snapshot.queryParams;
    console.log('category:', this.currentCategory)

    this.categoryForm = new FormGroup({
      'name': new FormControl(null),
      'imageUrl': new FormControl(null)
    })
    this.categoryForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
  }

  get f() { return this.categoryForm.controls; }

  onSubmit() {
    let newCategory: Category = {
      name: this.f.name.value ? this.f.name.value : this.currentCategory.name,
      imageUrl: this.f.imageUrl.value ? this.f.imageUrl.value : this.currentCategory.imageUrl
    };
    this.categoryService.updateCategory(this.currentCategory.id, newCategory);
    this.categoryForm.reset();

  }

}

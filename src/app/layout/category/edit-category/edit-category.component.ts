import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/shared/category.service';
import { Category } from 'src/app/models/category.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { urlValidator } from 'src/app/helpers/imageUrl.validators';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  currentCategory: any;
  categoryForm: FormGroup;
  isUpdated: boolean = false;

  constructor (
    public route: ActivatedRoute,
    public categoryService: CategoryService,
    public router: Router
  ) { }

  ngOnInit() {
    this.currentCategory = this.route.snapshot.queryParams;
    console.log('category:', this.currentCategory)

    this.categoryForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'imageUrl': new FormControl(null, [Validators.required, urlValidator])
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
    this.categoryService.updateCategory(this.currentCategory.id, newCategory)
    .then(success => {
      this.isUpdated = true;
      this.categoryForm.reset();
    })
    .catch(error => {
      console.log(error);
    });

  }

}

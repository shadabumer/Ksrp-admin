import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/models/category.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/category.service';
import { urlValidator } from 'src/app/helpers/imageUrl.validators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category: Category;
  categoryForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(public formBuilder: FormBuilder, public categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'imageUrl': new FormControl(null, [Validators.required, urlValidator])
    })
    this.categoryForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
  }

  // convenience getter for easy access to form fields
  get f() { return this.categoryForm.controls; }

  onSubmit() {
    let category: Category = {
      name: this.f.name.value,
      imageUrl: this.f.imageUrl.value
    };
    this.categoryService.createCategory(category).then(success => {
      this.isSubmitted = true;
      this.categoryForm.reset();
    })
    .catch(error => {
      console.log(error);
    });
    console.log('form:', category);
  }
}

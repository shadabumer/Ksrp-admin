import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/models/category.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category: Category;
  categoryForm: FormGroup;
  constructor(public formBuilder: FormBuilder, public categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'imageUrl': new FormControl(null, [Validators.required])
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
    this.categoryService.createCategory(category);
    console.log('form:', category);
    this.categoryForm.reset();
  }
}

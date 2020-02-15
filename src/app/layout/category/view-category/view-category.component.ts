import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/shared/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModelComponent } from '../../components/confirm-model/confirm-model.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {

  categories: Category[];
  constructor(public categoryService: CategoryService,
    private modalService: NgbModal,
    public router: Router) { }

  ngOnInit() {
    this.categoryService.getCategories()
      .pipe(map((document) => {
        return document.map( changes => {
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
  }

  deleteModal(category: Category) {
    const modalRef = this.modalService.open(ConfirmModelComponent);
    modalRef.componentInstance.deleteObject = category;
    modalRef.componentInstance.deleteTitle = 'Category';
  }

  editCategory(category: Category) {
    // this.router.navigate(['edit-category'], {queryParams: { category }});
    // console.log('EditCategory:', category)
    this.router.navigate(['edit-category'], {queryParams: { id: category.id, name: category.name, imageUrl: category.imageUrl }});
  }

}

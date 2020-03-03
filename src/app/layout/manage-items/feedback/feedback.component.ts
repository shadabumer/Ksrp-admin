import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { ManageItemsService } from 'src/app/shared/manage-items.service';
import { DataTablesModule } from 'angular-datatables';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  currentItem: any;
  feedbacks: Feedback[] = [];
  isFeedbacksLoaded: boolean = false;
  dtOptions: DataTables.Settings = {};


  constructor(public route: ActivatedRoute,
    private itemService: ManageItemsService) { }

  ngOnInit() {
    this.currentItem = this.route.snapshot.queryParams;
    this.itemService.getFeedback(this.currentItem.id)
    .subscribe((feedbackData: Feedback[]) => {
      console.log('feedbacks:', feedbackData);
      this.feedbacks = feedbackData;
      this.isFeedbacksLoaded = true;
    })
  }

}

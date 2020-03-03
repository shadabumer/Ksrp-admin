import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Staff } from 'src/app/models/staff.model';
import { StaffService } from 'src/app/shared/staff.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.scss']
})
export class ViewStaffComponent implements OnInit, OnDestroy {

  staffs: Staff[] = [];
  isStaffsLoaded: boolean = false;
  dtOptions: DataTables.Settings = {};
  subscription: Subscription;


  constructor(private staffSerivce: StaffService) { }

  ngOnInit() {
    this.subscription = this.staffSerivce.getAllStaff()
      .subscribe((staffData: Staff[]) => {
        console.log('All staff:', staffData);
        this.staffs = staffData;
        this.isStaffsLoaded = true;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

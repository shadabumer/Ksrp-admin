import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Staff } from 'src/app/models/staff.model';
import { StaffService } from 'src/app/shared/staff.service';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {

  genders = ['male', 'female'];
  staffForm: FormGroup;

  constructor(private staffService: StaffService) { }

  ngOnInit() {
    this.staffForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'phoneNumber': new FormControl(null, [Validators.required]),
      'dob': new FormControl(null, [Validators.required]),
      'doj': new FormControl(null, [Validators.required]),
      'gender': new FormControl(null, [Validators.required]),
      'salary': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required])
    })
  }

  get f() { return this.staffForm.controls; }


  onSubmit() {
    const staff: Staff = {
      name: this.f.name.value,
      phoneNumber: this.f.phoneNumber.value,
      dob: this.f.dob.value,
      doj: this.f.doj.value,
      gender: this.f.gender.value,
      salary: this.f.salary.value,
      address: this.f.address.value
    }

    console.log('staff:', staff);
    this.staffService.createStaff(staff);
    this.staffForm.reset();
  }

}

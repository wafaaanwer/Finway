import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CountryModel } from 'src/app/core/models/country/country.model';
import { PersonModel } from 'src/app/core/models/person/person.model';
import { CountryService } from 'src/app/core/services/country.service';
import { PersonService } from 'src/app/core/services/person.service';

@Component({
  selector: 'app-person-add-edit',
  templateUrl: './person-add-edit.component.html',
  styleUrls: ['./person-add-edit.component.scss']
})
export class PersonAddEditComponent implements OnInit {
  personForm!: FormGroup;
  file:any = null;
  @Input() personAddEdit: PersonModel | undefined;
  @Input() countries: CountryModel[] = [];
  @Output() add = new EventEmitter<PersonModel>();
  @Output() edit = new EventEmitter<PersonModel>();
  @Output() cancel = new EventEmitter<void>();
  personId: number | undefined;
  title: string ="";

  constructor(private personService: PersonService, public datePipe: DatePipe, private countryService: CountryService,    private activatedRoute: ActivatedRoute
    ) {
    this.personForm = new FormGroup(
      {
        id: new FormControl(),
        countryId: new FormControl(),
        email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        name: new FormControl(null, [Validators.required]),
        dateOfBirh: new FormControl('', [Validators.required])
      },
      //{ validators: this.validateDateOfBirth }
    );
    this.countryService.getAll().subscribe(result =>{
      console.log(result);
      this.countries = result;
    })
   }

  ngOnInit() {
    this.personId = this.activatedRoute.snapshot.params?.['id'];
    if (this.personId?.toString() !== '0') {
      this.title = 'Edit Person';

    } else{
      this.title = 'Add Person';

    }
    if (this.personAddEdit !== undefined) {
      this.personForm.patchValue({
        id: this.personAddEdit!.id,
        countryId: this.personAddEdit!.country?.id,
        nameEn: this.personAddEdit!.name,
        date: this.datePipe.transform(this.personAddEdit!.dateOfBirh, 'yyyy-MM-dd'),
      });
    }
  }
  onReset() {
    this.cancel.emit();
    this.personForm.reset();
  }
  onSubmit() {
    if (this.personForm.valid) {
      this.personAddEdit = this.personForm.getRawValue();
        if (this.personAddEdit?.id == undefined) {
        this.personService.addPerson(this.personAddEdit!)
          .subscribe(() => {
            this.add.emit(this.personAddEdit);
          });
      }
      else {
        this.personService.editPerson(this.personAddEdit)
          .subscribe({
            next: () => {
              this.edit.emit(this.personAddEdit);
            }
          })
      }
    }
  }
   validateDateOfBirth(control: AbstractControl): { [key: string]: any } | null {
    const dateOfBirth = control.get('dateOfBirth');
    const age = this.calculateAge(dateOfBirth?.value);
  
    // check if date is valid and person is between 18 and 100 years old
    if (isNaN(dateOfBirth?.value.getTime()) || age < 18 && age > 100) {
      return { 'invalidDateOfBirth': true };
    }
  
    return null;
  }
   calculateAge(birthday: Date) {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
   }
   onChanges(event:any){
      this.file = event.target.files[0];
   }
   onSelected(event:any){
    console.log(event);
 }
}

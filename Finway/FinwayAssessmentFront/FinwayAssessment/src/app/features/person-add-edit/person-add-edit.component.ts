import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  url: any ;
  selectedCountry?:CountryModel;

  constructor(private personService: PersonService, public datePipe: DatePipe, private countryService: CountryService, 
    private activatedRoute: ActivatedRoute, private router:Router
    ) {
    this.personForm = new FormGroup(
      {
        id: new FormControl(),
        countryId: new FormControl(),
        email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        name: new FormControl(null, [Validators.required]),
        dateOfBirh: new FormControl('', [Validators.required]),
        image:new FormControl()
      },
      { validators: this.validateDateOfBirth }
    );
    this.countryService.getAll().subscribe(result =>{
      console.log(result);
      this.countries = result;
    })
   }

  ngOnInit() {
    this.personId = this.activatedRoute.snapshot.params?.['id'];
    console.log(this.personId);
    if (this.personId !== undefined) {
      this.title = 'Edit Person';
      this.personService.getPersonById(this.personId).subscribe((res) =>{
        this.personAddEdit = res;
        console.log(this.personAddEdit);
        this.personForm.patchValue({
          id: this.personAddEdit!.id,
          countryId: this.personAddEdit!.country?.id,
          name: this.personAddEdit!.name,
          dateOfBirh: this.datePipe.transform(this.personAddEdit!.dateOfBirh, 'yyyy-MM-dd'),
          email: this.personAddEdit!.email,

        });
      });
    } else{
      this.title = 'Add Person';

    }
    
  }

  onReset() {
    this.cancel.emit();
    this.personForm.reset();
  }
  onSubmit() {
    if (this.personForm.valid) {
      this.personAddEdit = this.personForm.getRawValue();
     // this.personAddEdit.country = this.selectedCountry?.id;
        if (this.personId == undefined) {
          console.log("add");
        this.personService.addPerson(this.personAddEdit!)
          .subscribe(() => {
            this.router.navigate(['./persons']);
            this.add.emit(this.personAddEdit);
          });
      }
      else {
        console.log("edit");
        this.personService.editPerson(this.personAddEdit!)
          .subscribe({
            next: () => {
              this.router.navigate(['./persons']);
              this.edit.emit(this.personAddEdit);
            }
          })
      }
    }
  }
   validateDateOfBirth(control: AbstractControl): { [key: string]: any } | null {
    const dateOfBirth = control.get('dateOfBirth');
    let timeDiff = Math.abs(Date.now() - new Date(dateOfBirth?.value).getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    if (age < 0 ||  age > 100) {
      return { 'invalidDateOfBirth': true };
    }
    return null;
  }
 
   onChanges(event:any){
      this.file = event.target.files[0];
      console.log(this.file);
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.url = event?.target?.result;
      };
      this.personForm.patchValue({image:this.file});
   }
   onSelected(value:any){
    console.log(this.selectedCountry);
    this.personForm.patchValue({countryId: value.value});
 }
}

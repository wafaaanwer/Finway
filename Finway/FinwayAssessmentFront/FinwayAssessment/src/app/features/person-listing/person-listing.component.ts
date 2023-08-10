import { Component, OnInit } from '@angular/core';
import { CountryModel } from 'src/app/core/models/country/country.model';
import { PersonModel } from 'src/app/core/models/person/person.model';
import { CountryService } from 'src/app/core/services/country.service';
import { PersonService } from 'src/app/core/services/person.service';

@Component({
  selector: 'app-person-listing',
  templateUrl: './person-listing.component.html',
  styleUrls: ['./person-listing.component.scss']
})
export class PersonListingComponent implements OnInit {
  persons: PersonModel[] = [];
  countries: CountryModel[] = [];

  constructor(private personService: PersonService, private countryService: CountryService){}
  ngOnInit(): void {
    this.filterPersons();
    this.countryService.getAll().subscribe(result =>{
      console.log(result);
      this.countries = result;
    });
  }
  onDeletingPerson(id:number){
    const deletedPersonIndex = this.persons.findIndex(i => i.id == id);
    this.persons.splice(deletedPersonIndex,1);

  }
  filterPersons(countryId?:number){
    this.personService.filterPersons(countryId).subscribe((res) =>{
      this.persons = res;
    });
  }
  onSelected(value:any){
    console.log(value.value);
    this.personService.filterPersons(+value.value).subscribe((res) =>{
      this.persons = res;
    });    
 }
}

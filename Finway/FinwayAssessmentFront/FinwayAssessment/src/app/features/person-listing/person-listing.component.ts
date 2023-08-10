import { Component, OnInit } from '@angular/core';
import { PersonModel } from 'src/app/core/models/person/person.model';
import { PersonService } from 'src/app/core/services/person.service';

@Component({
  selector: 'app-person-listing',
  templateUrl: './person-listing.component.html',
  styleUrls: ['./person-listing.component.scss']
})
export class PersonListingComponent implements OnInit {
  persons: PersonModel[] = [];
  constructor(private personService: PersonService){}
  ngOnInit(): void {
    this.filterPersons();
  }
  onDeletingPerson(id:number){
    const deletedPersonIndex = this.persons.findIndex(i => i.id == id);
    this.persons.splice(deletedPersonIndex,1);

  }
  filterPersons(countryId?:number){
    this.personService.filterPersons(countryId).subscribe((res) =>{
      this.persons = res;
      console.log(this.persons);
    });
  }
}

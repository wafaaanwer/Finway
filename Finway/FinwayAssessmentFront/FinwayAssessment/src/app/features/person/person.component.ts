import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonModel } from 'src/app/core/models/person/person.model';
import { AgePipe } from 'src/app/core/pipes/age.pipe';
import { PersonService } from 'src/app/core/services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  @Input() person : PersonModel | undefined;
  image :string | File = "./assets/images/userImage.png";
  @Output() deletePerson = new EventEmitter<number>();
  //age: AgePipe;
  constructor(private personService: PersonService){
    this.person = undefined;
  }
  ngOnInit(): void {
    if(this.person!.image != null){
      this.image = this.person?.image!;
    }
  }
  onPrint(){
    console.log(this.person);
  }
  onDelete(){
    this.personService.deletePerson(this.person?.id!).subscribe(() => {
      this.deletePerson.emit(this.person?.id!);
    });
  }
}

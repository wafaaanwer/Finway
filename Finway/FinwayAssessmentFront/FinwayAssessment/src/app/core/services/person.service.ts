import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PersonModel } from '../models/person/person.model';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  baseUrl = environment.apiUrl + 'Persons/';
  constructor(private httpClient: HttpClient
    //, private routerHelper: RouterHelper
    ) { }
    
  addPerson(person: PersonModel){
    console.log("from Add Service");
    const formatDate = new FormData();
    formatDate.append("image", person.image!);
    formatDate.append("name", person.name!);
    formatDate.append("email", person.email!);
    formatDate.append("dateOfBirh", person.dateOfBirh!.toString());
    formatDate.append("countryId", person.countryId!.toString());
    return this.httpClient.post(`${this.baseUrl}AddPerson`, formatDate);
  }
  editPerson(person: PersonModel){
    console.log(person.image);
    const formatDate = new FormData();
    formatDate.append("id", person.id!.toString());
    formatDate.append("image", person.image!);
    formatDate.append("name", person.name!);
    formatDate.append("email", person.email!);
    formatDate.append("dateOfBirh", person.dateOfBirh!.toString());
    formatDate.append("countryId", person.countryId!.toString());
    return this.httpClient.put(`${this.baseUrl}EditPerson`, formatDate);
  }
  deletePerson(id:number){
    return this.httpClient.delete(`${this.baseUrl}DeletePerson/${id}`);
  }
  getPersonById(id:number){
    return this.httpClient.get(`${this.baseUrl}GetPerson/${id}`);
  }
  filterPersons(countryId?: number){
    
    return this.httpClient.post<PersonModel[]>(`${this.baseUrl}FilterPerson`, countryId);
  }
}

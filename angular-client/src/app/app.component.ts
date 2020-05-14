import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selected = 'mongo';
  flag: any;
  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  // Declare empty list of people
  people: any[] = [];

  constructor(private http: HttpClient) {
    this.flag = 'mongo';
  }

  // Angular 2 Life Cycle event when component has been initialized
  ngOnInit() {
    this.getAllPeople();
  }

  // Add one person to the API
  addPerson(name, age) {
    if (this.flag === 'mongo') {
      this.http.post(`${this.API}/users`, {name, age})
      .subscribe(() => {
        this.getAllPeople();
      });
    } else if (this.flag === 'redis') {
      const url = `${this.API}/redis/set/${name}/?${name}=${age}`;
      console.log(url);
      this.http.get(url).subscribe((data) => {
        console.log(data);
      });
    } else {
      console.log('mysql');
    }
  }

  // Get all users from the API
  getAllPeople() {
    this.http.get(`${this.API}/users`)
      .subscribe((people: any) => {
        console.log(people);
        this.people = people;
      });
  }
}

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
  nameDB: any;
  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  // Declare empty list of people
  people: any[] = [];

  constructor(private http: HttpClient) {
    this.flag = 'mongo';
  }

  // Angular 2 Life Cycle event when component has been initialized
  ngOnInit() {
    this.getAllPeopleMongo();
    this.nameDB = 'Mongo DB';
  }

  // Add one person to the API
  addPerson(name, age) {
    if (this.flag === 'mongo') {
      this.http.post(`${this.API}/users`, { name, age })
        .subscribe(() => {
          this.getAllPeopleMongo();
        });
    } else if (this.flag === 'redis') {
      const url = `${this.API}/redis/set/${name}/?${name}=${age}`;
      // console.log(url);
      this.http.get(url).subscribe((data) => {
        this.getAllPeopleRedis();
      });
    } else if (this.flag === 'mysql') {
      this.http.post(`${this.API}/mysql/user`, { name, age })
        .subscribe(() => {
          this.getAllPeopleMysql();
        });
    } else {
      console.log('NEO4J');
    }
  }

  getAllPeopleMysql() {
    this.nameDB = 'MySQL';
    console.log('DATO ingresado');
    this.http.get(`${this.API}/mysql/users`)
      .subscribe((people: any) => {
        //console.log(people);
        this.people = people.data;
      });
  }
  // Get all users from the API
  getAllPeopleMongo() {
    this.nameDB = 'Mongo DB';
    this.http.get(`${this.API}/users`)
      .subscribe((people: any) => {
        console.log(people);
        this.people = people;
      });
  }

  getAllPeopleRedis() {
    this.nameDB = 'Redis';
    const peoples = [];
    this.http.get(`${this.API}/redis/users`)
      .subscribe((people: any) => {
        console.log(people);
        this.people = people.data;
      });
  }
}

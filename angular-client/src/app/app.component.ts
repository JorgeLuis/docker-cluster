import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectecDB = 'mongo';
  API = 'http://localhost:3000';
  people: any[] = [];
  namesDbs = [
    { name: 'mongo', img: "../assets/mongo.png" },
    { name: 'redis', img: "../assets/redis.png" },
    { name: 'mysql', img: "../assets/mysql.png" },
    { name: 'neo4j', img: "../assets/neo4j.png" }
  ];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getUsers('mongo');
  }

  getUsers(nameDB) {
    console.log('DB NAME: ', nameDB);
    this.http.get(`${this.API}/server/users/${nameDB}`)
      .subscribe((peoples: any) => {
        console.log('Respuesta del Back: ', peoples);
        this.people = peoples.data;
      });
  }

  postUser(name, age) {
    this.http.post(`${this.API}/server/user/${this.selectecDB}`, { name, age })
      .subscribe(() => {
        this.getUsers(this.selectecDB);
      });
  }

  deletedUsers(nameDB) {
    console.log('DB NAME: ', nameDB);
    this.http.delete(`${this.API}/server/users/${nameDB}`)
      .subscribe((peoples: any) => {
        this.people= peoples.users;
        console.log('Respuesta del Back: ', peoples);
      });
  }

}

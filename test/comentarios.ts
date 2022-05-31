
   /*  <div class="row">
    <div class="col-md-2"> <button type="button" (click)="addPerson(name.value, age.value)"
        class="btn btn-primary">Agregar</button></div>
    <div class="col-md-2">
      <label class="my-margin" for="mongo">
        <input type="radio" id="mongo" name="motor" [(ngModel)]="flag" value="mongo" (click)="getUsers('mongo')">
        Mongo <img class="my-img" src="../assets/mongo.png" alt="Mongo">
      </label>
    </div>
    <div class="col-md-2">
      <label class="my-margin" for="redis">
        <input type="radio" id="redis" name="motor" [(ngModel)]="flag" value="redis" (click)="getUsers('redis')">
        Redis <img class="my-img" src="../assets/redis.png" alt="Redis"></label>
    </div>
    <div class="col-md-2">
      <label class="my-margin" for="mysql">
        <input type="radio" id="mysql" name="motor" [(ngModel)]="flag" value="mysql" (click)="getUsers('mysql')">
        MySQL <img class="my-img" src="../assets/mysql.png" alt="MySql"></label>
    </div>
    <div class="col-md-2">
      <label class="my-margin" for="neo4j">
        <input type="radio" id="neo4j" name="motor" [(ngModel)]="flag" value="neo4j" (click)="getUsers('neo4j')">
        Neo4j <img class="my-img" src="../assets/neo4j.png" alt="Neo4J"></label>
    </div>
  </div>  */

function getAllPeopleMysql() {
    this.nameDB = 'MySQL';
    console.log('DATO ingresado');
    this.http.get(`${this.API}/mysql/users`)
      .subscribe((people: any) => {
        //console.log(people);
        this.people = people.data;
      });
  }
  // Get all users from the API
  function getAllPeopleMongo() {
    this.nameDB = 'Mongo DB';
    this.http.get(`${this.API}/users`)
      .subscribe((people: any) => {
        //console.log(people);
        this.people = people;
      });
  }

  function getAllPeopleRedis() {
    this.nameDB = 'Redis';
    const peoples = [];
    this.http.get(`${this.API}/redis/users`)
      .subscribe((people: any) => {
        //console.log(people);
        this.people = people.data;
      });
  }

 function getAllPeopleNeo4J() {
    this.nameDB = 'Neo4J';

    const peoples = [];
    this.http.get(`${this.API}/neo4j/users`)
      .subscribe((people: any) => {
        //console.log(people);
        this.people = people.data;
      });
  }



function addPerson(name, age) {
    if (this.flag === 'mongo') {
      this.http.post(`${this.API}/mongo/user`, { name, age })
        .subscribe(() => {
          this.getUsers(name);
        });
    } else if (this.flag === 'redis') {
      const url = `${this.API}/redis/set/${name}/?${name}=${age}`;
      // console.log(url);
      this.http.get(url)
      //this.http.post(`${this.API}/redis/user`, { name, age } )
        .subscribe((data) => {
          this.getUsers(name);
      });
    } else if (this.flag === 'mysql') {
      this.http.post(`${this.API}/mysql/user`, { name, age })
        .subscribe(() => {
          this.getUsers(name);
        });
    } else {
      this.http.post(`${this.API}/neo4j/user`, { name, age })
        .subscribe(() => {
          this.getUsers(name);
      });
    }
  }
import { format } from "https://deno.land/std@0.88.0/datetime/mod.ts";

const fecha = format(new Date(), "'Fecha:' dd-MM-yyyy 'Hora:' hh:mm a"); // output : "20-01-2019"
console.log('Inicio:', fecha);

var datos = {
  "name": "DENO-MONGO",
  "age": 21
};

for (let i = 0; i < 1000; i++) {
  const resp2 = await fetch('http://localhost:3000/server/user/mongo', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(datos), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  })

  //console.log('TEST: ', resp2);
  const response = await fetch(`http://localhost:3000/server/users/mongo`);
  const d: any = await response.json();
  /* console.log(`${d.ok} - ${d.db}`);

  const personas = d.data;
  for (const p of personas) {
    console.log(p);
  } */
}


const fechaFin = format(new Date(), "'Fecha:' dd-MM-yyyy 'Hora:' hh:mm a"); // output : "20-01-2019"
console.log('Fin:', fechaFin);
// deno run --allow-net insertMongo.ts
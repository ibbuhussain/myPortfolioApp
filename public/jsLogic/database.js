import pg from "pg";
//----------------------------------------------------------------------------------------------

// Connect to your PostgreSQL database
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "myTodo",
    password: "123456",
    port: 5432,
});


// Connect to the database
await db.connect()  // use await to pause the execution of a function until a promise is resolved
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

//----------------------------------------------------------------------------------------------
//module.export = db;  //CJS - this is require to pass this js to server file app.js

//await db.connect();
export default db; //ES module - this is require to pass this js to server file app.js
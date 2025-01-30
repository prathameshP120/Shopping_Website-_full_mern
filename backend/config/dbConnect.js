import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "backend/config/config.env" });

export const connectDatabase = () => {
  let DB_URI = "";

  if (process.env.NODE_ENV === "DEVELOPMENT") DB_URI = process.env.DB_LOCAL_URI;
  if (process.env.NODE_ENV === "PRODUCTION") DB_URI = process.env.DB_URI;

  mongoose.connect(DB_URI).then((con) => {
    console.log(
      `MongoDB Database connected with HOST: ${con?.connection?.host}`
    );
  });
};

/*
mongoose.connect(DB_URI):

Purpose: This line initiates a connection to the MongoDB database using Mongoose.
mongoose.connect(): This is a function provided by the Mongoose library to establish a connection to the MongoDB database.
DB_URI: This variable holds the URI (Uniform Resource Identifier) of the MongoDB database you want to connect to. It typically includes the protocol (mongodb:// or mongodb+srv://), the hostname, port number (optional), and the database name.
Return Value: mongoose.connect() returns a promise, which allows you to handle the success or failure of the connection asynchronously.




.then((con) => { ... }):
Purpose: This is the promise handling part. The .then() method is called when the promise returned by mongoose.connect() is resolved successfully, meaning the connection to the database is established.
(con) => { ... }: This is an arrow function that gets executed when the connection is successful.
con: This parameter represents the connection object returned by Mongoose when the connec

con?.connection?.host: This accesses the host name of the MongoDB server from the connection object.
con?.: This is optional chaining, a way to safely access nested properties that might not exist. If any part of the chain (con, con.connection, or con.connection.host) is null or undefined, the expression short-circuits and returns undefined instead of throwing an error.


*/

//now we have to push the data into the database

import mongoose from "mongoose";
import products from "./data.js";
import Product from "../models/product.js";

const seedProducts = async () => {
  try {
    await mongoose.connect("mongodb+srv://patilprathameshdilip:jalgaon%40123@cluster0.lbjs4w2.mongodb.net/Cartify?retryWrites=true&w=majority&appName=Cluster0");

    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);
    console.log("Products are added");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};
seedProducts();

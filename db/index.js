// const mongoose = require("mongoose");
require("dotenv").config();
const { Client } = require("pg");

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

client.connect(err => {
  if (err) {
    console.log("error connecting to DB", err);
  } else {
    console.log("connect to DB");
  }
});

// mongoose.Promise = global.Promise;

// const uri = `mongodb+srv://nicholasmiron:${
//   process.env.MONGO_DB_PASSWORD
// }@cluster0-ouctt.mongodb.net/products?retryWrites=true`;
// moongoose.connect(uri, { useNewUrlParser: true });
// mongoose.connect("mongodb://localhost:27017/sdc", { useNewUrlParser: true });

// const dbSchema = mongoose.Schema({
//   name: "String",
//   price: "Number",
//   bulletOne: "String",
//   bulletTwo: "String",
//   bulletThree: "String",
//   sellerName: "String",
//   description: "String",
//   productID: "Number"
// });

// const Desc = mongoose.model("Desc", dbSchema);
// const desc1 = mongoose.model("desc1", dbSchema);

// const getOneByName = productName =>
//   Desc.findOne({ name: { $regex: productName, $options: "gi" } });

// const getOneByName = productName =>
//   desc1.findOne({ name: { $regex: productName, $options: "gi" } });

const getOneByName = (productName, cb) => {
  client.query(
    `SELECT name FROM desc1 WHERE name LIKE '${productName}' LIMIT 1`,
    (err, results) => {
      if (err) {
        console.log(
          "could not load product by name",
          productName,
          " error:",
          err
        );
        cb(err);
      } else {
        cb(null, results);
      }
    }
  );
};

// const getSomeByPartialName = partialName => {
//   const regex = `${partialName}` + "\\w{0,}";
//   return Desc.find({ name: { $regex: regex, $options: "gi" } }).limit(5);
// };

// const getSomeByPartialName = partialName => {
//   const regex = `${partialName}` + "\\w{0,}";
//   return desc1.find({ name: { $regex: regex, $options: "gi" } }).limit(5);
// };

const getSomeByPartialName = (productName, cb) => {
  console.log("productName : ", productName);
  client.query(
    `SELECT name FROM desc1 WHERE name LIKE '%${productName}%' LIMIT 5`,
    (err, results) => {
      if (err) {
        console.log(
          "could not load partial product list by name",
          productName,
          " error:",
          err
        );
        cb(err);
      } else {
        cb(null, results);
      }
    }
  );
};

const addNew = (product, cb) => {
  // console.log("product : ", product);
  const queryVar = `INSERT INTO desc1 (name, price, bulletOne, bulletTwo, bulletThree, sellerName, description) VALUES (
    '${product.name}',
    ${product.price},
    '${product.bulletOne}',
    '${product.bulletTwo}',
    '${product.bulletThree}',
    '${product.sellerName}',
    '${product.description}')`;
  console.log(queryVar);
  client.query(queryVar, (err, results) => {
    if (err) {
      console.log("could not add product :", product, " error:", err);
      cb(err);
    } else {
      cb(null, results);
    }
  });
};

const updateEntry = (product, cb) => {
  const priceQuery = `UPDATE desc1 SET price = (${
    product.price
  }) WHERE productid = ${product.productid}`;
  console.log("productZZZ : ", priceQuery);
  client.query(priceQuery, (err, results) => {
    if (err) {
      console.log("could not update productID :", product, " error:", err);
      cb(err);
    } else {
      cb(null, results);
    }
  });
};

const removeEntry = (product, cb) => {
  const deleteQuery = `DELETE FROM desc1 WHERE productID = ${
    product.productid
  }`;
  console.log("productID : ", deleteQuery);
  client.query(deleteQuery, (err, results) => {
    if (err) {
      console.log("could not delete productID: ", product, " error:", err);
      cb(err);
    } else {
      cb(null, results);
    }
  });
};

module.exports = {
  getOneByName,
  getSomeByPartialName,
  addNew,
  updateEntry,
  removeEntry
  // getOneById,
  // getOneByName,
  // getAll,
  // massAddNew
};

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const arrayString1 = require("./mongoCreateEntriesData").arrayString1;
const arrayString2 = require("./mongoCreateEntriesData").arrayString2;
const arrayString3 = require("./mongoCreateEntriesData").arrayString3;
const priceNumber = require("./mongoCreateEntriesData").priceNumber;
const dummyData = require("./mongoCreateEntriesData").dummyData;
const newRelic = require("newrelic");
const fs = require("fs");
const file = fs.createWriteStream("./big.csv");
const testFile = fs.createWriteStream("./little.csv");
const fileM = fs.createWriteStream("./bigMongo.csv");
const testFileM = fs.createWriteStream("./littleMongo.csv");

// file.write('hey')
// file.end
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("../db/index.js");

app.use(cors());
// app.use(morgan("dev"));
app.use(express.static("dist"));

app.get("/api/products/names", (req, res) => {
  const productId = req.query.name;
  // console.log("productID on server :", productId);
  db.getOneByName(productId, (err, data) => {
    if (err) {
      console.log("error, darn tootin");
      res.end();
    } else {
      res.send(data);
    }
  });
  // .then(results => res.send(results))
  // .catch(() => res.send("failed"));
});

app.get("/api/products/names/partial", (req, res) => {
  const partialName = req.query.name;
  console.log("HERE :", partialName);
  db.getSomeByPartialName(partialName, (err, data) => {
    if (err) {
      console.log("error darn");
    } else {
      res.send(data);
    }
  });
  // .then(results => res.send(results))
  // .catch(err => res.send(err));
});

app.post("/api/products/names/testPost", (req, res) => {
  const newEntry = req.query;
  // console.log("POST :", newEntry);
  db.addNew(newEntry, (err, data) => {
    if (err) {
      console.log("error darn post");
    } else {
      res.send("posted " + data);
    }
  });
});

app.put("/api/products/names/testPatch", (req, res) => {
  const price = req.headers;
  // console.log("PUT :", price);
  db.updateEntry(price, (err, data) => {
    if (err) {
      console.log("error darn put");
    } else {
      res.send("put " + data);
    }
  });
});

app.delete("/api/products/names/testDelete", (req, res) => {
  const deleteProductID = req.headers;
  console.log("POST :", deleteProductID);
  db.removeEntry(deleteProductID, (err, data) => {
    if (err) {
      console.log("error darn delete");
    } else {
      res.send("deleted " + data);
    }
  });
});

// app.post("/temp", (req, res) => {

let longString = "";
let chosenObject = 0;

let multiplierL = 1;
let multiplierB = 1000;
let counter = 0;
let generateData = false;

if (generateData === true) {
  // file.write(
  //   "productID, name, price, bulletOne, bulletTwo, bulletThree, sellerName, description\n"
  // );
  for (let j = 0; j < multiplierB; j++) {
    for (let k = 0; k < 10000; k++) {
      // counter++;
      chosenObject = dummyData[Math.floor(Math.random(0) * 4)];
      //MongoDB Formatting
      // longString =
      //   counter +
      //   "," +
      //   chosenObject.name +
      //   "," +
      //   chosenObject.price +
      //   "," +
      //   chosenObject.bulletOne +
      //   "," +
      //   chosenObject.bulletTwo +
      //   "," +
      //   chosenObject.bulletThree +
      //   "," +
      //   chosenObject.sellerName +
      //   "," +
      //   chosenObject.description +
      //   "\n";
      // file.write(longString);
      // testFile.write(longString);
      //Postgres formatting for truly random and representative data
      //   longString += `{
      //   name: ${arrayString1[Math.floor(Math.random(0) * 101)]},
      //   price: ${priceNumber[Math.floor(Math.random(0) * 101)]},
      //   bulletOne: ${arrayString2[Math.floor(Math.random(0) * 101)]},
      //   bulletTwo: ${arrayString2[Math.floor(Math.random(0) * 101)]},
      //   bulletThree: ${arrayString2[Math.floor(Math.random(0) * 101)]},
      //   sellerName: ${arrayString1[Math.floor(Math.random(0) * 101)]},
      //   description: ${arrayString3[Math.floor(Math.random(0) * 101)]},
      // },`;
      // longString +=
      // JSON.stringify(dummyData[Math.floor(Math.random(0) * 4)]).slice(1) + ",";
      // file.write("hey");

      //PostgreSQL formatting
      longString =
        chosenObject.name +
        "," +
        chosenObject.price +
        "," +
        chosenObject.bulletOne +
        "," +
        chosenObject.bulletTwo +
        "," +
        chosenObject.bulletThree +
        "," +
        chosenObject.sellerName +
        "," +
        chosenObject.description +
        "\n";
      file.write(longString);
    }
    if (j % 100 === 0) console.log(j);
  }
}
file.end();
console.log("done!!!!!!!!!!!!!!!!");

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

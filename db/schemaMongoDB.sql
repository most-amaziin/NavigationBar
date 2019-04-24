db.createCollection("desc1");

mongoimport -d sdc -c desc1 --type csv --file server/bigMongo.csv --headerline

db.desc1.find ( {productID: 10,000,000})
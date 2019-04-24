CREATE DATABASE [IF NOT EXISTS] SDC;

USE SDC;

CREATE TABLE Desc1 (
  productID SERIAL PRIMARY KEY,
  name CHAR(3),
  price DECIMAL(4, 2),
  bulletOne CHAR(3),
  bulletTwo CHAR(3),
  bulletThree CHAR(3),
  sellerName CHAR(3),
  description CHAR(3)
);

--10,000 entries
COPY desc1(name, price, bulletone, bullettwo, bulletthree, sellername, description) FROM '/Users/partypeoplegames/13 weeks/SDC/NavBar/server/little.csv' DELIMITER ',';
--10,000,000 entries
COPY desc1(name, price, bulletone, bullettwo, bulletthree, sellername, description) FROM '/Users/partypeoplegames/13 weeks/SDC/NavBar/server/big.csv' DELIMITER ',';
-- LOAD DATA LOCAL INFILE '/Users/partypeoplegames/13 weeks/SDC/NavBar/server/big.csv'
-- INTO TABLE Desc1
-- FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\r\n';

select * from desc1 where productID = 10000000;
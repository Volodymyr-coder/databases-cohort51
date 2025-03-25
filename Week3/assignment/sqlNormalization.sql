//in table some problem with column food_code (exempl, "C1, C2") include few different data  in one place.

// in column food_description(ex, "Curry, Cake") same problem.

// data column has different type of data like str and Number should be same value str or Num
// I think we can extracted some entities like :


CREATE TABLE IF NOT EXIST members(member_id INT AUTO_INCREMENT,
member_name VARCHAR(150) NOT NULL,
member_address VARCHAR(150) NOT NULL);

CREATE TABLE IF NOT EXIST dinners(
dinner_id INT AUTO_INCREMENT,
dinner_date VARCHAR(150) NOT NULL,
venue_code INT NOT NULL);

CREATE TABLE IF NOT EXIST venues(
venue_code VARCHAR(20),
venue_description VARCHAR(150) NOT NULL);

CREATE TABLE IF NOT EXIST foods(
food_code VARCHAR(150),
food_description VARCHAR(150) NOT NULL);

CREATE TABLE IF NOT EXIST member_dinners (
member_id INT,
dinner_id INT);

CREATE TABLE IF NOT EXIST dinner_foods(
dinner_id INT,
food_code VARCHAR(150));

-- decomposition for 3nf 
CREATE TABLE members (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    member_name VARCHAR(150) NOT NULL,
    member_address VARCHAR(150) NOT NULL
);

CREATE TABLE venues (
    venue_code VARCHAR(10) PRIMARY KEY,
    venue_description VARCHAR(150) NOT NULL
);

CREATE TABLE dinners (
    dinner_id VARCHAR(20) PRIMARY KEY,
    dinner_date DATE NOT NULL,
    venue_code VARCHAR(20) NOT NULL,
    FOREIGN KEY (venue_code) REFERENCES venues(venue_code)
);

CREATE TABLE foods (
    food_code VARCHAR(10) PRIMARY KEY,
    food_description VARCHAR(150) NOT NULL
);

CREATE TABLE member_dinners (
    member_id INT,
    dinner_id VARCHAR(20),
    PRIMARY KEY (member_id, dinner_id),
    FOREIGN KEY (member_id) REFERENCES members(member_id),
    FOREIGN KEY (dinner_id) REFERENCES dinners(dinner_id)
);

CREATE TABLE dinner_foods (
    dinner_id VARCHAR(20),
    food_code VARCHAR(10),
    PRIMARY KEY (dinner_id, food_code),
    FOREIGN KEY (dinner_id) REFERENCES dinners(dinner_id),
    FOREIGN KEY (food_code) REFERENCES foods(food_code)
);

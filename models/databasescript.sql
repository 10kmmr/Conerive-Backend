DROP TABLE IF EXISTS EMAILS;
DROP TABLE IF EXISTS IMAGES;
DROP TABLE IF EXISTS TRIP_BIKE_MEMBERS;
DROP TABLE IF EXISTS TRIP_BIKES;
DROP TABLE IF EXISTS TRIP_CAR_MEMBERS;
DROP TABLE IF EXISTS TRIP_CARS;
DROP TABLE IF EXISTS TRIP_MEMBERS;
DROP TABLE IF EXISTS TRIPS;
DROP TABLE IF EXISTS GROUP_MEMBERS;
DROP TABLE IF EXISTS GROUP_DISPLAY_PICTURES;
DROP TABLE IF EXISTS GROUPS;
DROP TABLE IF EXISTS USER_DISPLAY_PICTURES;
DROP TABLE IF EXISTS USERS;

-- CREATE COMMANDS

CREATE TABLE USERS (
	User_id VARCHAR(100) PRIMARY KEY,
	Name VARCHAR(100) NOT NULL,
	Phone BIGINT(20) NOT NULL,
	UNIQUE(Phone)
);

CREATE TABLE USER_DISPLAY_PICTURES (
	User_id VARCHAR(100) PRIMARY KEY,
	FOREIGN KEY(User_id) REFERENCES USERS(User_id) ON DELETE CASCADE,
	Image_path VARCHAR(100) NOT NULL
);

CREATE TABLE GROUPS (
	Group_id INT AUTO_INCREMENT PRIMARY KEY,
	Group_name VARCHAR(100) NOT NULL,
	Admin_ID VARCHAR(100) NOT NULL,
	FOREIGN KEY(Admin_ID) REFERENCES USERS(User_id) ON DELETE CASCADE,
	UNIQUE(Group_id, Admin_ID)
);

CREATE TABLE GROUP_DISPLAY_PICTURES (
	Group_id INT PRIMARY KEY,
	Image_path VARCHAR(100) NOT NULL,
	FOREIGN KEY(Group_id) REFERENCES GROUPS(Group_id) ON DELETE CASCADE
);

CREATE TABLE GROUP_MEMBERS ( 
	Group_id INT NOT NULL,
	User_id VARCHAR(100) NOT NULL,
	FOREIGN KEY(Group_id) REFERENCES GROUPS(Group_id) ON DELETE CASCADE,
	FOREIGN KEY(User_id) REFERENCES USERS(User_id) ON DELETE CASCADE,
	PRIMARY KEY(Group_id, User_id)
);

CREATE TABLE TRIPS (
	Trip_id INT AUTO_INCREMENT PRIMARY KEY,
	Trip_name VARCHAR(100) NOT NULL,
	Group_id INT NOT NULL,
	FOREIGN KEY(Group_id) REFERENCES GROUPS(Group_id) ON DELETE CASCADE,
	UNIQUE(Trip_id, Group_ID)
);

CREATE TABLE TRIP_MEMBERS ( 
	Trip_id INT NOT NULL,
	User_id VARCHAR(100) NOT NULL,
	FOREIGN KEY(Trip_id) REFERENCES TRIPS(Trip_id) ON DELETE CASCADE,
	FOREIGN KEY(User_id) REFERENCES GROUP_MEMBERS(User_id) ON DELETE CASCADE,
	PRIMARY KEY(Trip_id, User_id)
);

CREATE TABLE TRIP_CARS (
	Car_id INT AUTO_INCREMENT PRIMARY KEY,
	Car_name VARCHAR(100) NOT NULL,
	Driver_id VARCHAR(100) NOT NULL,
	Trip_id INT NOT NULL,
	FOREIGN KEY(Driver_id) REFERENCES TRIP_MEMBERS(User_id) ON DELETE CASCADE,
	FOREIGN KEY(Trip_id) REFERENCES TRIPS(Trip_id) ON DELETE CASCADE,
	UNIQUE(Driver_id, Trip_id)
);

CREATE TABLE TRIP_CAR_MEMBERS (
	Car_id INT NOT NULL,
	User_id VARCHAR(100) NOT NULL,
	FOREIGN KEY(Car_id) REFERENCES TRIP_CARS(Car_id) ON DELETE CASCADE,
	FOREIGN KEY(User_id) REFERENCES TRIP_MEMBERS(User_id) ON DELETE CASCADE,
	PRIMARY KEY(Car_id, User_id)
);

CREATE TABLE TRIP_BIKES (
	Bike_id INT AUTO_INCREMENT PRIMARY KEY,
	Bike_name VARCHAR(100) NOT NULL,
	Rider_id VARCHAR(100) NOT NULL,
	Trip_id INT NOT NULL,
	FOREIGN KEY(Rider_id) REFERENCES TRIP_MEMBERS(User_id) ON DELETE CASCADE,
	FOREIGN KEY(Trip_id) REFERENCES TRIPS(Trip_id) ON DELETE CASCADE,
	UNIQUE(Rider_id, Trip_id)
);

CREATE TABLE TRIP_BIKE_MEMBERS (
	Bike_id INT NOT NULL,
	User_id VARCHAR(100) NOT NULL,
	FOREIGN KEY(Bike_id) REFERENCES TRIP_BIKES(Bike_id) ON DELETE CASCADE,
	FOREIGN KEY(User_id) REFERENCES TRIP_MEMBERS(User_id) ON DELETE CASCADE,
	PRIMARY KEY(Bike_id, User_id)
);

CREATE TABLE IMAGES (
	Image_id INT AUTO_INCREMENT PRIMARY KEY,
	Image_path VARCHAR(100) NOT NULL,
	Image_time DATETIME NOT NULL,
	Image_comment VARCHAR(100) NOT NULL,
	Image_lat DOUBLE NOT NULL,
	Image_lng DOUBLE NOT NULL,
	User_id VARCHAR(100) NOT NULL,
	FOREIGN KEY(User_id) REFERENCES TRIP_MEMBERS(User_id) ON DELETE CASCADE,
	Trip_id INT NOT NULL,
	FOREIGN KEY(Trip_id) REFERENCES TRIPS(Trip_id) ON DELETE CASCADE
);

CREATE TABLE EMAILS (
	Email_id VARCHAR(100) NOT NULL,
	User_id VARCHAR(100) NOT NULL,
	FOREIGN KEY(User_id) REFERENCES USERS(User_id) ON DELETE CASCADE,
	PRIMARY KEY(Email_id, User_id),
	UNIQUE(Email_id) 	
);

-- Tables to be added
-- google drive auth
-- instagram auth
-- facebook auth

-- INSERT COMMANDS

INSERT INTO USERS(
	User_id,
	Name,
	Phone
) VALUES 
("UID", "NAME", 9900990099);

INSERT INTO USER_DISPLAY_PICTURES(
	User_id,
	Image_path
) VALUES 
("UID", "d:some/path");

INSERT INTO GROUPS(
	Group_name,
	Admin_ID
) VALUES 
("DevGroup", "UID");

INSERT INTO GROUP_DISPLAY_PICTURES(
	Group_id,
	Image_path
) VALUES 
(1, "d:some/other/path");

INSERT INTO GROUP_MEMBERS ( 
	Group_id,
	User_id
) VALUES 
(1, "UID");

INSERT INTO TRIPS (
	Trip_name,
	Group_id 
) VALUES 
("devTrip1", 1);

INSERT INTO TRIP_MEMBERS ( 
	Trip_id,
	User_id
) VALUES
(1, "UID");

INSERT INTO TRIP_CARS (
	Car_name,
	Driver_id,
	Trip_id
) VALUES 
("Maruti Suzuki", "UID", 1);

INSERT INTO TRIP_CAR_MEMBERS (
	Car_id,
	User_id
) VALUES 
(1, "UID");

INSERT INTO  TRIP_BIKES (
	Bike_name,
	Rider_id,
	Trip_id
) VALUES
("Pulsar 200", "UID", 1);

INSERT INTO TRIP_BIKE_MEMBERS (
	Bike_id,
	User_id
) VALUES
(1, "UID");

INSERT INTO IMAGES (
	Image_path,
	Image_time,
	Image_comment,
	Image_lat,
	Image_lng,
	User_id,
	Trip_id
) VALUES
("d:some/image/path", NOW(), "i shot this", 10.10, 12.12, "UID", 1);

INSERT INTO EMAILS (
	Email_id,
	User_id
) VALUES
("dev@gmail.com", "UID");
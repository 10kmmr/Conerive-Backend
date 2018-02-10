DROP DATABASE conerivedev;
CREATE DATABASE conerivedev;
USE conerivedev;

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
	Image_url VARCHAR(100) NOT NULL
);

CREATE TABLE GROUPS (
	Group_id INT AUTO_INCREMENT PRIMARY KEY,
	Group_name VARCHAR(100) NOT NULL,
	Admin_id VARCHAR(100) NOT NULL,
	FOREIGN KEY(Admin_ID) REFERENCES USERS(User_id) ON DELETE CASCADE,
	UNIQUE(Group_id, Admin_ID)
);

CREATE TABLE GROUP_DISPLAY_PICTURES (
	Group_id INT PRIMARY KEY,
	Image_url VARCHAR(100) NOT NULL,
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

CREATE TABLE TRIP_NOTIFICATION_RADIUS (
	Trip_id INT PRIMARY KEY,
	Notification_radius DOUBLE NOT NULL,
	FOREIGN KEY(Trip_id) REFERENCES TRIPS(Trip_id) ON DELETE CASCADE
);

CREATE TABLE TRIP_MEMBERS ( 
	Trip_id INT NOT NULL,
	User_id VARCHAR(100) NOT NULL,
	FOREIGN KEY(Trip_id) REFERENCES TRIPS(Trip_id) ON DELETE CASCADE,
	FOREIGN KEY(User_id) REFERENCES GROUP_MEMBERS(User_id) ON DELETE CASCADE,
	PRIMARY KEY(Trip_id, User_id)
);

CREATE TABLE VEHICLES (
	Vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
	Vehicle_name VARCHAR(100) NOT NULL,
	Vehicle_type VARCHAR(100) NOT NULL,
	Driver_id VARCHAR(100) NOT NULL,
	Trip_id INT NOT NULL,
	FOREIGN KEY(Driver_id) REFERENCES TRIP_MEMBERS(User_id) ON DELETE CASCADE,
	FOREIGN KEY(Trip_id) REFERENCES TRIPS(Trip_id) ON DELETE CASCADE,
	UNIQUE(Driver_id, Trip_id)
);

CREATE TABLE VEHICLE_MEMBERS (
	Vehicle_id INT NOT NULL,
	User_id VARCHAR(100) NOT NULL,
	FOREIGN KEY(Vehicle_id) REFERENCES VEHICLES(Vehicle_id) ON DELETE CASCADE,
	FOREIGN KEY(User_id) REFERENCES TRIP_MEMBERS(User_id) ON DELETE CASCADE,
	PRIMARY KEY(Vehicle_id, User_id)
);

CREATE TABLE IMAGES (
	Image_id INT AUTO_INCREMENT PRIMARY KEY,
	Image_url VARCHAR(100) NOT NULL,
	Image_time DATETIME NOT NULL,
	Image_lat DOUBLE NOT NULL,
	Image_lng DOUBLE NOT NULL,
	User_id VARCHAR(100) NOT NULL,
	FOREIGN KEY(User_id) REFERENCES TRIP_MEMBERS(User_id) ON DELETE CASCADE,
	Trip_id INT NOT NULL,
	FOREIGN KEY(Trip_id) REFERENCES TRIPS(Trip_id) ON DELETE CASCADE
);

CREATE TABLE EMAILS (
	User_id VARCHAR(100) PRIMARY KEY,
	Email_id VARCHAR(100) NOT NULL,
	FOREIGN KEY(User_id) REFERENCES USERS(User_id) ON DELETE CASCADE,
	UNIQUE(Email_id) 	
);

-- Tables to be added
-- google drive auth
-- instagram auth
-- facebook auth


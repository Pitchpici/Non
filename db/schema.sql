CREATE DATABASE IF NOT EXISTS nontoxx_db;

USE nontoxx_db;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(20) NOT NULL,
	email varchar(255) NOT NULL,
	password varchar(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE TOXIX
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	severity varchar(255) NOT NULL,
	PRIMARY KEY (id),
);
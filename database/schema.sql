DROP DATABASE IF EXISTS workforcedb;

-- create database -- 
CREATE DATABASE workforcedb;

-- use workforce_db --
USE workforcedb;

-- create deptartment table, only one primary key per table unique ensures all values in col are diff, not null cannot be empty, AUTO_INCREMENT allows a unique number to be generated automatically when a new record is inserted into a table. --
CREATE TABLE dept (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(30) UNIQUE NOT NULL
);

-- create role table, primary key = id, UNSIGNED only stores positive numbers (or zero). On the other hand, signed can store negative numbers --
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    dept_id INT
);
-- create employee table  --
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT
);
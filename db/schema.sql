DROP DATABASE IF EXISTS actively_distanced_db;

CREATE DATABASE actively_distanced_db;

USE actively_distanced_db;

CREATE TABLE `user` (
     `id` INT PRIMARY KEY AUTO_INCREMENT,
     `username` VARCHAR(255) UNIQUE NOT NULL,
     `password` varchar(255) not null      
);

CREATE TABLE `activity_type` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `type` varchar(255) NOT NULL
);

CREATE TABLE `POST`(
`id` int PRIMARY KEY AUTO_INCREMENT,
`title` varchar(255),
`description` varchar(255),
`date` varchar(255),
`time` varchar(255),
`image_url` varchar(255),
`created_at` datetime,
`updated_at` datetime
);

CREATE TABLE `activity` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255),
  `image_url` varchar(255),
  `description` varchar(255),
  `location` varchar(255),
  `group_size` varchar(255),
  `date` varchar(255),
  `time` varchar(255),
  `activity_type_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime
);

CREATE TABLE `comment` (
  `id` int PRIMARY KEY  AUTO_INCREMENT,
  `comment_text` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime 
);

CREATE TABLE `likes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL, 
  `activity_id` int NOT NULL,
  `created_at` datetime,
  `updated_at` datetime
);

ALTER TABLE `activity` ADD FOREIGN KEY (`user_id`) REFERENCES `user`(`id`);

ALTER TABLE `activity` ADD FOREIGN KEY (`activity_type_id`) REFERENCES `activity_type`(`id`);

ALTER TABLE `comment` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `comment` ADD FOREIGN KEY (`post_id`) REFERENCES `post` (`id`);

ALTER TABLE `likes` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE  `likes` ADD FOREIGN KEY (`activity_id`) REFERENCES `activity` (`id`);

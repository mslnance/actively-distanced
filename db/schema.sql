DROP DATABASE IF EXISTS actively_distanced_db;

CREATE DATABASE actively_distanced_db;

CREATE TABLE `users` (
  `id` int PRIMARY KEY,
  `email_address` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255),
  `date_created` datetime NOT NULL
);

CREATE TABLE `activity` (
  `id` int PRIMARY KEY,
  `user_id` varchar(255) NOT NULL,
  `title` varchar(255),
  `photo` varchar(255),
  `caption` varchar(255) NOT NULL,
  `location` int NOT NULL,
  `group_size` int,
  `activity_date` datetime,
  `activity_time` datetime,
  `activity_link` varchar(255),
  `type_id` int,
  `date_created` datetime NOT NULL
);

CREATE TABLE `comments` (
  `id` int PRIMARY KEY,
  `activity_id` int NOT NULL,
  `comment` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL
);

CREATE TABLE `likes` (
  `id` int PRIMARY KEY,
  `activity_id` int NOT NULL,
  `date_created` datetime
);

CREATE TABLE `activity_type` (
  `id` int PRIMARY KEY,
  `type` int NOT NULL
);

ALTER TABLE `activity` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `activity` ADD FOREIGN KEY (`id`) REFERENCES `likes` (`activity_id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`activity_id`) REFERENCES `activity` (`id`);

ALTER TABLE `activity_type` ADD FOREIGN KEY (`id`) REFERENCES `activity` (`type_id`);

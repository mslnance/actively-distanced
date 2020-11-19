Delete from user;
Delete from activity_type;
Delete from post;
Delete from activity;


Insert into user(username,password) 
values 
('abc@123.com','abc123'),
('jdoe@anydomain.com','jkj$kjless'),
('auser@activelydistanced.com','kljklj65'),
('suchasitis@smc.edu','lkj09uhgu'),
('barackobama@whitehouse.gov','p87jg6ow');

Insert into activity_type (type)
values
('outdoor'),
('indoor');

Insert into post (title,description,date,time,image_url,created_at,updated_at)
values
('Title1','Description1','11/20/2020','2:00PM','https://www.brunet.ca/en/health/health-tips/outdoor-activities-to-try-this-spring/','2020-11-19','2020-11-19'),
('lorenipsum','New Caledonia','11/16/2020','8:00PM',NULL,'2020-11-14',NULL),
('AnyTitle','Description2','11/10/2020','7:00AM',NULL,'2020-11-1',NULL),
('Title2','VirtualActivity1','10/10/2020','9:00AM',NULL,'2020-11-1',NULL),
('Title3','OutdoorActivity1','11/10/2020','6:00PM','https://www.shutterstock.com/search/rock+climbing','2020-11-7',NULL),
('Title2','VirtualActivity1','10/3/2020','9:00AM',NULL,'2020-10-1',NULL);

Insert into activity (user_id,title, image_url, description, location, group_size, date, time, activity_type_id, created_at,updated_at)
values
('1','Title1','https://www.brunet.ca/en/health/health-tips/outdoor-activities-to-try-this-spring/','Description1','Park','6','11/20/2020','1:00PM','2','2020-10-31',NULL),
('2','Title2','https://www.shutterstock.com/image-photo/group-friends-on-walk-balancing-tree-275504699','Description2','Amphitheater','8','11/01/2020','6:00PM','2','2020-09-30','2020-10-01'),
('3','Title3',NULL,'Description3','A location','5','12/05/2020','3:00PM','1','2020-09-22',NULL),
('4','Title4','https://www.shutterstock.com/search/rock+climbing','Description3','parking lot','3','10/31/2020','4:30PM','1','2020-08-25','2020-09-01'),
('3','Title5','https://thedyrt.com/magazine/lifestyle/complete-guide-free-camping/','Description4','campground','10','12/3/2020','9:00PM','2','2020-11-27',NULL),
('5','Title6',NULL,'Description5','outdoors','9','12/28/2020','8:00AM','1','2020-11-25','2020-11-03');

Insert into comment (comment_text,user_id,post_id,created_at,updated_at) 
VALUES
('Some text','2','3','2020-11-19', NULL),
('Some more text','1','2','2020-11-19','2020-11-30'),
('Still more text','4','3','2020-10-22',NULL),
('More text still','5','1','2020-08-19','2020-09-22'),
('More text indeed','2','5','2020-09-12',NULL),
('My more text','3','4','2020-10-22','2020-11-19');

Insert into likes (user_id,activity_id,created_at,updated_at)
VALUES
('2','3','2020-11-19','2020-11-30'),
('1','5','2020-10-22',NULL),
('4','3','2020-08-19',NULL),
('5','2','2020-07-18',NULL),
('4','4','2020-12-10',NULL),
('3','1','2020-11-19',NULL);
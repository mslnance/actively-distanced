Delete from user;
Delete from activity_type;
Delete from post;


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
('lorenipsum','New Caledonia','11/16/2020','8:00PM','https://www.shutterstock.com/image-photo/group-friends-on-walk-balancing-tree-275504699','2020-11-14',NULL),
('AnyTitle','Description2','11/10/2020','7:00AM',NULL,'2020-11-1',NULL),
('Title2','VirtualActivity1','10/10/2020','9:00AM',,'2020-11-1',NULL)

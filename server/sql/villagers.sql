drop database if exists village;
CREATE DATABASE village;
USE village;

-- creating tables
CREATE TABLE IF NOT EXISTS villagers (
    villager_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    birthday DATE NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
	villager_address TEXT NOT NULL,
    villager_postcode TEXT NOT NULL,
	villager_location ENUM('North London', 'South London', 'West London', 'East London'),
    password VARCHAR(255) NOT NULL
);
  
  CREATE TABLE IF NOT EXISTS children (
	child_id INT AUTO_INCREMENT PRIMARY KEY,
	parent_id INT NOT NULL,
	nick_name ENUM('Walnut', 'Pistachio', 'Cashew') NOT NULL,
	birthday DATE NOT NULL,
	FOREIGN KEY (parent_id) REFERENCES villagers(villager_id) ON DELETE CASCADE

);

 CREATE TABLE IF NOT EXISTS events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(50) NOT NULL,
    event_description TEXT NOT NULL,
    event_location ENUM('North London', 'South London', 'West London', 'East London'),
    event_address TEXT NOT NULL,
    event_postcode TEXT NOT NULL
);

-- CREATE TABLE IF NOT EXISTS messages (
--     message_id INT AUTO_INCREMENT PRIMARY KEY,
--     sender_id INT NOT NULL,
--     receiver_id INT NOT NULL,
--     content TEXT NOT NULL,
--     sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (sender_id) REFERENCES villagers(villager_id) ON DELETE CASCADE,
--     FOREIGN KEY (receiver_id) REFERENCES villagers(villager_id) ON DELETE CASCADE
-- );

-- CREATE TABLE IF NOT EXISTS group_chats (
--     group_id INT AUTO_INCREMENT PRIMARY KEY,
--     group_name VARCHAR(50) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE IF NOT EXISTS group_members (
--     group_id INT NOT NULL,
--     villager_id INT NOT NULL,
--     added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     PRIMARY KEY (group_id, villager_id),
--     FOREIGN KEY (group_id) REFERENCES group_chats(group_id) ON DELETE CASCADE,
--     FOREIGN KEY (villager_id) REFERENCES villagers(villager_id) ON DELETE CASCADE
-- );

-- CREATE TABLE IF NOT EXISTS group_messages (
--     message_id INT AUTO_INCREMENT PRIMARY KEY,
--     group_id INT NOT NULL,
--     sender_id INT NOT NULL,
--     content TEXT NOT NULL,
--     sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (group_id) REFERENCES group_chats(group_id) ON DELETE CASCADE,
--     FOREIGN KEY (sender_id) REFERENCES villagers(villager_id) ON DELETE CASCADE
-- );

INSERT INTO villagers (first_name, last_name, user_name, birthday, email, villager_address, villager_postcode, villager_location, password)
VALUES
('Cat', 'Conquest', 'CC', '1980-05-15', 'cat.c@example.com', '123 Elm Street', 'N1 0AA', 'North London', 'password123'),
('Hai Anh', 'Nguyen', 'HAC', '1985-03-22', 'anh.n@example.com', '456 Oak Avenue', 'S2 3BB', 'South London', 'password456'),
('Lottie', 'Judge','LJ', '1990-11-30', 'lottie.j@example.com', '789 Pine Road', 'W4 5CC', 'West London', 'password789'),
('Maria', 'Amparo','MA', '1975-08-10', 'maria.a@example.com', '321 Maple Lane', 'E6 7DD', 'East London', 'password101'),
('Chloe', 'Beijnen','CB', '1988-12-05', 'chloe.b@example.com', '654 Birch Blvd', 'N8 9EE', 'North London', 'password202'),
('Cynthia', 'Brennan','CYB', '1992-07-14', 'cynthia.b@example.com', '987 Cedar Court', 'S1 1FF', 'South London', 'password303'),
('Fatima', 'Abdullahi','FA', '1983-01-25', 'fatima.a@example.com', '111 Aspen Way', 'W3 3GG', 'West London', 'password404'),
('Sarah', 'Jane','SJ', '1978-04-17', 'sarah.j@example.com', '222 Willow Drive', 'E5 5HH', 'East London', 'password505'),
('Daniel', 'Malik','DM', '1995-09-09', 'daniel.m@example.com', '333 Spruce Path', 'N7 7II', 'North London', 'password606'),
('Laura', 'Spencer','LS', '1982-06-19', 'laura.s@example.com', '444 Redwood Terrace', 'S4 4JJ', 'South London', 'password707');


-- db schema for forums: 
-- -- TOPICS: e.g. becoming a parent, sleep, SEND. (sit in one only).
-- -- users = villagers table above, user_name FK. no need to make new table.
-- -- threads (starter post on thread), this will be marked with tags (parent type eg carer)
-- -- posts_to_threads (replies to threads).


CREATE TABLE IF NOT EXISTS threads (
    thread_id INT AUTO_INCREMENT PRIMARY KEY,
    thread_title TEXT, 
    user_name VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    topic ENUM('Becoming a parent','Being a parent','Being a carer','Education','Childcare','Sleep','SEND','Mind, body and soul','Charities') NOT NULL,
    --  topic in becoming a parent, etc... from figma screen.
    -- tags for themes (will sit with a Y/N). only ask this for the ORIGINAL question/forum post (i.e. thread) 
    -- and then following replies inherit the tags from the original comment
    -- can have as many tags as wanted, will be checkbox on front-end.
    carers_tag VARCHAR(1),
    expecting_parents_tag VARCHAR(1),
    new_parents_tag VARCHAR(1),
    single_parents_tag VARCHAR(1),
    LGBTQIA_plus_parents_tag VARCHAR(1),
    FOREIGN KEY (user_name) REFERENCES villagers(user_name) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS posts_to_threads (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    thread_id INT,
    user_name VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_name) REFERENCES villagers(user_name) ON DELETE CASCADE,
    FOREIGN KEY (thread_id) REFERENCES threads(thread_id) ON DELETE CASCADE
);


INSERT INTO threads (thread_title, user_name, content, topic, carers_tag, expecting_parents_tag, new_parents_tag, single_parents_tag, LGBTQIA_plus_parents_tag)
VALUES ('HELP! 38 weeks and  still no name', 'CC', 'please help me name my child I cannot decide :(((( I am a single mom but am very indecisive','Becoming a parent','N','Y','N','Y','N'),
('Need advice on baby sleep schedules', 'FA', 'My baby is 3 months old and I can’t get them to sleep through the night. Any tips?', 'Sleep', 'N', 'N', 'Y', 'N', 'N'),
('Balancing work, chores and being present as a parent', 'LJ', 'How do you all manage to balance work and being a parent? Im struggling a lot with this.', 'Being a parent', 'N', 'Y', 'N', 'N', 'N'),
('Dealing with postpartum depression', 'LS', 'Im really struggling with postpartum depression. Any support groups or advice would be appreciated.', 'Mind, body and soul', 'N', 'N', 'Y', 'N', 'N'),
('Suggestions for fun family activities', 'DM', 'Looking for suggestions on fun activities to do with my kids this weekend. Any ideas?', 'Mind, body and soul', 'N', 'N', 'Y', 'N', 'Y'),
('Single Mum friends!', 'SJ', 'Any single Mums in Penge looking for community?', 'Being a parent', 'N', 'N', 'N', 'Y', 'N'),
('Support for LGBTQIA+ parents', 'DM', 'Looking to connect with other LGBTQIA+ parents for support and advice.', 'Mind, body and soul', 'N', 'N', 'N', 'N', 'Y'),
('Autism assessment', 'FA', 'Can anyone recommend some good blogs for people who have come out the otherside of autism assessments? It feels never ending and would love some light at the end of the tunnel!', 'SEND', 'Y', 'N', 'N', 'N', 'N');


INSERT INTO posts_to_threads (thread_id, user_name, content)
VALUES (1,'LJ','Lottie is a cool name!'),(1,'FA','Fatima is a cool name!'),
(2, 'LJ', 'Try a consistent bedtime routine and white noise. It worked for us :) xo'),
(2, 'CC', 'We used a sleep training method called Ferber. It’s tough but it works.'),
(2, 'FA', ' If you have a partner one of you can sleep in the front room with the baby while the other gets a decent sleep and then switch, it saved us!'),
(3, 'LJ', 'I use a planner to schedule everything. Trello is great for this - happy to give you a tutorial if you need!'),
(3, 'CB', 'Don’t be afraid to ask for help from family and friends. Most of them would love to help! also order your shopping online, time is better spent playing than dragging the kids round sainbos!'),
(4, 'CYB', 'Join a support group! I used to go to one in Dulwich if ur close I can send u the details! Sending hugs xxx'),
(4, 'CC', 'Therapy! please please please go to your GP and ask for therapy, it saved me and I wish more women felt able to!!'),
(5, 'FA', 'We love going to Hampstead and paddling in the ponds, pack a picnic and a football, cheap and the kids are shattered by the time we get home! '),
(5, 'LJ', 'MudShoot city farm is amaaaaaaazing! and free ;)'),
(6, 'CC', 'Yes pls! Im not in Penge proper but close enough and would love more people to have a natter with!'),
(6, 'HAC', 'OMG PERLEAAASE! I moved this way from Birmingham and miss my girls :('),
(7, 'CC','Yes, theres so much on insta, heres some to checkout...'),
(7, 'DM', 'also interested in this pls! Good luck to you and your wee one x '),
(8, 'LS', 'Welcome! We have a great community here.'),
(8, 'LS', 'Check out our monthly meetups. They are great for networking and support. We always love to have new friends!');


CREATE DATABASE village;
USE village;

-- creating tables
CREATE TABLE IF NOT EXISTS villagers (
    villager_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    user_name VARCHAR(50) NOT NULL,
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

CREATE TABLE IF NOT EXISTS messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES villagers(villager_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES villagers(villager_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS group_chats (
    group_id INT AUTO_INCREMENT PRIMARY KEY,
    group_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS group_members (
    group_id INT NOT NULL,
    villager_id INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (group_id, villager_id),
    FOREIGN KEY (group_id) REFERENCES group_chats(group_id) ON DELETE CASCADE,
    FOREIGN KEY (villager_id) REFERENCES villagers(villager_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS group_messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    sender_id INT NOT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES group_chats(group_id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES villagers(villager_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS broadcast_messages (
	broadcast_message_id INT AUTO_INCREMENT PRIMARY KEY,
    villager_id INT,
    message_content VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (villager_id) REFERENCES villagers(villager_id)
);

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

-- times (created_at) stated to test things out
INSERT INTO broadcast_messages (villager_id, message_content, created_at)
VALUES 
(2, "hi guys, i'm new here and this is my first broadcast message!", default),
(1, "I've just been told I'm with triplets and wanted to share my joy with you all!", default),
(3, "hello world", "2024-08-01 19:09:39"),
(4, "We've got good weather today in North London. How's everyone else?", "2024-07-30 16:09:39");
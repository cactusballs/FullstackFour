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
('Autism assessment', 'FA', 'Can anyone recommend some good blogs for people who have come out the otherside of autism assessments? It feels never ending and would love some light at the end of the tunnel!', 'SEND', 'Y', 'N', 'N', 'N', 'N'),
('Preparing for the Baby Shower', 'CC', 'How did you plan your baby shower? Any tips?', 'Becoming a parent', '0', '1', '0', '0', '1'),
('Balancing Social Life and Parenthood', 'HAC', 'I struggle with balancing me time and being a new parent. Any advice?', 'Being a parent', '0', '0', '1', '1', '0'),
('Navigating SEND with Teenagers', 'LJ', 'Anyone else have teenagers with SEND? Lets share our experiences.', 'SEND', '1', '0', '0', '0', '0'),
('Choosing the Right Nursery', 'MA', 'What factors did you consider when choosing a nursery?', 'Childcare', '0', '1', '0', '0', '0'),
('Tips for Better Sleep', 'CB', 'My baby isn’t sleeping through the night. What worked for you?', 'Sleep', '0', '0', '1', '0', '0'),
('Supporting Elderly Parents', 'CYB', 'How do you manage being a parent and a carer?',  'Being a carer', '1', '0', '0', '0', '0'),
('Mindfulness for Parents', 'FA', 'What mindfulness practices help you stay calm?',  'Mind, body and soul', '0', '0', '1', '0', '1'),
('Finding Support as a Single Parent', 'SJ', 'Any single parents here? How do you manage everything?',  'Being a parent', '0', '0', '1', '1', '0'),
('Finding the Best Childcare in My Area', 'DM', 'What resources did you use to find good childcare?',  'Childcare', '0', '1', '0', '0', '0'),
('Exercise Routines After Childbirth', 'LS', 'How did you get back into exercise after having a baby?', 'Mind, body and soul', '0', '1', '1', '0', '0'),

('Dealing with Colic', 'CC', 'How did you cope with colic? My baby cries constantly.',  'Sleep', '0', '0', '1', '0', '0'),
('Parenting a Child with Autism', 'HAC', 'How do you navigate birthday parties etc with your children? My kid is coming up to the age they can go to parties alone but am worried they might not cope without us there!',  'SEND', '1', '0', '0', '0', '0'),
('Education Options for SEND', 'LJ', 'What education options are available for SEND children in Golders Green?', 'SEND', '1', '0', '0', '0', '0'),
('Charities Supporting New Parents', 'MA', 'Are there any charities that support new parents?',  'Charities', '0', '1', '0', '0', '1'),
('Finding the Right School', 'CB', 'What should I look for in a school for my child?',  'Education', '0', '0', '1', '0', '0'),
('Postpartum Mental Health', 'CYB', 'How did you cope with mental health challenges after childbirth?',  'Mind, body and soul', '0', '1', '1', '0', '0'),
('Handling Multiple Children as a Single Parent', 'FA', 'How do you manage when you have more than one child and no partner?',  'Being a parent', '0', '0', '1', '1', '0'),
('LGBTQIA+ Friendly Childcare', 'SJ', 'Any recommendations for LGBTQIA+ friendly childcare?',  'Childcare', '0', '0', '0', '0', '1'),
('Best Charities for Childrens Education', 'DM', 'Which charities support childrens education the best?', 'Charities', '0', '1', '0', '0', '0'),
('Choosing the Best Preschool', 'LS', 'How did you decide on a preschool? What were your priorities?',  'Education', '0', '0', '1', '0', '0'),
('Supporting LGBTQIA+ Teens', 'HAC', 'How do you support LGBTQIA+ teens as a parent?',  'Being a parent', '0', '0', '1', '0', '1'),
('Charities for mobility equipment', 'LJ', 'does anyone know of any charites in London that help with the running cost of motorised wheel chairs?', 'Charities', '1', '0', '0', '0', '0'),
('Handling Sleep Regression', 'MA', 'My toddler is going through sleep regression. Any advice?',  'Sleep', '0', '0', '1', '0', '0'),
('Choosing the Right Education Path', 'CB', 'How did you choose between public and private schooling?',  'Education', '0', '0', '1', '0', '0'),
('Finding SEND Support Groups', 'CYB', 'Are there any good SEND support groups in your area?', 'SEND', '1', '0', '0', '0', '0'),
('Getting Back to Work After Maternity Leave', 'FA', 'How did you transition back to work after maternity leave?',  'Becoming a parent', '0', '1', '0', '0', '1'),
('Creating a Sleep Routine', 'SJ', 'What kind of sleep routine works for your baby?',  'Sleep', '0', '0', '1', '0', '0'),
('Charity Events for Families', 'DM', 'Do you know of any charity events that are family-friendly?',  'Charities', '0', '1', '0', '0', '0'),
('Supporting a Partner with Mental Health Issues', 'LS', 'How do you support a partner who is struggling mentally?',  'Mind, body and soul', '0', '0', '1', '0', '0'),
('Co-Parenting After Divorce', 'CC', 'How do you manage co-parenting with an ex-partner?',  'Being a parent', '0', '0', '1', '1', '0'),
('Finding Resources for Expecting Parents', 'HAC', 'What resources helped you most as an expecting parent?',  'Becoming a parent', '0', '1', '0', '0', '1'),
('Setting Up a College Fund', 'LJ', 'When did you start saving for your childs college fund?',  'Education', '0', '0', '1', '0', '0'),
('Carers and Burnout', 'MA', 'How do you avoid burnout when caring for both kids and elderly parents?',  'Being a carer', '1', '0', '0', '0', '0'),
('Mindful Parenting Practices', 'CB', 'What are your favorite mindful parenting practices?',  'Mind, body and soul', '0', '1', '1', '0', '0'),
('LGBTQIA+ Parent Meetups', 'CYB', 'Are there any LGBTQIA+ parent meetups in your area?', 'Being a parent', '0', '0', '1', '0', '1'),
('Packing hsptl bag', 'FA', 'What do you wish you had packed in your hsptl bag?',  'Becoming a parent', '0', '1', '0', '0', '1'),
('Managing Sleep Deprivation', 'SJ', 'How do you cope with sleep deprivation as a new parent?',  'Sleep', '0', '0', '1', '0', '0'),
('Looking for Advice on Foster Care', 'SJ', 'My partner and I are considering fostering. What should we know before starting?', 'Being a carer', '1', '0', '0', '0', '1'),
('Grandparenting and Raising Grandkids', 'CC', 'I’m raising my grandkids full-time. Any tips from other grandparents? Does anyone want to create a social club? I live in Hampstead ',  'Being a carer', '1', '0', '0', '1', '0'),
('Managing School', 'MA', 'As a grandparent caring for school-aged kids, how do you manage homework and activities? I also get concerned I will not be able to keep up with them forever, should I put them in lots of clubs?',  'Being a carer', '1', '0', '0', '1', '0'),
('Best All-Inclusive Hotels for Familie in Spain', 'CB', 'We’re planning a family vacation. What are the best all-inclusive hotels you recommend in Spain?', 'Being a parent', '0', '0', '1', '0', '0'),
('My Child is the Bully – Need Help', 'DM', 'I’ve just found out my child is bullying others at school. How do I address this?',  'Being a parent', '0', '0', '1', '0', '0');

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
(8, 'CC','Yes, theres so much on insta, heres some to checkout...'),
(8, 'DM', 'also interested in this pls! Good luck to you and your wee one x '),
(7, 'LS', 'Welcome! We have a great community here.'),
(7, 'LS', 'Check out our monthly meetups. They are great for networking and support. We always love to have new friends!'),
(12, 'LJ', 'I found visiting the nurseries really gave me a good sense of the right fit.'),
(13, 'SJ', 'My baby loved the shushing sounds, and we stuck to a consistent bedtime.'),
(13, 'CYB', 'We tried a warm bath before bed, and it helped our baby relax.'),
(13, 'DM', 'Try swaddling or a sleep sack; it might make your baby feel more secure.'),
(14, 'CC', 'Its so hard, but I try to make a schedule and stick to it.'),
(14, 'FA', 'Youre not alone! There are days when I feel like Im not doing enough.'),
(14, 'CB', 'Try to set small, achievable goals. Even small wins can feel huge.'),
(15, 'DM', 'I started with simple meditation, and it really helps to clear my mind.'),
(15, 'LS', 'Journaling your thoughts and emotions can be very therapeutic.'),
(15, 'SJ', 'Yoga has been a lifesaver for me in managing stress.'),
(16, 'FA', 'Being a single parent is tough, but remember to take care of yourself too.'),
(16, 'LJ', 'Reach out to other single parents in your area for support.'),
(16, 'CC', 'Join a local single parents group. Youll find a great support network.'),
(17, 'SJ', 'Word of mouth worked best for us. Ask other parents in your community.'),
(17, 'CYB', 'Look online for reviews and ratings. Its a good starting point.'),
(17, 'LJ', 'I found a great nanny through a local agency. It was worth the extra cost.'),
(18, 'DM', 'Start slowly and listen to your body. Yoga is a great way to ease back into exercise.'),
(18, 'FA', 'Find a workout buddy to keep you motivated. It makes a big difference.'),
(18, 'CB', 'I found postnatal fitness classes to be a great way to start. Theyre designed for new mums.'),
(19, 'SJ', 'It was so hard, but remember, it will pass. Take breaks when you can.'),
(19, 'CYB', 'Colic was tough for us too. We found that tummy massages helped.'),
(19, 'DM', 'Have you tried a warm bath before bedtime? It sometimes helped soothe our baby.'),
(20, 'FA', 'We started with smaller, shorter parties to help our child adjust.'),
(20, 'LS', 'Communication with the other parents about your childs needs can really help.'),
(20, 'CC', 'Try doing a dry run with a trusted adult. It helped our child get comfortable.'),
(21, 'CB', 'We went with a local state school, and its been fantastic for our child.'),
(21, 'LJ', 'Visit both and see where your child feels more comfortable.'),
(21, 'DM', 'Consider the class sizes and the schools approach to SEND. That was a big factor for us.'),
(22, 'SJ', 'Weve found a lovely group that meets every Tuesday. Would you like to join?'),
(22, 'CYB', 'Finding support in your community is essential. Have you tried your local council?'),
(22, 'CC', 'We formed a small group ourselves. Sometimes, just meeting up with a few families can help.'),
(23, 'FA', 'Check out the NSPCC or Barnardos, theyre both fantastic.'),
(23, 'CB', 'Save the Children is a great one. They do amazing work for kids education.'),
(23, 'LS', 'The Princes Trust offers great support for children and young people.'),
(24, 'SJ', 'I wanted a nurturing environment and strong academics. Visiting the school made a big difference.'),
(24, 'CYB', 'Consider their approach to emotional well-being, especially in the early years.'),
(24, 'FA', 'Proximity to home and the schools values were top of our list.'),
(25, 'LS', 'Its tough, but patience and open communication are key. You are doing great.'),
(25, 'FA', 'Have you looked into local support groups for parents of LGBTQIA+ teens?'),
(25, 'CB', 'We found that being open and supportive made all the difference for our child.'),
(26, 'DM', 'I had a great experience with the charity Scope, theyre very supportive.'),
(26, 'SJ', 'Contact the RNIB, they have excellent resources for mobility and independence.'),
(26, 'CC', 'The Motability Scheme is fantastic for helping with running costs. Definitely check them out.'),
(27, 'FA', 'We went through it too. Stick to a consistent routine, and it will pass.'),
(27, 'CB', 'Our toddler went through this as well. Be patient and offer comfort.'),
(27, 'LJ', 'Try introducing a comfort item, like a stuffed toy. It worked wonders for us.'),
(28, 'DM', 'We chose public schooling for its diverse environment and resources.'),
(28, 'SJ', 'Private schools offer smaller class sizes, which was important for us.'),
(28, 'FA', 'We visited both, and ultimately, it was about where our child felt happiest.'),
(29, 'CYB', 'Weve had a fantastic experience with our local childminder. Look for one with great references.'),
(29, 'CC', 'Nurseries are great if you want a structured environment. We chose one with a good reputation.'),
(29, 'DM', 'Have you considered a nanny? We love the personalized care and flexibility it offers.'),
(30, 'FA', 'We found the birth pool and a calm, quiet environment really helped during labour.'),
(30, 'CB', 'Our midwife was fantastic in guiding us through our birth plan.'),
(30, 'LJ', 'Dont be afraid to speak up about your needs. Its your birth experience.');


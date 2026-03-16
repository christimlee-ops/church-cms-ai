-- Calvary Lutheran Church - Events Seed Data
-- Pulled from calvarychandler.net on 2026-03-15
-- Uses admin user 'clcadmin001' as author
-- recurringDays = JSON array of JS day numbers (0=Sun, 1=Mon, ..., 6=Sat)
-- recurringTime/recurringEndTime = "HH:mm" 24-hour format

SET NAMES utf8mb4;

-- Clear existing events
DELETE FROM `events`;

-- =============================================
-- RECURRING EVENTS
-- =============================================

-- Saturday Worship Service (recurring weekly)
INSERT INTO `events` (`id`, `title`, `slug`, `description`, `location`, `address`, `startDate`, `endDate`, `allDay`, `recurring`, `recurringDays`, `recurringTime`, `recurringEndTime`, `featuredImage`, `status`, `category`, `authorId`, `createdAt`, `updatedAt`) VALUES
('evt-sat-worship', 'Saturday Worship Service', 'saturday-worship-service',
'<p>Join us every Saturday evening for worship centered on Christ and His saving Word. Our Saturday service features Scripture readings, hymns, and pastoral proclamation of the Gospel.</p><p>Whether you''ve been a Lutheran your whole life or are stepping into a church for the first time, you are welcome here. Come as you are and receive God''s grace.</p>',
'Calvary Lutheran Church', '1270 N Dobson Rd, Chandler, AZ 85224',
'2026-03-14 18:00:00', '2026-03-14 19:00:00', false,
'weekly', '[6]', '18:00', '19:00',
'/images/Saturday-Worship-Service-1.webp', 'UPCOMING', 'Worship',
'clcadmin001', NOW(), NOW());

-- Sunday Worship Service (recurring weekly)
INSERT INTO `events` (`id`, `title`, `slug`, `description`, `location`, `address`, `startDate`, `endDate`, `allDay`, `recurring`, `recurringDays`, `recurringTime`, `recurringEndTime`, `featuredImage`, `status`, `category`, `authorId`, `createdAt`, `updatedAt`) VALUES
('evt-sun-worship', 'Sunday Worship Service', 'sunday-worship-service',
'<p>Our Sunday morning worship service proclaims Christ crucified at the center of all we do. Experience Scripture readings, music, and the proclamation of God''s Word.</p><p>All are welcome — whether you''ve been a Lutheran your whole life or are visiting for the first time. Come and receive the gifts God freely gives through His Word and Sacraments.</p>',
'Calvary Lutheran Church', '1270 N Dobson Rd, Chandler, AZ 85224',
'2026-03-15 09:00:00', '2026-03-15 10:00:00', false,
'weekly', '[0]', '09:00', '10:00',
'/images/Sunday-Worship-Service-2.webp', 'UPCOMING', 'Worship',
'clcadmin001', NOW(), NOW());

-- Bible Study (recurring weekly)
INSERT INTO `events` (`id`, `title`, `slug`, `description`, `location`, `address`, `startDate`, `endDate`, `allDay`, `recurring`, `recurringDays`, `recurringTime`, `recurringEndTime`, `featuredImage`, `status`, `category`, `authorId`, `createdAt`, `updatedAt`) VALUES
('evt-bible-study', 'Bible Study & Sunday School', 'bible-study-sunday-school',
'<p>Grow in the grace and knowledge of our Lord at our weekly Bible Study and Sunday School. Adults dig deeper into Scripture while children enjoy age-appropriate Bible lessons, songs, and crafts.</p><p>Classes are available for all ages — from toddlers to adults. Come ready to learn, ask questions, and grow in your faith.</p>',
'Calvary Lutheran Church', '1270 N Dobson Rd, Chandler, AZ 85224',
'2026-03-15 10:30:00', '2026-03-15 11:30:00', false,
'weekly', '[0]', '10:30', '11:30',
'/images/bible-class-creative.webp', 'UPCOMING', 'Education',
'clcadmin001', NOW(), NOW());

-- Men's Group (recurring monthly - 3rd Saturday)
INSERT INTO `events` (`id`, `title`, `slug`, `description`, `location`, `address`, `startDate`, `endDate`, `allDay`, `recurring`, `recurringDays`, `recurringTime`, `recurringEndTime`, `featuredImage`, `status`, `category`, `authorId`, `createdAt`, `updatedAt`) VALUES
('evt-mens-group', 'Men''s Group', 'mens-group',
'<p>The Men''s Group is a place for Christian brothers to strengthen their faith, support one another, and grow in godly leadership.</p><p>We gather for Bible study, prayer, service projects, and meaningful conversation designed to help us walk in Christ''s footsteps both in our homes and in the world.</p><p>Whether you''re new or have been part of the group for years, there''s a space for you to share life''s challenges and victories with other men rooted in Scripture and fellowship.</p>',
'Calvary Lutheran Church', '1270 N Dobson Rd, Chandler, AZ 85224',
'2026-03-21 08:00:00', '2026-03-21 09:00:00', false,
'monthly', '[6]', '08:00', '09:00',
'/images/Mens-Group.webp', 'UPCOMING', 'Fellowship',
'clcadmin001', NOW(), NOW());

-- Mornings with Mommy (recurring monthly - 1st Tuesday)
INSERT INTO `events` (`id`, `title`, `slug`, `description`, `location`, `address`, `startDate`, `endDate`, `allDay`, `recurring`, `recurringDays`, `recurringTime`, `recurringEndTime`, `featuredImage`, `status`, `category`, `authorId`, `createdAt`, `updatedAt`) VALUES
('evt-mwm', 'Mornings with Mommy', 'mornings-with-mommy',
'<p>Mornings with Mommy is a fun, faith-based program where caregivers and children ages 0–6 enjoy themed educational playdates filled with crafts, music, and storytime on the first Tuesday of each month.</p><p>This free program is open to the community and provides a wonderful opportunity for young families in the Chandler area to connect with one another in a warm, welcoming environment.</p>',
'Calvary Lutheran Church', '1270 N Dobson Rd, Chandler, AZ 85224',
'2026-04-07 10:00:00', '2026-04-07 11:00:00', false,
'monthly', '[2]', '10:00', '11:00',
'/images/MMWLogo-RGB-300ppi-01.jpg', 'UPCOMING', 'Children',
'clcadmin001', NOW(), NOW());

-- =============================================
-- HOLY WEEK & EASTER 2026
-- =============================================

-- Maundy Thursday Service
INSERT INTO `events` (`id`, `title`, `slug`, `description`, `location`, `address`, `startDate`, `endDate`, `allDay`, `recurring`, `recurringDays`, `recurringTime`, `recurringEndTime`, `featuredImage`, `status`, `category`, `authorId`, `createdAt`, `updatedAt`) VALUES
('evt-maundy-thu', 'Maundy Thursday Service', 'maundy-thursday-service',
'<p>Step into the sacred story of Christ''s final meal with His disciples. On this evening, we remember how Jesus washed the feet of His disciples and gave a new commandment to love one another as He had loved them.</p><p>This service incorporates Scripture, worship, and Holy Communion as we reflect on Christ''s humility before the crucifixion. The word "Maundy" comes from Jesus'' command to His disciples — to love one another.</p><p>Come with whatever you are carrying — questions, gratitude, weariness, or hope. There is room at the table for you.</p>',
'Calvary Lutheran Church', '1270 N Dobson Rd, Chandler, AZ 85224',
'2026-04-02 19:00:00', '2026-04-02 20:00:00', false,
NULL, NULL, NULL, NULL,
'/images/ChatGPT-Image-Feb-8-2026-06_44_29-AM.webp', 'UPCOMING', 'Worship',
'clcadmin001', NOW(), NOW());

-- Good Friday Service (1:00 PM)
INSERT INTO `events` (`id`, `title`, `slug`, `description`, `location`, `address`, `startDate`, `endDate`, `allDay`, `recurring`, `recurringDays`, `recurringTime`, `recurringEndTime`, `featuredImage`, `status`, `category`, `authorId`, `createdAt`, `updatedAt`) VALUES
('evt-good-fri-1', 'Good Friday Service', 'good-friday-service',
'<p>Good Friday is a sacred moment to pause and remember the depth of Christ''s love displayed at the cross. This service invites you to reflect on the sacrifice and mercy offered through this pivotal event in our faith.</p><p>Through Scripture, worship, and prayer, we contemplate the powerful words, "It is finished," and what they mean for each of us.</p><p>Whether you come carrying questions, burdens, or quiet hope, this is a space to reflect, to be renewed, and to draw near to the heart of God.</p>',
'Calvary Lutheran Church', '1270 N Dobson Rd, Chandler, AZ 85224',
'2026-04-03 13:00:00', '2026-04-03 14:00:00', false,
NULL, NULL, NULL, NULL,
'/images/ChatGPT-Image-Feb-8-2026-06_40_12-AM.webp', 'UPCOMING', 'Worship',
'clcadmin001', NOW(), NOW());

-- Good Friday Service (7:00 PM)
INSERT INTO `events` (`id`, `title`, `slug`, `description`, `location`, `address`, `startDate`, `endDate`, `allDay`, `recurring`, `recurringDays`, `recurringTime`, `recurringEndTime`, `featuredImage`, `status`, `category`, `authorId`, `createdAt`, `updatedAt`) VALUES
('evt-good-fri-2', 'Good Friday Evening Service', 'good-friday-evening-service',
'<p>Join us for a meaningful evening service as we pause and reflect on Christ''s sacrifice on the cross. Through Scripture, worship, and prayer, we explore the powerful words, "It is finished."</p><p>This contemplative service welcomes all — whether carrying questions, gratitude, weariness, or hope — to experience a space for reflection and spiritual renewal before Easter morning.</p>',
'Calvary Lutheran Church', '1270 N Dobson Rd, Chandler, AZ 85224',
'2026-04-03 19:00:00', '2026-04-03 20:00:00', false,
NULL, NULL, NULL, NULL,
'/images/ChatGPT-Image-Feb-8-2026-06_40_12-AM.webp', 'UPCOMING', 'Worship',
'clcadmin001', NOW(), NOW());

-- Easter Service (7:00 AM)
INSERT INTO `events` (`id`, `title`, `slug`, `description`, `location`, `address`, `startDate`, `endDate`, `allDay`, `recurring`, `recurringDays`, `recurringTime`, `recurringEndTime`, `featuredImage`, `status`, `category`, `authorId`, `createdAt`, `updatedAt`) VALUES
('evt-easter-early', 'Easter Sunrise Service', 'easter-sunrise-service',
'<p>He is risen! Celebrate the resurrection of our Lord Jesus Christ at our Easter sunrise service.</p><p>Experience uplifting worship, an encouraging message, and a time to reflect on the incredible gift of Jesus. New life is possible, grace is real, and love has the final word.</p><p>Whether you are visiting church for the first time or have been part of our family for years, you are welcome here. Come as you are and bring your family and friends to share in this joyful celebration.</p>',
'Calvary Lutheran Church', '1270 N Dobson Rd, Chandler, AZ 85224',
'2026-04-05 07:00:00', '2026-04-05 08:00:00', false,
NULL, NULL, NULL, NULL,
'/images/ChatGPT-Image-Feb-8-2026-06_34_05-AM.webp', 'UPCOMING', 'Worship',
'clcadmin001', NOW(), NOW());

-- Easter Potluck Breakfast
INSERT INTO `events` (`id`, `title`, `slug`, `description`, `location`, `address`, `startDate`, `endDate`, `allDay`, `recurring`, `recurringDays`, `recurringTime`, `recurringEndTime`, `featuredImage`, `status`, `category`, `authorId`, `createdAt`, `updatedAt`) VALUES
('evt-easter-potluck', 'Easter Potluck Breakfast', 'easter-potluck-breakfast',
'<p>Gather with your church family for a relaxed, joyful Easter morning potluck breakfast! Bring your favorite dish to share — warm casseroles, fresh fruit, pastries, and plenty of coffee are all welcome.</p><p>This is a wonderful time of community fellowship and spiritual reflection as we prepare our hearts before the worship service. All families, neighbors, and guests — including children — are welcomed to this celebration centered on Easter''s message of resurrection and renewed life in Christ.</p>',
'Calvary Lutheran Church', '1270 N Dobson Rd, Chandler, AZ 85224',
'2026-04-05 08:15:00', '2026-04-05 09:45:00', false,
NULL, NULL, NULL, NULL,
'/images/ChatGPT-Image-Feb-8-2026-06_49_33-AM.webp', 'UPCOMING', 'Fellowship',
'clcadmin001', NOW(), NOW());

-- Easter Service (10:00 AM)
INSERT INTO `events` (`id`, `title`, `slug`, `description`, `location`, `address`, `startDate`, `endDate`, `allDay`, `recurring`, `recurringDays`, `recurringTime`, `recurringEndTime`, `featuredImage`, `status`, `category`, `authorId`, `createdAt`, `updatedAt`) VALUES
('evt-easter-main', 'Easter Festival Service', 'easter-festival-service',
'<p>He is risen! Celebrate the resurrection of our Lord Jesus Christ at our Easter festival service.</p><p>Experience uplifting worship, an encouraging message, and a time to reflect on the incredible gift of Jesus. New life is possible, grace is real, and love has the final word.</p><p>Whether you are visiting church for the first time or have been part of our family for years, you are welcome here. Come as you are and bring your family and friends to share in this joyful celebration.</p>',
'Calvary Lutheran Church', '1270 N Dobson Rd, Chandler, AZ 85224',
'2026-04-05 10:00:00', '2026-04-05 11:00:00', false,
NULL, NULL, NULL, NULL,
'/images/ChatGPT-Image-Feb-8-2026-06_34_05-AM.webp', 'UPCOMING', 'Worship',
'clcadmin001', NOW(), NOW());

-- =============================================
-- SPECIAL EVENTS
-- =============================================

-- Fun & Fellowship at Quarthaus
INSERT INTO `events` (`id`, `title`, `slug`, `description`, `location`, `address`, `startDate`, `endDate`, `allDay`, `recurring`, `recurringDays`, `recurringTime`, `recurringEndTime`, `featuredImage`, `status`, `category`, `authorId`, `createdAt`, `updatedAt`) VALUES
('evt-quarthaus', 'Fun & Fellowship at Quarthaus', 'fun-fellowship-at-quarthaus',
'<p>Enjoy an afternoon of fun and fellowship at Quarthaus in downtown Chandler! Relax in the outdoor space, socialize, and enjoy food and beverages available for purchase.</p><p>Parking is available across the street in a parking garage.</p><p>To RSVP, contact Jackie Corry at (480) 352-1368.</p>',
'Quarthaus', 'Downtown Chandler, AZ',
'2026-03-22 15:00:00', '2026-03-22 21:00:00', false,
NULL, NULL, NULL, NULL,
'/images/Quarthaus-logo.webp', 'UPCOMING', 'Fellowship',
'clcadmin001', NOW(), NOW());

-- Ash Wednesday Communion Service
INSERT INTO `events` (`id`, `title`, `slug`, `description`, `location`, `address`, `startDate`, `endDate`, `allDay`, `recurring`, `recurringDays`, `recurringTime`, `recurringEndTime`, `featuredImage`, `status`, `category`, `authorId`, `createdAt`, `updatedAt`) VALUES
('evt-ash-wed', 'Ash Wednesday Communion Service', 'ash-wednesday-communion-service',
'<p>This contemplative service marks the beginning of Lent with the imposition of ashes — a meaningful reminder of our need for forgiveness and Christ''s hope.</p><p>The service includes Holy Communion, Scripture, prayer, reflection, and simple, reverent music.</p><p>Members, guests, families, and anyone seeking a moment of peace during this sacred season are welcome. Join us as we begin our Lenten journey together.</p>',
'Calvary Lutheran Church', '1270 N Dobson Rd, Chandler, AZ 85224',
'2026-02-18 11:00:00', '2026-02-18 12:00:00', false,
NULL, NULL, NULL, NULL,
'/images/sacrament.jpg', 'COMPLETED', 'Worship',
'clcadmin001', NOW(), NOW());

-- Lenten Dinner Services (recurring during Lent)
INSERT INTO `events` (`id`, `title`, `slug`, `description`, `location`, `address`, `startDate`, `endDate`, `allDay`, `recurring`, `recurringDays`, `recurringTime`, `recurringEndTime`, `featuredImage`, `status`, `category`, `authorId`, `createdAt`, `updatedAt`) VALUES
('evt-lent-dinner', 'Midweek Lenten Dinner & Service', 'midweek-lenten-dinner-service',
'<p>Join us for fellowship and a shared meal followed by a midweek Lenten worship service. These special Wednesday gatherings during the Lenten season provide time for reflection, community, and spiritual growth as we journey toward Easter.</p><p>Dinner is provided — just come and be fed, body and soul.</p>',
'Calvary Lutheran Church', '1270 N Dobson Rd, Chandler, AZ 85224',
'2026-02-25 17:30:00', '2026-02-25 19:30:00', false,
'weekly', '[3]', '17:30', '19:30',
'/images/Lent-Dinner.webp', 'UPCOMING', 'Worship',
'clcadmin001', NOW(), NOW());

-- Friendship Circle Family Game & Ice Cream Social
INSERT INTO `events` (`id`, `title`, `slug`, `description`, `location`, `address`, `startDate`, `endDate`, `allDay`, `recurring`, `recurringDays`, `recurringTime`, `recurringEndTime`, `featuredImage`, `status`, `category`, `authorId`, `createdAt`, `updatedAt`) VALUES
('evt-game-night', 'Friendship Circle Family Game & Ice Cream Social', 'friendship-circle-game-night',
'<p>Bring your favorite board games and join us for an afternoon of faith-filled fun, laughter, and fellowship!</p><p>Kids, parents, grandparents, and friends are all welcome. Ice cream and light refreshments will be provided in a relaxed, joyful atmosphere designed to strengthen our church community bonds.</p>',
'Calvary Lutheran Church', '1270 N Dobson Rd, Chandler, AZ 85224',
'2026-08-09 14:00:00', '2026-08-09 16:00:00', false,
NULL, NULL, NULL, NULL,
'/images/church-event.webp', 'UPCOMING', 'Fellowship',
'clcadmin001', NOW(), NOW());

-- Church Council Meeting (recurring monthly)
INSERT INTO `events` (`id`, `title`, `slug`, `description`, `location`, `address`, `startDate`, `endDate`, `allDay`, `recurring`, `recurringDays`, `recurringTime`, `recurringEndTime`, `featuredImage`, `status`, `category`, `authorId`, `createdAt`, `updatedAt`) VALUES
('evt-council', 'Church Council Meeting', 'church-council-meeting',
'<p>Monthly meeting of the Calvary Lutheran Church Council to discuss church business, ministry planning, and congregational matters. All council members are expected to attend.</p>',
'Calvary Lutheran Church', '1270 N Dobson Rd, Chandler, AZ 85224',
'2026-04-14 19:00:00', '2026-04-14 20:30:00', false,
'monthly', '[2]', '19:00', '20:30',
'/images/church-council-meeting-2.webp', 'UPCOMING', 'Administration',
'clcadmin001', NOW(), NOW());

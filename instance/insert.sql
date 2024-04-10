-- Delete Table code
-- DROP TABLE IF EXISTS event;
-- DROP TABLE IF EXISTS events;
-- DROP TABLE IF EXISTS church;

-- insert church into Church table
-- INSERT INTO church (code, name, location)
-- VALUES ('00001', 'Saints Peter and Paul', 'Doonside');

-- INSERT INTO church (code, name, location)
-- VALUES ('00002', 'Saint Mary', 'Mount Pritchard');


-- Add Events Table
-- CREATE TABLE IF NOT EXISTS events (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     church_id INTEGER NOT NULL,
--     event_title TEXT,
--     start_time TEXT NOT NULL,
--     end_time TEXT,
--     is_all_day BOOLEAN NOT NULL DEFAULT 0,
--     description TEXT,
--     FOREIGN KEY (church_id) REFERENCES church(id)
-- );

-- ADD CHURCH TABLES
-- CREATE TABLE church (
--     id INTEGER PRIMARY KEY,
--     code TEXT NOT NULL UNIQUE,
--     name TEXT NOT NULL,
--     location TEXT NOT NULL,
--     image_path TEXT,
--     instagram TEXT
-- );

-- insert church into Church table
-- INSERT INTO church (id, code, name, location, image_path, instagram)
-- VALUES (
--     1, 
--     '00000', 
--     'Test Church', 
--     'Test Location', 
--     '/church_images/placeholder.jpg', 
--     'https://www.instagram.com/jordanbarhoumeh?igsh=ajR1ZmthZTFkYjVh&utm_source=qr');

-- INSERT INTO church (id, code, name, location, image_path, instagram)
-- VALUES (
--     2, 
--     '00001', 
--     'Saints Peter and Paul', 
--     'Doonside', 
--     '/church_images/spp.jpg', 
--     'https://www.instagram.com/saints_peterandpaul?igsh=bmtueXFucWN3dnVz');



--insert event into Events table

-- INSERT INTO events (church_id, event_title, start_time, end_time, is_all_day, description)
-- VALUES (1, 
--     'Test Church Event 1', 
--     '2024-04-01T18:00:00', 
--     '2024-04-01T19:00:00', 
--     0, 
--     'test event for one hour event on April 1st. 
--     Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
--     Nunc rutrum aliquet diam, rhoncus rutrum ligula rhoncus sit amet. 
--     Sed eleifend ex id purus tincidunt mollis eget quis purus.');

-- INSERT INTO events (church_id, event_title, start_time, end_time, is_all_day, description)
-- VALUES (1, 
--     'Future Test Church Event 2', 
--     '2099-01-01T23:00:00', 
--     '2099-01-01T23:59:00', 
--     0, 
--     'Future Test Event 2');

-- Delete events by id
-- DELETE FROM events WHERE id = 4;

-- DELETE FROM church WHERE id = 1;
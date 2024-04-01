-- Delete Table code
-- DROP TABLE IF EXISTS events;
-- DROP TABLE IF EXISTS events;


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

INSERT INTO events (church_id, event_title, start_time, end_time, is_all_day, description)
VALUES (1, 
    'Past Test Church Event 1', 
    '2024-03-31T18:00:00', 
    '2024-03-31T19:00:00', 
    0, 
    'test event for one hour event on March 31st. 
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Nunc rutrum aliquet diam, rhoncus rutrum ligula rhoncus sit amet. 
    Sed eleifend ex id purus tincidunt mollis eget quis purus.');


-- Delete events by id
-- DELETE FROM events WHERE id = 4;

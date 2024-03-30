-- Delete Table code
-- DROP TABLE IF EXISTS events;
-- DROP TABLE IF EXISTS event;


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
--     date TEXT NOT NULL,
--     description TEXT,
--     FOREIGN KEY (church_id) REFERENCES church(id)
-- );

--insert event into Events table

INSERT INTO events (church_id, event_title, date, description)
VALUES (
    1, 
    'Test Church Event 1', 
    '2024-03-31', 
    'Test Church Event Description - Lorem ipsum dolor sit amet, 
    consectetur adipiscing elit. Nunc rutrum aliquet diam, 
    rhoncus rutrum ligula rhoncus sit amet. Sed eleifend ex 
    id purus tincidunt mollis eget quis purus'
);



-- Delete events by id
-- DELETE FROM events WHERE id = 4;

-- init_db.sql

-- delete table code
-- drop table church;
-- drop table event;

-- Existing Church table creation
CREATE TABLE IF NOT EXISTS church (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL
);

-- Add Event table creation
CREATE TABLE IF NOT EXISTS event (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date DATETIME NOT NULL,
    description VARCHAR(255),
    church_id INTEGER NOT NULL,
    FOREIGN KEY (church_id) REFERENCES church (id)
);


-- Existing sample data for Church
INSERT INTO church (code, name, location) VALUES ('00001', 'Saints Peter and Paul', 'Doonside');
INSERT INTO church (code, name, location) VALUES ('00002', 'Saint Marys', 'Mount Pritchard');

-- Add sample data for Event (adjust date format as needed)
INSERT INTO event (name, date, description, church_id) VALUES ('Easter Service', '2023-04-09 10:00:00', 'Celebrate Easter Sunday with us.', (SELECT id FROM church WHERE code = '00001'));

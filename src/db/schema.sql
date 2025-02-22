-- Case types table
CREATE TABLE case_types (
    type_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

-- Courts table
CREATE TABLE courts (
    court_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location TEXT 
);

-- Principal table of legal cases
CREATE TABLE cases (
    case_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL, 
    type_id INT REFERENCES case_types(type_id) ON DELETE SET NULL,
    status VARCHAR(50),
    start_date DATE,
    end_date DATE,
    description TEXT,
    court_id INT REFERENCES courts(court_id) ON DELETE SET NULL
);

-- Lawyers table
CREATE TABLE lawyers (
    lawyer_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20)
);

-- Clients table
CREATE TABLE clients (
    client_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20)
);

-- Documents table
CREATE TABLE documents (
    document_id SERIAL PRIMARY KEY,
    case_id INT REFERENCES cases(case_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    file_path TEXT NOT NULL,
    date_uploaded TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Associative table for cases and lawyers
CREATE TABLE case_lawyers (
    case_id INT REFERENCES cases(case_id) ON DELETE CASCADE,
    lawyer_id INT REFERENCES lawyers(lawyer_id) ON DELETE CASCADE,
    PRIMARY KEY (case_id, lawyer_id)
);

-- Associative table for cases and clients
CREATE TABLE case_clients (
    case_id INT REFERENCES cases(case_id) ON DELETE CASCADE,
    client_id INT REFERENCES clients(client_id) ON DELETE CASCADE,
    PRIMARY KEY (case_id, client_id)
);
-- Insert data in case types table
INSERT INTO case_types (name, description)
VALUES
    ('Civil', 'Casos relacionados con disputas civiles entre particulares.'),
    ('Penal', 'Casos relacionados con delitos y crímenes'),
    ('Laboral', 'Casos relacionados con disputas laborales entre empleados y empleadores');

-- Insert data in courts table
INSERT INTO courts (name, location)
VALUES
    ('Tribunal Supremo de Justicia', 'Santiago.'),
    ('Tribunal Laboral Zona Norte', 'Santiago'),
    ('Corte Penal Distrito Sur', 'Santiago');

-- Insert data in cases table
INSERT INTO cases (title, type_id, status, start_date, end_date, description, court_id)
VALUES
    ('Demanda Civil por Daños', 1, 'Abierto', '2024-01-01', NULL, 'Caso de demanda por daños materiales', 1),
    ('Robo con Agravante', 2, 'En Proceso', '2024-02-15', NULL, 'Acusación penal por robo con uso de violencia', 3),
    ('Despido Injustificado', 3, 'Cerrado', '2023-09-01', '2023-11-20', 'Caso laboral por despido sin causa', 2);

-- Insert data in lawyers table
INSERT INTO lawyers (name, email, phone)
VALUES
    ('Laura Martinez', 'laura.martinez@abogados.com', '912345678'),
    ('Carlos Gómez', 'carlos.gomez@abogados.com', '912345679'),
    ('Ana Rodríguez', 'ana.rodriguez@abogados.com', '912345671');

-- Insert data in clients table
INSERT INTO clients (name, email, phone)
VALUES
    ('Juan Perez', 'juan.perez@gmail.com', '922345678'),
    ('Maria López', 'maria.lopez@gmail.com', '922345679'),
    ('Empresa XYZ', 'contacto@xyz.com', '922345671');

-- Insert data in documents table
INSERT INTO documents (case_id, name, type, file_path, date_uploaded)
VALUES
    (1, 'Demanda Inicial', 'PDF', '/files/demanda_inicial.pdf', '2024-01-05'),
    (2, 'Evidencia Fotográfica', 'JPEG', '/files/evidencia_robos.jpg', '2024-02-20'),
    (3, 'Contrato Laboral', 'PDF', '/files/contrato_laboral.pdf', '2023-09-15');

-- Insert data in case-lawyers associative table
INSERT INTO case_lawyers (case_id, lawyer_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 1),
    (3, 3);

-- Insert data in case-clients associative table
INSERT INTO case_clients (case_id, client_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3);
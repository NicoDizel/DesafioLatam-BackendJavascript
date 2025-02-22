-- Insert data in case types table
INSERT INTO case_types (name, description, "createdAt", "updatedAt")
VALUES
    ('Civil', 'Casos relacionados con disputas civiles entre particulares.', NOW(), NOW()),
    ('Penal', 'Casos relacionados con delitos y crímenes', NOW(), NOW()),
    ('Laboral', 'Casos relacionados con disputas laborales entre empleados y empleadores', NOW(), NOW());

-- Insert data in courts table
INSERT INTO courts (name, location, "createdAt", "updatedAt")
VALUES
    ('Tribunal Supremo de Justicia', 'Santiago.', NOW(), NOW()),
    ('Tribunal Laboral Zona Norte', 'Santiago', NOW(), NOW()),
    ('Corte Penal Distrito Sur', 'Santiago', NOW(), NOW());

-- Insert data in status table
INSERT INTO status (name, "createdAt", "updatedAt")
VALUES
    ('Abierto', NOW(), NOW()),
    ('En Proceso', NOW(), NOW()),
    ('Cerrado', NOW(), NOW());

-- Insert data in roles table
INSERT INTO roles (name, "createdAt", "updatedAt")
VALUES
    ('Lawyer', NOW(), NOW()),
    ('Supervisor', NOW(), NOW()),
    ('Lead Lawyer', NOW(), NOW());

-- Insert data in users table
INSERT INTO users (name, email, phone, password, role_id, "createdAt", "updatedAt")
VALUES
    ('Laura Martinez', 'laura.martinez@abogados.com', '912345678', 'lau123', 1, NOW(), NOW()),
    ('Carlos Gómez', 'carlos.gomez@abogados.com', '912345679', 'carlos123', 2, NOW(), NOW()),
    ('Ana Rodríguez', 'ana.rodriguez@abogados.com', '912345671', 'ana123', 3, NOW(), NOW());

-- Insert data in cases table
INSERT INTO cases (title, description, case_type_id, court_id, created_by, status_id, start_date, end_date, "createdAt", "updatedAt")
VALUES
    ('Demanda Civil por Daños', 'Caso de demanda por daños materiales', 1, 1, 1, 1, '2024-01-01', NULL, NOW(), NOW()),
    ('Robo con Agravante', 'Acusación penal por robo con uso de violencia', 3, 2, 2, 2, '2024-02-15', NULL, NOW(), NOW()),
    ('Despido Injustificado', 'Caso laboral por despido sin causa', 2, 2, 3, 3, '2023-09-01', '2023-11-20', NOW(), NOW());

-- Insert data in clients table
INSERT INTO clients (name, contact_info, email, phone, "createdAt", "updatedAt")
VALUES
    ('Juan Perez', 'email', 'juan.perez@gmail.com', '922345678', NOW(), NOW()),
    ('Maria López', 'telefono', 'maria.lopez@gmail.com', '922345679', NOW(), NOW()),
    ('Empresa XYZ', 'email', 'contacto@xyz.com', '922345671', NOW(), NOW());

-- Insert data in documents table
INSERT INTO documents (case_id, name, type, file_path, "createdAt", "updatedAt")
VALUES
    (1, 'Demanda Inicial', 'PDF', '/files/demanda_inicial.pdf', NOW(), NOW()),
    (2, 'Evidencia Fotográfica', 'JPEG', '/files/evidencia_robos.jpg', NOW(), NOW()),
    (3, 'Contrato Laboral', 'PDF', '/files/contrato_laboral.pdf', NOW(), NOW());

-- Insert data in case-users associative table
INSERT INTO case_users (case_id, user_id)
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
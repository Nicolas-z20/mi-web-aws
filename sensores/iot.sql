CREATE DATABASE IF NOT EXISTS IoT;

USE IoT;

CREATE TABLE scooters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    bateria INT,
    kilometraje DECIMAL(8,2),
    ubicacion VARCHAR(100),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO scooters(nombre,bateria,kilometraje,ubicacion)
VALUES
('Scooter-01',85,42.3,'Plaza de Armas'),
('Scooter-02',15,110.5,'Mall Plaza Chillán'),
('Scooter-03',60,15.1,'Campus INACAP');
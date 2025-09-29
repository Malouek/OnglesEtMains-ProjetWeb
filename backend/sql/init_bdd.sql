-- ===============================
-- Initialisation de la base 
-- ===============================

-- Suppression si déjà existante
DROP DATABASE IF EXISTS ongleetmain;

-- Création
CREATE DATABASE ongleetmain
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE ongleetmain;

-- ===============================
-- Table des clients
-- ===============================
CREATE TABLE clients (
    id_client INT AUTO_INCREMENT PRIMARY KEY,
    prenom VARCHAR(100) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    telephone VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(150) UNIQUE
);

-- ===============================
-- Table des catégories
-- ===============================
CREATE TABLE categories (
    id_categorie INT AUTO_INCREMENT PRIMARY KEY,
    nom_categorie VARCHAR(100) NOT NULL
);

-- ===============================
-- Table des prestations
-- ===============================
CREATE TABLE prestations (
    id_prestation INT AUTO_INCREMENT PRIMARY KEY,
    id_categorie INT NOT NULL,
    nom_prestation VARCHAR(255) NOT NULL,
    duree INT NULL, -- en minutes
    FOREIGN KEY (id_categorie) REFERENCES categories(id_categorie)
);

-- ===============================
-- Table des réservations
-- ===============================
CREATE TABLE reservations (
    id_reservation INT AUTO_INCREMENT PRIMARY KEY,
    id_client INT NOT NULL,
    id_prestation INT NOT NULL,
    date_reservation DATE NOT NULL,
    heure_reservation TIME NOT NULL,
    statut ENUM('En attente','Confirmée','Annulée') DEFAULT 'En attente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_client) REFERENCES clients(id_client),
    FOREIGN KEY (id_prestation) REFERENCES prestations(id_prestation),
    CONSTRAINT unique_resa UNIQUE (id_client, id_prestation, date_reservation, heure_reservation)
);

-- ===============================
-- Insertion des catégories
-- ===============================
INSERT INTO categories (nom_categorie) VALUES
('Épilation'),
('Forfaits 1/2 Jambes'),
('Forfaits Jambes Entières'),
('Pour Hommes'),
('Soins'),
('Maquillages'),
('Ongles & Mains');

-- ===============================
-- Prestations : Épilation
-- ===============================
INSERT INTO prestations (id_categorie, nom_prestation, duree) VALUES
(1, 'Sourcils / Lèvres / Menton', 15),
(1, 'Sourcils + Lèvres', 20),
(1, 'Sourcils + Lèvres + Menton', 25),
(1, 'Maillot', 20),
(1, 'Maillot Brésilien', 30),
(1, 'Maillot Semi Intégral', 40),
(1, 'Maillot Intégral', 50),
(1, 'Aisselles', 15),
(1, 'Bras Complets', 30),
(1, '1/2 Jambes', 25),
(1, 'Cuisses', 25),
(1, 'Jambes Entières', 45);

-- ===============================
-- Prestations : Forfaits 1/2 Jambes
-- ===============================
INSERT INTO prestations (id_categorie, nom_prestation, duree) VALUES
(2, '1/2 Jambes + Maillot ou Aisselles', 40),
(2, '1/2 Jambes + Maillot + Aisselles', 50),
(2, '1/2 Jambes + Maillot Brésilien + Aisselles', 60),
(2, '1/2 Jambes + Maillot Semi Intégral + Aisselles', 70),
(2, '1/2 Jambes + Maillot Intégral + Aisselles', 80);

-- ===============================
-- Prestations : Forfaits Jambes Entières
-- ===============================
INSERT INTO prestations (id_categorie, nom_prestation, duree) VALUES
(3, 'Jambes + Maillot ou Aisselles', 60),
(3, 'Jambes + Maillot + Aisselles', 70),
(3, 'Jambes + Maillot Brésilien + Aisselles', 80),
(3, 'Jambes + Maillot Semi Intégral + Aisselles', 90),
(3, 'Jambes + Maillot Intégral + Aisselles', 100);

-- ===============================
-- Prestations : Pour Hommes
-- ===============================
INSERT INTO prestations (id_categorie, nom_prestation, duree) VALUES
(4, 'Sourcil (Homme)', 15),
(4, 'Oreilles (Homme)', 15),
(4, 'Aisselles (Homme)', 20),
(4, 'Dos ou Torse (Homme)', 40);

-- ===============================
-- Prestations : Soins
-- ===============================
INSERT INTO prestations (id_categorie, nom_prestation, duree) VALUES
(5, 'Soin Coup d’Éclat (30min)', 30),
(5, 'Soin Douceur (45min)', 45),
(5, 'Soin Acide Hyaluronique (1h)', 60),
(5, 'Soin Collagène (1h30)', 90),
(5, 'Soin Visage Homme', 45),
(5, 'Modelage du Dos (35min)', 35);

-- ===============================
-- Prestations : Maquillages
-- ===============================
INSERT INTO prestations (id_categorie, nom_prestation, duree) VALUES
(6, 'Teinture Cils', 20),
(6, 'Teinture Sourcils', 20),
(6, 'Maquillage Jour', 30),
(6, 'Maquillage Soirée', 45),
(6, 'Maquillage Mariage', 60);

-- ===============================
-- Prestations : Ongles & Mains
-- ===============================
INSERT INTO prestations (id_categorie, nom_prestation, duree) VALUES
(7, 'Manucure', 30),
(7, 'Manucure + Vernis', 40),
(7, 'Beauté des Pieds', 45),
(7, 'Beauté des Pieds + Soin Masque & Gommage', 60),
(7, 'Pose de Vernis', 20),
(7, 'Capsule + Résine', 60),
(7, 'Capsule + Gel', 60),
(7, 'Semi Permanent', 45),
(7, 'Remplissage Résine', 50),
(7, 'Remplissage Gel Renforcé', 50),
(7, 'Dépose + Soin', 30),
(7, '1 Ongle', 10);

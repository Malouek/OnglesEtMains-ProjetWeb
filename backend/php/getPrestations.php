<?php
// backend/php/getPrestations.php
// Ce script renvoie les prestations associées à une catégorie au format JSON

require_once 'dbconnect.php';

// Connexion à la base
$db = new DBConnect();
$pdo = $db->getConnexion();

// Récupérer l'id de la catégorie depuis la requête GET
$categorie_id = isset($_GET['categorie_id']) ? intval($_GET['categorie_id']) : 0;

if ($categorie_id <= 0) {
    // Si pas de catégorie valide, renvoyer un tableau vide
    echo json_encode([]);
    exit;
}

// Préparer et exécuter la requête pour récupérer les prestations
$stmt = $pdo->prepare("SELECT id_prestation, nom_prestation FROM prestations WHERE id_categorie = :id_categorie ORDER BY nom_prestation");
$stmt->execute(['id_categorie' => $categorie_id]);

$prestations = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Retourner le résultat au format JSON
header('Content-Type: application/json');
echo json_encode($prestations);

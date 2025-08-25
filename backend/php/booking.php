<?php
require_once 'dbconnect.php';

$db = new DBConnect();
$pdo = $db->getConnexion();

// Récupérer les données du formulaire
$prenom = $_POST['firstName'] ?? '';
$nom = $_POST['lastName'] ?? '';
$telephone = $_POST['phone'] ?? '';
$email = $_POST['email'] ?? '';
$categorie_id = $_POST['categorie'] ?? ''; // nouvelle donnée
$id_prestation = $_POST['service'] ?? '';
$date_reservation = $_POST['selectedDate'] ?? '';
$heure_reservation = $_POST['selectedTime'] ?? '';
$message = $_POST['message'] ?? '';

// Vérifier les champs obligatoires
if (empty($prenom) || empty($nom) || empty($telephone) || empty($categorie_id) || empty($id_prestation) || empty($date_reservation) || empty($heure_reservation)) {
    die("Veuillez remplir tous les champs obligatoires !");
}

// Vérifier si le client existe déjà
$stmt = $pdo->prepare("SELECT id_client FROM clients WHERE telephone = :telephone");
$stmt->execute(['telephone' => $telephone]);
$client = $stmt->fetch(PDO::FETCH_ASSOC);

if ($client) {
    $id_client = $client['id_client'];
} else {
    // Créer un nouveau client
    $stmt = $pdo->prepare("INSERT INTO clients (prenom, nom, telephone, email) VALUES (:prenom, :nom, :telephone, :email)");
    $stmt->execute([
        'prenom' => $prenom,
        'nom' => $nom,
        'telephone' => $telephone,
        'email' => $email
    ]);
    $id_client = $pdo->lastInsertId();
}

// Vérifier que la prestation appartient bien à la catégorie sélectionnée
$stmt = $pdo->prepare("SELECT id_prestation FROM prestations WHERE id_prestation = :id_prestation AND id_categorie = :id_categorie");
$stmt->execute([
    'id_prestation' => $id_prestation,
    'id_categorie' => $categorie_id
]);

if (!$stmt->fetch(PDO::FETCH_ASSOC)) {
    die("Prestation inconnue ou non disponible dans cette catégorie !");
}

// Insérer la réservation
try {
    $stmt = $pdo->prepare("INSERT INTO reservations (id_client, id_prestation, date_reservation, heure_reservation) VALUES (:id_client, :id_prestation, :date_reservation, :heure_reservation)");
    $stmt->execute([
        'id_client' => $id_client,
        'id_prestation' => $id_prestation,
        'date_reservation' => $date_reservation,
        'heure_reservation' => $heure_reservation
    ]);
    echo "Réservation confirmée !";
} catch (PDOException $e) {
    if ($e->getCode() == 23000) { // violation de contrainte unique
        die("Vous avez déjà réservé cette prestation à cette date et heure !");
    } else {
        die("Erreur lors de la réservation : " . $e->getMessage());
    }
}
?>

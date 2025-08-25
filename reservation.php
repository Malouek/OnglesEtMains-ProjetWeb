<?php
require_once 'backend/php/dbconnect.php';
$db = new DBConnect();
$pdo = $db->getConnexion();

// Récupérer les catégories
$stmt = $pdo->prepare("SELECT id_categorie, nom_categorie FROM categories");
$stmt->execute();
$categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réservation - Ongles et Mains</title>
    <link rel="stylesheet" href="css/reservation.css">
</head>
<body>
    <header class="header">
        <nav class="nav">
            <div class="logo">Ongles et Mains</div>
            <ul class="nav-links">
                <li><a href="#accueil">Accueil</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#apropos">À propos</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <div class="container">
        <div class="booking-title">
            <h1>Prendre Rendez-vous</h1>
            <p>Réservez votre moment de beauté et de détente. Choisissez la date qui vous convient et laissez-nous prendre soin de vous.</p>
        </div>

        <div class="booking-container">
            <div class="calendar-section">
                <h2 class="section-title">Choisir une date</h2>
                <div class="calendar">
                    <div class="calendar-header">
                        <button class="calendar-nav" id="prevMonth">‹</button>
                        <div class="calendar-month" id="currentMonth"></div>
                        <button class="calendar-nav" id="nextMonth">›</button>
                    </div>
                    <div class="calendar-grid" id="calendarGrid"></div>
                </div>
            </div>

            <div class="form-section">
                <h2 class="section-title">Informations de réservation</h2>
                
                <div id="selectedDateDisplay" class="selected-date" style="display: none;">
                    <strong>Date sélectionnée: </strong><span id="selectedDateText"></span>
                </div>

                <form id="bookingForm" action="backend/php/booking.php" method="POST">
                    <input type="hidden" id="selectedDate" name="selectedDate">
                    <input type="hidden" id="selectedTime" name="selectedTime">

                    <div class="form-group">
                        <label for="categorie">Catégorie *</label>
                        <select id="categorie" name="categorie" required>
                            <option value="">Choisir une catégorie</option>
                            <?php foreach ($categories as $categorie): ?>
                                <option value="<?= htmlspecialchars($categorie['id_categorie']) ?>">
                                    <?= htmlspecialchars($categorie['nom_categorie']) ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="service">Prestation *</label>
                        <select id="service" name="service" required>
                            <option value="">Choisir une prestation</option>
                            <!-- Les prestations seront ajoutées dynamiquement via JS selon la catégorie sélectionnée -->
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="firstName">Prénom *</label>
                        <input type="text" id="firstName" name="firstName" required>
                    </div>

                    <div class="form-group">
                        <label for="lastName">Nom *</label>
                        <input type="text" id="lastName" name="lastName" required>
                    </div>

                    <div class="form-group">
                        <label for="phone">Téléphone *</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>

                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email">
                    </div>

                    <div class="form-group">
                        <label>Heure souhaitée *</label>
                        <div class="time-slots" id="timeSlots">
                            <div class="time-slot" data-time="09:00">09:00</div>
                            <div class="time-slot" data-time="10:00">10:00</div>
                            <div class="time-slot" data-time="11:00">11:00</div>
                            <div class="time-slot" data-time="14:00">14:00</div>
                            <div class="time-slot" data-time="15:00">15:00</div>
                            <div class="time-slot" data-time="16:00">16:00</div>
                            <div class="time-slot" data-time="17:00">17:00</div>
                            <div class="time-slot" data-time="18:00">18:00</div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="message">Message (optionnel)</label>
                        <textarea id="message" name="message" placeholder="Précisions, demandes particulières..."></textarea>
                    </div>

                    <button type="submit" class="btn-primary">Confirmer le rendez-vous</button>
                </form>
            </div>
        </div>
    </div>
    <script src="js/reservation.js"></script>
</body>
</html>


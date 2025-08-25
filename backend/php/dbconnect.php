<?php
class DBConnect
{


    private $host = 'localhost'; // Hôte de la base de données
    private $dbname = 'ongleetmain'; // Nom de la base de données
    private $username = 'root'; // Nom d'utilisateur MySQL
    private $password = ''; // Mot de passe MySQL (vide par défaut sur WAMP)
    private $pdo;

    public function getConnexion()
    {
        if ($this->pdo === null) {
            try {
                $this->pdo = new PDO(
                    "mysql:host={$this->host};dbname={$this->dbname};charset=utf8",
                    $this->username,
                    $this->password
                );
                $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                die("Erreur de connexion à la base de données : " . $e->getMessage());
            }
        }
        return $this->pdo;
    }
}

?>
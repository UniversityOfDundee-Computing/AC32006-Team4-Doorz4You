<?php
function PDO_config($username, $password) {
    $host = 'silva.computing.dundee.ac.uk';
    $db   = '22ac3d04';
    $user = $username;
    $pass = $password;

    $dsn = "mysql:host=$host;dbname=$db";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
    ];
    try {
        $pdo = new PDO($dsn, $user, $pass, $options);
    } catch (\PDOException $e) {
        throw new \PDOException($e->getMessage(), (int)$e->getCode());
    }

    return $pdo;
}
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

// Based on https://stackoverflow.com/a/541463
function getRequestHeaders() {
    $headers = array();
    foreach($_SERVER as $key => $value) {
        if (substr($key, 0, 5) <> 'HTTP_') {
            continue;
        }
        $header = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))));
        $headers[$header] = $value;
    }
    return $headers;
}

/**
 * @throws Exception
 */
function getStaffDetail(PDO $PDO) {
    $headers = getRequestHeaders();
    if (!isset($headers['Token'])) {
        http_response_code(403);
        throw new Exception("Missing Auth Token");
    }
    $stmnt = $PDO->prepare("SELECT staffno, firstname,surname, position, salary, location FROM employee where sessionToken = ?");
    $stmnt->execute([$headers['Token']]);
    if ($stmnt->rowCount() === 0 || $headers['Token'] === '') {
        http_response_code(403);
        throw new Exception("Invalid auth token");
    }
    return $stmnt->fetchAll();
}

/**
 * @throws Exception
 */
function getCustomerDetail(PDO $PDO) {
    $headers = getRequestHeaders();
    if (!isset($headers['Token'])) {
        http_response_code(403);
        throw new Exception("Missing Auth Token");
    }
    $stmnt = $PDO->prepare("SELECT CustomerNo, FirstName, ContactNo, Email, Street, City, PostCode, Country, Surname FROM customerdetails where sessionToken = ?");
    $stmnt->execute([$headers['Token']]);
    if ($stmnt->rowCount() === 0 || $headers['Token'] === '') {
        http_response_code(403);
        throw new Exception("Invalid auth token");
    }
    return $stmnt->fetchAll();
}
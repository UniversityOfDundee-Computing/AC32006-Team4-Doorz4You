<?php
include_once "inc.php";
if (isset($_GET['getProductList'])) {
    $pdo = PDO_config("22ac3u04", "abc322");

    $stmnt = $pdo->prepare("SELECT JobType, JobName, Description, Image FROM jobtype");
    $stmnt->execute([]);
    header("content-type: application/json");
    echo json_encode($stmnt->fetchAll(), JSON_PRETTY_PRINT);
}
<?php
function getProductListHandler($pdo) {
    $stmnt = $pdo->prepare("SELECT JobType, JobName, Description, Image FROM jobtype");
    $stmnt->execute([]);
    return json_encode($stmnt->fetchAll(), JSON_PRETTY_PRINT);
}
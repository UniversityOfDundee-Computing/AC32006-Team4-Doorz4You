<?php
function getProductListHandler($pdo) {
    $stmnt = $pdo->prepare("SELECT * FROM productlist");
    $stmnt->execute([]);
    return json_encode($stmnt->fetchAll(), JSON_PRETTY_PRINT);
}
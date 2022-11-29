<?php
function getJobAllocationTableHandler(PDO $pdo) {
    $location = "";
    $stmnt = $pdo->prepare("SELECT * FROM joballocation where Location = ?");
    $stmnt->execute([$location]);
    return json_encode($stmnt->fetchAll(), JSON_PRETTY_PRINT);
}

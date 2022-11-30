<?php
function getJobAllocationTableHandler(PDO $pdo) {
    $staffDetails = getStaffDetail($pdo);
    $stmnt = $pdo->prepare("SELECT * FROM joballocation where Location = ?");
    $stmnt->execute([$staffDetails['Location']]);
    return json_encode($stmnt->fetchAll(), JSON_PRETTY_PRINT);
}
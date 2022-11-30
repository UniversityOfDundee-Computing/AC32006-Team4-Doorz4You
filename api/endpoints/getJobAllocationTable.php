<?php
function getJobAllocationTableHandler(PDO $pdo) {
    $staffDetails = getStaffDetail($pdo);
    $stmnt = $pdo->prepare("SELECT * FROM joballocation where Location = ?");
    $stmnt->execute([$staffDetails[0]['location']]);
    return json_encode($stmnt->fetchAll(), JSON_PRETTY_PRINT);
}
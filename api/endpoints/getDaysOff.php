<?php
function getDaysOffHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $stmnt = $pdo->prepare("SELECT * FROM daysofflist where StaffNo = ?");
    $stmnt->execute([$_POST['staffNo']]);
    return json_encode($stmnt->fetchAll(), JSON_PRETTY_PRINT);
}
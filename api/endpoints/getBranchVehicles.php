<?php
function getBranchVehiclesHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $stmnt = $pdo->prepare("SELECT * FROM vehiclelist where HomeLocation = ?");
    $stmnt->execute([$staffDetails[0]['location']]);
    return json_encode($stmnt->fetchAll(), JSON_PRETTY_PRINT);
}
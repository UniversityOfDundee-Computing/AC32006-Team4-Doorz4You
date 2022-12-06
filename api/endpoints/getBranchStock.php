<?php
function getBranchStockHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $stmntStock = $pdo->prepare("SELECT * FROM stocklist where Location = ?");
    $stmntStock->execute([$staffDetails[0]['location']]);


    return json_encode($stmntStock->fetchAll(), JSON_PRETTY_PRINT);
}